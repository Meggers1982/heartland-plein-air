'use client';
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { festivalLocations, type FestivalLocation } from "@/data/locations";

type GoogleMapsLib = typeof window.google;

declare global {
  interface Window {
    google?: { maps: any };
    __initFestivalMap?: () => void;
    gm_authFailure?: () => void;
  }
}

const SCRIPT_ID = "google-maps-js";

function loadMapsScript(): Promise<GoogleMapsLib> {
  return new Promise((resolve, reject) => {
    if (window.google?.maps) {
      resolve(window.google);
      return;
    }
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
    const channel = process.env.NEXT_PUBLIC_GOOGLE_MAPS_TRACKING_ID;
    if (!key) {
      reject(new Error("Google Maps key missing"));
      return;
    }
    window.__initFestivalMap = () => resolve(window.google!);
    const existing = document.getElementById(SCRIPT_ID);
    if (existing) return;
    const s = document.createElement("script");
    s.id = SCRIPT_ID;
    s.async = true;
    // `libraries=marker` is required for AdvancedMarkerElement — without it
    // `google.maps.marker` is undefined and we silently fall back to the
    // deprecated Marker (see `useAdvanced` below).
    s.src = `https://maps.googleapis.com/maps/api/js?key=${key}&loading=async&libraries=marker&callback=__initFestivalMap${channel ? `&channel=${channel}` : ""}`;
    s.onerror = () => reject(new Error("Failed to load Google Maps"));
    document.head.appendChild(s);
  });
}

function popupHtml(loc: FestivalLocation, dayFilter: string): string {
  const events = dayFilter === "all" ? loc.events : loc.events.filter((e) => e.dayId === dayFilter);
  const eventsHtml = events
    .map(
      (e) => `
        <li style="margin-bottom:6px;">
          <a href="#${e.dayId}" data-day-id="${e.dayId}" class="festival-map-day-link" style="color:#C46A3B;font-weight:600;text-decoration:none;cursor:pointer;">${e.dayLabel}</a>
          ${e.time ? `<span style="color:#692D4A;"> · ${e.time}</span>` : ""}
          <div style="color:#37484B;">${e.name}</div>
        </li>`,
    )
    .join("");
  return `
    <div style="font-family:'Source Sans 3',sans-serif;max-width:260px;padding:4px 2px;">
      <div style="font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:#37484B;margin-bottom:2px;">${loc.name}</div>
      <div style="font-size:12px;color:#692D4A;margin-bottom:6px;">${loc.address}</div>
      <div style="font-size:12px;color:#37484B;margin-bottom:6px;">${loc.description}</div>
      ${loc.websiteUrl ? `<div style="margin-bottom:10px;"><a href="${loc.websiteUrl}" target="_blank" rel="noopener noreferrer" style="font-size:12px;color:#C46A3B;font-weight:600;text-decoration:none;">Visit website</a></div>` : `<div style="margin-bottom:10px;"></div>`}
      <ul style="list-style:none;padding:0;margin:0 0 8px 0;font-size:13px;">${eventsHtml}</ul>
    </div>`;
}

