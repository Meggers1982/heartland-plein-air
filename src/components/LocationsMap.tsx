'use client';
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { festivalLocations, type FestivalLocation } from "@/data/locations";

type GoogleMapsLib = typeof window.google;

declare global {
  interface Window {
    google?: { maps: any };
    __initFestivalMap?: () => void;
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
    s.src = `https://maps.googleapis.com/maps/api/js?key=${key}&loading=async&callback=__initFestivalMap${channel ? `&channel=${channel}` : ""}`;
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
      <div style="font-size:12px;color:#692D4A;margin-bottom:10px;">${loc.address}</div>
      <ul style="list-style:none;padding:0;margin:0 0 8px 0;font-size:13px;">${eventsHtml}</ul>
    </div>`;
}

function smoothScrollToDay(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
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
  const visibleLocations = useMemo(
    () =>
      dayFilter === "all"
        ? festivalLocations
        : festivalLocations.filter((l) => l.events.some((e) => e.dayId === dayFilter)),
    [dayFilter],
  );

  useEffect(() => {
    let cancelled = false;
    loadMapsScript()
      .then((g) => {
        if (cancelled || !mapRef.current) return;
        googleRef.current = g;
        const bounds = new g.maps.LatLngBounds();
        const map = new g.maps.Map(mapRef.current, {
          center: { lat: 41.24, lng: -96.0 },
          zoom: 11,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });
        mapInstanceRef.current = map;
        const infoWindow = new g.maps.InfoWindow();
        infoWindowRef.current = infoWindow;

        festivalLocations.forEach((loc) => {
          const position = { lat: loc.lat, lng: loc.lng };
          bounds.extend(position);
          const marker = new g.maps.Marker({
            position,
            map,
            title: loc.name,
          });
          marker.addListener("click", () => {
            infoWindow.setContent(popupHtml(loc, "all"));
            infoWindow.open({ anchor: marker, map });
          });
          markersRef.current.push({ marker, loc });
        });

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
    };
  }, []);

  // Apply day filter: show/hide markers, refit bounds, update open popup
  useEffect(() => {
    const g = googleRef.current;
    const map = mapInstanceRef.current;
    if (!g || !map || markersRef.current.length === 0) return;
    const bounds = new g.maps.LatLngBounds();
    let visibleCount = 0;
    markersRef.current.forEach(({ marker, loc }) => {
      const visible = dayFilter === "all" || loc.events.some((e) => e.dayId === dayFilter);
      marker.setMap(visible ? map : null);
      marker.__loc = loc;
      // Re-bind click to use current filter
      g.maps.event.clearListeners(marker, "click");
      marker.addListener("click", () => {
        infoWindowRef.current.setContent(popupHtml(loc, dayFilter));
        infoWindowRef.current.open({ anchor: marker, map });
      });
      if (visible) {
        bounds.extend(marker.getPosition());
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
          <div className="absolute inset-0 flex items-center justify-center bg-muted px-6">
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
                    <p className="font-display text-lg font-bold text-foreground">{loc.name}</p>
                    <p className="mb-3 font-body text-xs text-muted-foreground">{loc.address}</p>
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