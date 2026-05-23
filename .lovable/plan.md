## Goal

Make the Heartland logo in the top nav actually visible. Right now it renders the full 1920×1920 PNG (which is mostly transparent padding) inside an `h-12 md:h-14` box, so the visible artwork shrinks to a tiny smudge in the corner.

## Change (src/components/SiteNav.tsx, logo only)

Apply the same crop-via-wrapper approach already used in the footer:

- Replace the `<img className="h-12 w-auto md:h-14" />` with a fixed-height wrapper that crops the PNG's transparent padding so only the visible artwork shows.
- Wrapper: `relative h-10 md:h-12 aspect-[1376/729] overflow-hidden` (sized by height so it fits the nav bar; width derived from the visible-art aspect ratio).
- Inner `<img>`: absolutely positioned, scaled up to `139.53%` of the wrapper, shifted `left-[-20.86%] top-[-65.71%]` to expose just the artwork (numbers from the PNG's content bbox 287/479 → 1663/1208 in a 1920² canvas).
- Keep the `<Link>` wrapper and aria-label as-is.

No other nav structure, no other files, no asset edits.

## Verification

- Reload `/`: header logo renders at a clearly readable size, vertically centered in the nav bar, no big empty box around it.
- Desktop and mobile widths both look right; nav height unchanged.