function smoothScrollToDay(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

// AdvancedMarkerElement is a DOM custom element, not a legacy Marker: it uses
// `.map` / `.position` properties where Marker used setMap() / getPosition().
// These two helpers let the filter effect work against either kind, so the
// legacy fallback below stays functional.
function setMarkerVisible(marker: any, visible: boolean, map: any) {
  if (typeof marker.setMap === "function") marker.setMap(visible ? map : null);
  else marker.map = visible ? map : null;
}

function getMarkerPosition(marker: any) {
  return typeof marker.getPosition === "function" ? marker.getPosition() : marker.position;
}

type DayOption = { id: string; label: string };

function getDayOptions(): DayOption[] {
  const seen = new Map<string, string>();
  festivalLocations.forEach((loc) =>
    loc.events.forEach((e) => {
      if (!seen.has(e.dayId)) seen.set(e.dayId, e.dayLabel);
    }),
  );
  return Array.from(seen.entries())
    .map(([id, label]) => ({ id, label }))
    .sort((a, b) => a.id.localeCompare(b.id));
}

const LocationsMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const infoWindowRef = useRef<any>(null);
  const markersRef = useRef<Array<{ marker: any; loc: FestivalLocation }>>([]);
  const googleRef = useRef<GoogleMapsLib>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [dayFilter, setDayFilter] = useState<string>("all");
  const [listOpen, setListOpen] = useState(false);
  const dayOptions = useMemo(getDayOptions, []);
  // Marker click handlers are bound once at creation and read the filter from
  // this ref. The previous approach re-bound them on every filter change via
  // clearListeners(), which is fragile against AdvancedMarkerElement's DOM
  // event model.
  const dayFilterRef = useRef(dayFilter);
  const visibleLocations = useMemo(
    () =>
      dayFilter === "all"
        ? festivalLocations
        : festivalLocations.filter((l) => l.events.some((e) => e.dayId === dayFilter)),
    [dayFilter],
  );

  useEffect(() => {
    let cancelled = false;

    // Google Maps reports key/referrer/billing problems (invalid key,
    // disallowed HTTP referrer, API not activated, unbilled project, etc.)
    // asynchronously via this global callback — not via the <script> tag's
    // error event, and not always before the "maps loaded" callback fires.
    // In practice the script can load and the Map object can construct
    // successfully, with the auth failure only surfacing seconds later when
    // Maps actually requests tiles. Without this hook that failure is
    // silent: `status` stays "ready" and the container is left empty.
    window.gm_authFailure = () => {
      if (!cancelled) setStatus("error");
    };

    loadMapsScript()
      .then((g) => {
        if (cancelled || !mapRef.current) return;
        googleRef.current = g;
        const bounds = new g.maps.LatLngBounds();
        // AdvancedMarkerElement requires a Map ID and fails SILENTLY without
        // one — the map renders but no pins appear. NEXT_PUBLIC_* vars are
        // inlined at build time, so a deploy missing this var would ship a
        // pinless map. Fall back to the deprecated Marker in that case: a
        // console deprecation warning is far better than an empty map.
        const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;
        const useAdvanced = Boolean(mapId) && Boolean(g.maps.marker?.AdvancedMarkerElement);
        const map = new g.maps.Map(mapRef.current, {
          center: { lat: 41.24, lng: -96.0 },
          zoom: 11,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          ...(mapId ? { mapId } : {}),
        });
        mapInstanceRef.current = map;
        const infoWindow = new g.maps.InfoWindow();
        infoWindowRef.current = infoWindow;

        festivalLocations.forEach((loc) => bounds.extend({ lat: loc.lat, lng: loc.lng }));

        const buildMarkers = (advanced: boolean) => {
          markersRef.current.forEach(({ marker }) => setMarkerVisible(marker, false, null));
          markersRef.current = [];
          festivalLocations.forEach((loc) => {
            const position = { lat: loc.lat, lng: loc.lng };
            const marker = advanced
              ? new g.maps.marker.AdvancedMarkerElement({
                  position,
                  map,
                  title: loc.name,
                  // Advanced markers are NOT clickable by default. Omitting
                  // this leaves the pins visible but kills every info window.
                  gmpClickable: true,
                })
              : new g.maps.Marker({ position, map, title: loc.name });
            const openPopup = () => {
              infoWindow.setContent(popupHtml(loc, dayFilterRef.current));
              infoWindow.open({ anchor: marker, map });
            };
            // Advanced markers are DOM custom elements and want the native
            // "gmp-click" event; legacy markers use the Maps event system.
            if (advanced) marker.addEventListener("gmp-click", openPopup);
            else marker.addListener("click", openPopup);
            markersRef.current.push({ marker, loc });
          });
        };

        buildMarkers(useAdvanced);

        // Advanced markers fail SILENTLY if the Map ID is wrong or missing —
        // pins simply never appear. Rather than surface an error state, drop
        // back to legacy markers so the map always has pins. The deprecation
        // warning returning is a much better outcome than an empty map.
        if (useAdvanced) {
          map.addListener("mapcapabilities_changed", () => {
            if (!map.getMapCapabilities?.().isAdvancedMarkersAvailable) {
              console.warn(
                "Google Maps: advanced markers unavailable — falling back to legacy markers. Check NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID.",
              );
              buildMarkers(false);
            }
          });
        }

        map.fitBounds(bounds, 60);

        g.maps.event.addListener(infoWindow, "domready", () => {
          document.querySelectorAll<HTMLAnchorElement>(".festival-map-day-link").forEach((a) => {
            a.onclick = (ev) => {
              ev.preventDefault();
              const id = a.dataset.dayId;
              if (!id) return;
              infoWindow.close();
              smoothScrollToDay(id);
            };
          });
        });
        setStatus("ready");
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
      if (window.gm_authFailure) window.gm_authFailure = undefined;
      // Advanced markers are real DOM nodes and leak more readily than legacy
      // markers, so detach them explicitly on unmount.
      markersRef.current.forEach(({ marker }) => setMarkerVisible(marker, false, null));
      markersRef.current = [];
      infoWindowRef.current?.close();
    };
  }, []);

  useEffect(() => {
    dayFilterRef.current = dayFilter;
  }, [dayFilter]);

  // Apply day filter: show/hide markers, refit bounds, update open popup
  useEffect(() => {
    const g = googleRef.current;
    const map = mapInstanceRef.current;
    if (!g || !map || markersRef.current.length === 0) return;
    const bounds = new g.maps.LatLngBounds();
    let visibleCount = 0;
    markersRef.current.forEach(({ marker, loc }) => {
      const visible = dayFilter === "all" || loc.events.some((e) => e.dayId === dayFilter);
      setMarkerVisible(marker, visible, map);
      if (visible) {
        bounds.extend(getMarkerPosition(marker));
        visibleCount++;
      }
    });
    infoWindowRef.current?.close();
    if (visibleCount > 0) {
      if (visibleCount === 1) {
        map.setCenter(bounds.getCenter());
        map.setZoom(13);
      } else {
        map.fitBounds(bounds, 60);
      }
    }
  }, [dayFilter]);

  return (
    <div className="space-y-6">
      {/* Day filter */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setDayFilter("all")}
          className={`rounded-full border px-4 py-1.5 font-body text-sm font-semibold transition-colors ${
            dayFilter === "all"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-foreground hover:bg-muted"
          }`}
        >
          All days
        </button>
        {dayOptions.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setDayFilter(d.id)}
            className={`rounded-full border px-4 py-1.5 font-body text-sm font-semibold transition-colors ${
              dayFilter === d.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:bg-muted"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Map container */}
      <div className="relative overflow-hidden rounded-lg border border-border shadow-sm">
        <div
          ref={mapRef}
          className="h-[480px] w-full bg-muted"
          aria-label="Map of festival locations"
          role="application"
        />
        {status === "loading" && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-muted/80">
            <div className="flex items-center gap-3 font-body text-sm text-muted-foreground">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              Loading map…
            </div>
          </div>
        )}
        {status === "error" && (
          <div
            role="status"
            aria-live="polite"
            className="absolute inset-0 flex items-center justify-center bg-muted px-6"
          >
            <div className="max-w-sm text-center">
              <p className="mb-2 font-display text-lg font-bold text-foreground">
                Map couldn't load
              </p>
              <p className="font-body text-sm text-muted-foreground">
                We can't reach the map service right now. You can still browse every location and event in the list below.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Text fallback list — also useful when map renders */}
      <div>
        <button
          type="button"
          onClick={() => setListOpen((o) => !o)}
          className="flex w-full items-center justify-center gap-2 py-2 font-display text-xl font-bold text-foreground transition-colors hover:text-primary"
        >
          All Locations
          <ChevronDown
            className={`h-5 w-5 transition-transform duration-300 ${listOpen ? "rotate-180" : ""}`}
          />
        </button>
        {listOpen && (
          <>
            <ul className="grid gap-4 sm:grid-cols-2">
              {visibleLocations.map((loc) => {
                const events =
                  dayFilter === "all" ? loc.events : loc.events.filter((e) => e.dayId === dayFilter);
                return (
                  <li
                    key={loc.key}
                    className="rounded-lg border border-border bg-card p-4 shadow-sm"
                  >
                    <h3 className="font-display text-lg font-bold text-foreground">{loc.name}</h3>
                    <p className="mb-1 font-body text-xs text-muted-foreground">{loc.address}</p>
                    <p className="mb-3 font-body text-sm leading-relaxed text-foreground/85">
                      {loc.description}
                    </p>
                    {loc.websiteUrl && (
                      <a
                        href={loc.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mb-3 inline-block font-body text-xs font-semibold text-primary hover:underline"
                      >
                        Visit website
                      </a>
                    )}
                    <ul className="space-y-2 font-body text-sm">
                      {events.map((e, i) => (
                        <li key={`${e.dayId}-${i}`}>
                          <a
                            href={`#${e.dayId}`}
                            onClick={(ev) => {
                              ev.preventDefault();
                              smoothScrollToDay(e.dayId);
                            }}
                            className="font-semibold text-primary hover:underline"
                          >
                            {e.dayLabel}
                          </a>
                          {e.time && <span className="text-muted-foreground"> · {e.time}</span>}
                          <div className="text-foreground">{e.name}</div>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
            {visibleLocations.length === 0 && (
              <p className="text-center font-body text-sm text-muted-foreground">
                No locations scheduled for that day.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LocationsMap;