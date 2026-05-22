## Clickable locations map — Schedule page

Add an interactive Google Map at the top of the Schedule page showing every paint-out / event location. Clicking a marker opens an info window with the location name, address, and the events happening there, plus a "View in schedule" link that jumps to that day's card.

### What you'll see
- New "Where to find us" section directly under the page header, above the day-by-day list.
- Map centered on the Omaha metro, sized ~400–500px tall, styled to match the warm earthy palette.
- One marker per unique location (~7 distinct sites across the week).
- Click marker → popup with location name, address, list of events (date + name + time), and a link that scrolls to the matching day card on the same page.

### Technical approach

1. **Connect Google Maps Platform** via Lovable's managed connector (no account or API key required from the user). Uses `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY` for the Maps JS API.
2. **Hardcode coordinates** for the ~7 unique locations in a new `src/data/locations.ts` file. Locations are fixed and known — geocoding on every page load would be wasteful. Each entry: `{ key, name, address, lat, lng, events: [{ dayId, date, name, time }] }`. Derived from the existing schedule data in `src/pages/Schedule.tsx`.
3. **New `<LocationsMap />` component** in `src/components/`:
   - Loads Maps JS API async with `loading=async&callback=initMap`.
   - Renders `google.maps.Map` (no `mapId`, uses default styling tweaked via `styles` for warm tones).
   - One `google.maps.Marker` per location.
   - Single `google.maps.InfoWindow` reused across markers; content built from the location's events list with a "View in schedule" anchor (`href="#day-sep-13"` etc.).
4. **Embed** the component in `src/pages/Schedule.tsx` between the intro section and the day list.

### Files
- `src/data/locations.ts` — new, location data with coords
- `src/components/LocationsMap.tsx` — new, map component
- `src/pages/Schedule.tsx` — add section + import
- `index.html` — no changes (script injected by component)

### Note on accuracy
I'll set lat/lng based on the addresses already in the schedule (e.g., Wildwood Park, Baright Library, Benson at 62nd & Maple, Dundee at 50th & Underwood, etc.). If any coordinate looks off in the preview, it's a one-line fix in `locations.ts`.
