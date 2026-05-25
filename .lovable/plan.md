## Issue

In `src/App.tsx`, the Gallery import and `<Route>` were added at the very top of the file, outside the `<Routes>` block and before the other imports. That's invalid — the `<Route>` is a stray JSX expression at module top-level, so the Gallery route never registers and `/gallery` falls through to NotFound (confirmed by the console 404 log).

Also, the nav links Gallery to `/#gallery` (a homepage anchor) instead of the new `/gallery` page.

## Changes

**`src/App.tsx`**
- Remove the two stray lines at the top of the file (`import Gallery...` and `<Route path="/gallery"... />`).
- Add `import Gallery from "./pages/Gallery";` alongside the other page imports.
- Add `<Route path="/gallery" element={<Gallery />} />` inside the `<Routes>` block, above the catch-all `*` route.

**`src/components/SiteNav.tsx`**
- Change the Gallery nav link's `href` from `/#gallery` to `/gallery` so it routes to the dedicated page.

## Out of scope

- No changes to `src/pages/Gallery.tsx`, gallery data, or the lightbox.
- No changes to the prerender script (Gallery is already listed there).
