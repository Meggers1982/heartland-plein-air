import { useEffect, useRef } from "react";
import { festivalLocations, type FestivalLocation } from "@/data/locations";

declare global {
  interface Window {
    google?: any;
    __initFestivalMap?: () => void;
  }
}

const SCRIPT_ID = "google-maps-js";

function loadMapsScript(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (window.google?.maps) {
      resolve(window.google);
      return;
    }
    const key = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY;
    const channel = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID;
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

function popupHtml(loc: FestivalLocation): string {
  const eventsHtml = loc.events
    .map(
      (e) => `
        <li style="margin-bottom:6px;">
          <a href="#${e.dayId}" style="color:#8b5a2b;font-weight:600;text-decoration:none;">${e.dayLabel}</a>
          ${e.time ? `<span style="color:#6b6b6b;"> · ${e.time}</span>` : ""}
          <div style="color:#1f1f1f;">${e.name}</div>
        </li>`,
    )
    .join("");
  return `
    <div style="font-family:'Source Sans 3',sans-serif;max-width:260px;padding:4px 2px;">
      <div style="font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:#1f1f1f;margin-bottom:2px;">${loc.name}</div>
      <div style="font-size:12px;color:#6b6b6b;margin-bottom:10px;">${loc.address}</div>
      <ul style="list-style:none;padding:0;margin:0 0 8px 0;font-size:13px;">${eventsHtml}</ul>
    </div>`;
}

const LocationsMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    loadMapsScript()
      .then((g) => {
        if (cancelled || !mapRef.current) return;
        const bounds = new g.maps.LatLngBounds();
        const map = new g.maps.Map(mapRef.current, {
          center: { lat: 41.24, lng: -96.0 },
          zoom: 11,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });
        const infoWindow = new g.maps.InfoWindow();

        festivalLocations.forEach((loc) => {
          const position = { lat: loc.lat, lng: loc.lng };
          bounds.extend(position);
          const marker = new g.maps.Marker({
            position,
            map,
            title: loc.name,
          });
          marker.addListener("click", () => {
            infoWindow.setContent(popupHtml(loc));
            infoWindow.open({ anchor: marker, map });
          });
        });

        map.fitBounds(bounds, 60);
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-lg border border-border shadow-sm">
      <div ref={mapRef} className="h-[480px] w-full bg-muted" aria-label="Map of festival locations" />
    </div>
  );
};

export default LocationsMap;