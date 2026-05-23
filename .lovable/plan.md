# Homepage Restructure: Replace Artists Section

Pull the full Artists grid off the homepage (it lives on `/artists`) and replace it with three sections that give the homepage more purpose.

## New homepage section order

```text
Hero → Countdown → About → Highlights →
Schedule → Painting Locations (map) →
Featured Artist Spotlight (rotating) →
Gallery → Sponsors → FAQ → Newsletter → Footer
```

## What changes

1. **Remove `<ArtistsSection />`** from `src/pages/Index.tsx` (and its import). Keep the file for now in case it's reused.

2. **Add Painting Locations section** using the existing `LocationsMap.tsx` component. Wrap with a section heading ("Where the Art Happens / 20+ Scenic Locations across Douglas & Sarpy County") and a CTA button linking to the Schedule page where locations are detailed.

3. **Add Featured Artist Spotlight** — a new `ArtistSpotlight.tsx` component:
   - Rotates through all 6 artists from the current `ArtistsSection` data (extract to `src/data/artists.ts` so both homepage spotlight and `/artists` page share one source).
   - Auto-advances every ~6 seconds with fade/slide transition (existing Tailwind + AnimatedSection patterns, no new deps).
   - Prev/next arrows + dot indicators for manual control; pauses auto-rotate on hover.
   - Layout: large artist photo left, name/location/bio right, "Meet all 25 artists →" CTA button linking to `/artists`.
   - Respects `prefers-reduced-motion` (no auto-rotate).

4. **Add Sponsors section** using the existing `SponsorsSection.tsx` component, placed after Gallery. (Confirm it's styled to fit; minor heading/spacing tweaks only if needed.)

5. **Brush stroke dividers** between the new sections to match existing rhythm.

## Technical notes

- New file: `src/data/artists.ts` exporting the artist array (name, src, location, bio).
- New file: `src/components/ArtistSpotlight.tsx` — client component with `useState` + `useEffect` interval, cleanup on unmount, `useReducedMotion`-style check via `window.matchMedia`.
- `src/components/ArtistsSection.tsx` updated to import from `src/data/artists.ts` (kept intact for the `/artists` page if used there; otherwise left untouched).
- No backend, no new deps, no design-token changes — all earthy palette + Playfair/Source Sans 3 + existing animation patterns.

## Out of scope

- No changes to `/artists` page content.
- No changes to nav, footer, or other sections beyond ordering on `Index.tsx`.
