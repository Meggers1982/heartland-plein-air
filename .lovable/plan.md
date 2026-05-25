## Goal

The Gallery page (`/gallery`) and its data (`src/data/gallery.ts`) already exist with all 67 paintings sorted by artist and tagged with alt text from the uploaded spreadsheet. The page is already wired into the route table and navigation. What's missing is that its lightbox uses a custom full-screen overlay rather than the shadcn `Dialog`-based lightbox used on the Artists page.

This plan updates the Gallery lightbox to match the Artists page UX exactly.

## Changes

**`src/pages/Gallery.tsx`** — Replace the current custom lightbox with the Artists-page pattern:

- Use `Dialog` / `DialogContent` / `DialogHeader` / `DialogTitle` / `DialogDescription` from `@/components/ui/dialog`.
- Two-column layout inside the dialog: square image on the left, caption panel on the right with painting title (DialogTitle) and artist name (DialogDescription, uppercase tracked primary).
- Circular `ChevronLeft` / `ChevronRight` buttons positioned outside the dialog on the sides (`-left-14` / `-right-14`), wrapping through `allPaintings`.
- Keep existing keyboard navigation (←/→/Esc) and body-scroll lock.
- Remove the custom black-overlay markup, the bottom caption bar, and the manual close button (Dialog provides its own).
- Card grid, sticky artist jump-link bar, and section anchors stay as they are.

## Out of scope

- No changes to `src/data/gallery.ts` (already complete and correctly sorted by artist with alt text from the spreadsheet).
- No changes to routing, nav, or other pages.
