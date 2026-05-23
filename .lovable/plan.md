# Apply the Official Festival Palette to the Site

Map the brand colors to semantic design tokens in `src/index.css` so every component re-themes automatically — no per-component edits needed.

## Color-to-token mapping

| Token | Role | Hex | HSL |
|---|---|---|---|
| `--background` | Page background | `#FFE7C2` cream | `34 100% 88%` |
| `--foreground` | Body text | `#37484B` dark teal | `194 16% 26%` |
| `--card` / `--popover` | Cards, modals (slightly lighter than bg) | `#FFFFFF` | `0 0% 100%` |
| `--card-foreground` / `--popover-foreground` | Card text | `#37484B` | `194 16% 26%` |
| `--primary` | Buttons, links, accents | `#C46A3B` burnt orange | `19 55% 50%` |
| `--primary-foreground` | Text on primary | `#FFFFFF` | `0 0% 100%` |
| `--secondary` | Section bands, soft fills | `#D4B56A` soft gold | `42 53% 62%` |
| `--secondary-foreground` | Text on secondary | `#37484B` | `194 16% 26%` |
| `--muted` | Subtle backgrounds | warm cream tint `#F5DDB8` | `34 67% 84%` |
| `--muted-foreground` | Secondary text | `#692D4A` dark plum | `327 41% 29%` |
| `--accent` | Highlights, CTAs that pop | `#EA8832` gold orange (sun) | `27 82% 56%` |
| `--accent-foreground` | Text on accent | `#FFFFFF` | `0 0% 100%` |
| `--border` / `--input` | Hairlines, inputs | warm gold-tan `#D4B56A` at 60% mix → `42 35% 75%` |
| `--ring` | Focus rings | `#C46A3B` | `19 55% 50%` |
| Brand extras (new tokens) | | | |
| `--brand-dark-brown` | Foreground grass, deep accents | `#6B3A2A` | `15 43% 29%` |
| `--brand-plum` | Editorial text accent | `#692D4A` | `327 41% 29%` |
| `--brand-sun` | Highlight pop | `#EA8832` | `27 82% 56%` |
| `--brand-soft-gold` | Highlight pop | `#D4B56A` | `42 53% 62%` |

## What changes

1. **`src/index.css`** — rewrite the `:root` color block with the HSL values above. Update `--hero-overlay` to use dark teal (`hsla(194, 16%, 18%, …)`) instead of warm brown so the hero image grades into the new dark text color.

2. **Dark mode** (`.dark`) — recolor with the same brand palette inverted: background `#37484B` dark teal, foreground cream `#FFE7C2`, primary stays burnt orange (slightly lifted lightness for contrast), accent stays gold orange, card slightly lighter than bg.

3. **`tailwind.config.ts`** — extend `colors` with brand utilities so we can opt into raw brand colors when needed:
   ```ts
   brand: {
     teal: "hsl(var(--foreground))",
     burntOrange: "hsl(var(--primary))",
     sun: "hsl(var(--accent))",
     softGold: "hsl(var(--secondary))",
     darkBrown: "hsl(var(--brand-dark-brown))",
     plum: "hsl(var(--brand-plum))",
     cream: "hsl(var(--background))",
   }
   ```

4. **Spot fixes for hardcoded colors** — sweep components for any non-token color references (e.g. `#8b5a2b`, `#1f1f1f`, `#6b6b6b`) and swap to tokens:
   - `src/components/LocationsMap.tsx` popup HTML inline styles → use brand hexes (`#C46A3B` for links, `#37484B` for body text).
   - Any other `text-white`, hardcoded greys, or stale hexes flagged by a quick grep.

## Accessibility check

- Cream `#FFE7C2` + dark teal `#37484B` body text → ~10:1 contrast ✓
- Burnt orange `#C46A3B` + white → ~3.8:1 (large text / buttons only — fine for ≥18px bold)
- Gold orange `#EA8832` reserved for accents/highlights, not body text
- Soft gold `#D4B56A` reserved for fills, not text-on-cream

## Out of scope

- No layout, copy, or component structure changes
- No logo/image edits
- No font changes (Playfair Display / Source Sans 3 stay)
