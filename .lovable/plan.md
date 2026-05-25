## Lighten Header Nav So Logo Reads

The header bar is dark teal (`bg-foreground/80`) and the logo's silhouette + wordmark are also dark, so they disappear. Fix by switching the nav itself to a light cream surface that matches the logo's intended background.

### Changes in `src/components/SiteNav.tsx`

**Nav background**
- Change `bg-foreground/80 backdrop-blur-md` → `bg-background/90 backdrop-blur-md` with a subtle bottom border (`border-b border-border`) so it still separates from page content.

**Desktop nav links**
- Change link color from `text-primary-foreground/80 hover:text-primary-foreground` → `text-foreground/80 hover:text-primary` (dark teal text on cream, terracotta hover).

**Mobile menu**
- Hamburger icon color: `text-primary-foreground` → `text-foreground`.
- Mobile drawer border: `border-primary-foreground/10` → `border-border`.
- Mobile link colors: `text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground` → `text-foreground/80 hover:bg-muted hover:text-primary`.

**Countdown ribbon (sits inside the nav wrapper)**
- The ribbon stays terracotta (`bg-primary`) — already reads great against a cream nav. Drop its top border (`border-t border-primary-foreground/15`) since the cream-to-terracotta transition is already a clean edge.

### Out of scope
- No changes to the logo asset or any backdrop on the logo
- No changes to page content, the ribbon's internal styling, or footer
- No global token (`--foreground`, `--background`) changes — only the nav surface and link colors change