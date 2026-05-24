## Goal
Add a fixed "back to top" arrow button to every page that doesn't already have one.

## Current State
- `Schedule.tsx` already implements this feature correctly.
- `Index.tsx`, `About.tsx`, `Artists.tsx`, and `Faq.tsx` are missing it.
- `NotFound.tsx` is a minimal error page and doesn't need it.

## Approach
Replicate the existing `Schedule.tsx` pattern:
1. Add `useState(false)` for `showTopBtn`.
2. Add a scroll listener in `useEffect` that sets the state when `window.scrollY > 400`.
3. Render a fixed-position circular button at `bottom-8 right-8` using `ArrowUp` from `lucide-react`.
4. The button smoothly scrolls to top on click and fades in/out via opacity classes.

## Files to Edit
- `src/pages/Index.tsx`
- `src/pages/About.tsx`
- `src/pages/Artists.tsx`
- `src/pages/Faq.tsx`

## No New Dependencies
Uses existing `lucide-react` icon and Tailwind classes already present in `Schedule.tsx`.