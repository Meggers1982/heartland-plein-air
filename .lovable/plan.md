## Plan: Redesign global SiteFooter

Replace the current minimal centered footer in `src/components/SiteFooter.tsx` with a richer multi-column layout. Used globally — no route changes needed.

### Layout (desktop: 4 columns, mobile: stacked)

```
[ LOGO              ] [ Visit          ] [ Explore     ] [ Stay in Touch     ]
[ About blurb (2-3  ] [ Ralston HINGE   ] [ Home         ] [ Compact email     ]
[  sentences about  ] [  Creative Dist. ] [ About        ] [  signup form      ]
[  the festival)    ] [ 5500 S 77th St  ] [ Schedule     ] [                   ]
[                    ] [ Ralston, NE     ] [ Artists      ] [ Social icons:     ]
[                    ] [  68127          ] [ Gallery      ] [  Facebook         ]
[                    ] [ (402) 953-9173  ] [ FAQ          ] [  Instagram        ]
[                    ] [                  ] [ Contact      ] [                   ]
---------------------------------------------------------------------------
       © 2026 Heartland Plein Air Arts Festival. All rights reserved.
                       Presented by Ralston Arts
```

### Content details

- **Column 1 — Brand**: Full-color `heartland-logo.png` (height ~16) + short blurb: "A week-long celebration of plein air painting across Douglas & Sarpy County, September 13–19, 2026."
- **Column 2 — Visit**: Heading "Visit", venue name "Ralston HINGE Creative District", full address, phone as `tel:` link.
- **Column 3 — Explore**: Heading "Explore", quick links mirroring nav (Home, About, Schedule, Artists, Gallery, FAQ, Contact) using react-router `Link` for routes and hash links for in-page anchors.
- **Column 4 — Stay in Touch**: Heading + compact email input with submit button (visual only — uses same toast-on-submit pattern as `NewsletterCTA`, validated with `zod` email schema). Below it: Facebook and Instagram icons linking to the provided URLs (Instagram replaces YouTube; YouTube removed since no URL provided).

### Styling

- Dark background using `bg-foreground` to echo the nav, with `text-primary-foreground` family for legibility (warm earthy palette preserved).
- A `BrushStrokeDivider` at the very top of the footer for visual continuity.
- Playfair Display for column headings, Source Sans 3 for body — per project memory.
- Bottom bar separated by a subtle `border-primary-foreground/10` rule, smaller muted text.
- Fully responsive: 1 col mobile → 2 col `md` → 4 col `lg`.

### Technical notes

- Single-file change to `src/components/SiteFooter.tsx`.
- Add a small inline `FooterSignup` subcomponent with `zod` email validation and `sonner` toast on submit (no backend wiring — matches existing `NewsletterCTA` behavior).
- Icons: keep `Facebook`, `Instagram` from `lucide-react`; remove `Youtube`. Add `MapPin`, `Phone` for the address column.
- No new dependencies; `zod` and `sonner` are already in the project.
