## Schedule page additions

### 1. Newsletter CTA section
Extract the homepage's "Stay in the Loop" newsletter section into a reusable `src/components/NewsletterCTA.tsx` (dark `bg-foreground` band with email input + Subscribe button). Replace the inline markup in `Index.tsx` with the new component, then drop the same component into `Schedule.tsx` just above `<SiteFooter />`.

### 2. "Notify Me" button on the online-sales day card
In the final day card ("Can't Make It in Person?" — `id: "day-online"`) inside `src/pages/Schedule.tsx`, add a primary-styled button beneath the narrative labeled **"Notify me when online sales open"**. It will smooth-scroll to the new newsletter section (`#newsletter`) so the same email signup captures the interest. When real online-sales URLs exist later, swap the handler to link out.

### Out of scope
- No backend wiring for the newsletter (form stays `preventDefault`, same as homepage).
- No changes to the existing bottom "Online Sales / Browse from wherever you are" CTA block.
- No design-token or layout changes elsewhere.

### Files
- **New:** `src/components/NewsletterCTA.tsx`
- **Edit:** `src/pages/Index.tsx` (use new component), `src/pages/Schedule.tsx` (add component + notify button with `#newsletter` anchor)
