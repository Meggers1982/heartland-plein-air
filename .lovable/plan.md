## Changes

### 1. Lighten the footer to match the new header nav
In `src/components/SiteFooter.tsx`, invert the footer from dark-on-cream to cream-on-dark, mirroring the header nav changes:
- Footer container: `bg-foreground` → `bg-background`, `text-primary-foreground` → `text-foreground`
- All headings, body text, links, addresses: swap `text-primary-foreground/*` → `text-foreground/*`
- Borders: swap `border-primary-foreground/10`, `border-primary-foreground/20` → `border-foreground/10`, `border-foreground/20`
- Newsletter input: swap `bg-primary-foreground/5`, `border-primary-foreground/20`, `text-primary-foreground` → light-background equivalents (`bg-foreground/5`, `border-foreground/20`, `text-foreground`)
- Social icon buttons: swap border and text colors to `foreground` equivalents
- Keep `bg-primary` buttons/accents and `text-primary` hover states unchanged (terracotta works on both light and dark)
- Brush stroke divider stays as-is

### 2. Remove background color behind the logo
In `src/components/SiteFooter.tsx`, the logo `<Link>` currently has `bg-background` (cream panel on dark footer). Remove that class so the logo sits directly on the footer surface.

In `src/components/SiteNav.tsx`, verify the logo wrapper has no explicit background class (it currently does not — it sits on the `bg-background/90` nav). No change needed.