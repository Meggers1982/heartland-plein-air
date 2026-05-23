## Problem

Debra Joy Groesser's headshot import exists (`debraJoyGroesser` from `@/assets/artists/debra-joy-groesser.webp`), but her entry in the `artists` array at line 36 of `src/pages/Artists.tsx` still references the old placeholder `artist3`, so the wrong image renders.

## Fix

In `src/pages/Artists.tsx`, update Debra Joy Groesser's entry:

- Change `src: artist3` → `src: debraJoyGroesser`
- Add `alt: "smiling woman with glasses posing in front of framed coastal paintings in an art gallery"`