## Standardize Artist Spotlight size

**Problem:** The card height changes from artist to artist because bio length varies and the image column uses `md:aspect-auto`, so the whole card stretches to fit text.

**Fix (single file: `src/components/ArtistSpotlight.tsx`):**

1. Give the card a fixed height on md+ (e.g. `md:h-[520px]`) so the frame is stable across artists. Mobile keeps the square image stacked above the text and stays auto-height.
2. Image column fills that height with `h-full w-full object-cover` (drop `md:aspect-auto` reliance).
3. Text column scrolls internally if a bio overflows: clamp the bio preview to a fixed number of lines (`line-clamp-5`) so name, location, bio, and CTA always land in the same vertical positions. Title/location/CTA stay outside the clamp so they never shift.
4. No copy, palette, font, or layout-structure changes.

**Out of scope:** Carousel behavior, data, other sections.