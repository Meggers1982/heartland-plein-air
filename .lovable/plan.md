## Countdown Ribbon Under Header

Add a thin, single-line countdown ribbon directly beneath the fixed header on every page **except the homepage** (which already has the large `CountdownBanner` section).

### What the ribbon contains
A compact, horizontal version of the existing countdown — not the full section. One row:
- Left: "The brushes come out in" eyelet label + `DD : HH : MM : SS` (small tabular numerals with tiny unit labels).
- Right: "Sept 13–19, 2026 · Douglas & Sarpy County" with a small "Subscribe" link.

Same brand styling — `bg-primary` background, `text-primary-foreground`, Playfair numerals, Source Sans uppercase labels. Roughly 48–56px tall on desktop, collapses gracefully on mobile (hide the right-side text, keep the numbers).

### Files

1. **New `src/components/CountdownRibbon.tsx`**
   - Self-contained: own `setInterval` (reuses the same `TARGET` date).
   - Single horizontal flex row, compact spacing.
   - Renders nothing once the countdown hits zero (returns `null`).

2. **`src/components/SiteNav.tsx`**
   - Below the existing `<nav>` element, conditionally render `<CountdownRibbon />` when `useLocation().pathname !== "/"`.
   - Keep the ribbon inside the same fixed wrapper so it sits flush under the menu bar with no gap.

3. **Page top spacing**
   - The fixed nav is currently ~80–88px tall and pages use `pt-24` / `pt-32` to clear it. With the ribbon stacked below the nav, those values still need to clear nav + ribbon (~136–144px total).
   - Update each non-home page's hero/main top padding to add the ribbon height: `About.tsx`, `Schedule.tsx`, `Artists.tsx`, `Faq.tsx`, `Gallery.tsx`, `Contact.tsx`, `NotFound.tsx`. Bump `pt-24` → `pt-36` (and `pt-32` → `pt-44` where used) on the first hero/header element only.

### Out of scope
- No changes to the homepage layout or its existing `CountdownBanner` section.
- No changes to the `CountdownBanner` component itself — the ribbon is a separate, smaller component.