## Problem

In `src/pages/Artists.tsx`, five artists have their headshot images already imported at the top of the file, but their entries in the `artists` array still reference the old generic `artist2`–`artist6` placeholders and are missing their `alt` text. As a result, the wrong images render on `/artists`.

## Fixes in `src/pages/Artists.tsx`

| # | Artist | Current `src` | Change `src` to | Add `alt` |
|---|---|---|---|---|
| 1 | Jason Bailey (line 42) | `artist2` | `jasonBailey` | "bearded artist smiling in black and white studio portrait" |
| 2 | Bob Beck (line 44) | `artist4` | `bobBeck` | "man wearing glasses outdoors in plaid button-up shirt" |
| 3 | Brenda Pinnick (line 55) | `artist3` | `brendaPinnick` | "smiling woman in black cap standing in wooded area" |
| 4 | Jill Stefani Wagner (line 58) | `artist6` | `jillWagner` | "smiling woman in black cap outdoors among trees" |
| 5 | Jeff Williams (line 63) | `artist5` | `jeffWilliams` | "smiling man in black and white portrait by brick wall" |

## Not changed (no headshot uploaded yet)

- Kristin K. Hosbein — still using `artist4` placeholder
- Fernando Micheli — still using `artist2` placeholder

These will keep the generic placeholder until photos are provided. Let me know if you'd like the `placeholderHeadshot` SVG used for them instead.

## Already correct (no change needed)

All other artists in the array (Hector Acuna, Jacalyn Beam, Michele Byrne, Robin Cheers, Larry DeGraff, John Evans, Debra Joy Groesser, Ann Larsen, John Lasater, Dan Marshall, Radhika Srinivas, Steve Stauffer, Durre Waseem, Ann Watcher, Robin Weiss, Chris Willey, Stephen Wysocki) and the awards judge Rick J. Delanty are already pointing at their correct uploaded headshots with proper alt text.
