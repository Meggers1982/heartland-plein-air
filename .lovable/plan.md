## Goal

In the footer's brand column, make the Heartland logo visually start at the same baseline as the "Visit" and "Stay in Touch" headings in the other two columns, and pull the descriptive paragraph closer to the logo.

## Cause

The logo PNG has significant transparent padding above and below the artwork. With the image rendered at full column width, that built-in whitespace pushes the visible logo well below the sibling column headings and leaves a large gap before the paragraph.

## Changes (src/components/SiteFooter.tsx, Brand column only)

1. Wrap the logo `<Link>` in a clipping container so we can crop the PNG's transparent padding via CSS without touching the asset:
   - Container: `relative w-full overflow-hidden` with an aspect ratio tuned to the visible artwork.
   - `<img>`: positioned with negative top offset (e.g. `-mt-[12%]`) and `scale` if needed so the visible logo starts at the top of the column, aligned with the "Visit" / "Stay in Touch" headings.
2. Reduce the gap between logo and paragraph: drop the current `-mt-8 md:-mt-12` on the paragraph and instead rely on a small positive `mt-2` (or similar) once the logo container no longer carries baked-in whitespace.

No other columns, no other pages, no asset edits.

## Verification

- Reload `/artists` (or any page) at desktop width: top of the logo artwork sits on the same horizontal line as "Visit" and "Stay in Touch".
- Paragraph sits directly under the logo with normal small spacing, no large gap.
- Mobile (single column) still renders cleanly with no clipped logo edges.
