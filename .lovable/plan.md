## Restyle Contact Form (Parchment Refinement)

Apply the selected "Parchment Refinement" direction to the contact form on `/contact`. Scope: the form card only — no changes to the left contact-info column, page header, or any other section.

### Changes in `src/pages/Contact.tsx`

**Form card wrapper**
- Replace `rounded-lg`/`shadow-sm`/`p-8 md:p-10` with `rounded-sm`, `p-8 md:p-12`, and a softer warm drop shadow (`shadow-[0_24px_48px_-12px_hsl(var(--foreground)/0.08)]`).

**Inputs (Name, Email, Subject, Message)**
- Change background from `bg-background` (peach, blends with the page) to `bg-muted/60` (soft cream that reads as parchment against the white card).
- Increase padding to `py-3.5`, switch corners to `rounded-sm` for a more editorial feel.
- Add subtle placeholder text (`Your name`, `hello@example.com`, etc.) in `text-muted-foreground/50`.
- Focus state: border becomes `primary`, background lifts to `bg-card` (white), with a soft `ring-1 ring-primary/20`.
- Textarea: `resize-none` instead of `resize-y`.

**Labels**
- Restyle to `text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground` with `px-1` and `space-y-1.5` grouping — small, refined, all-caps editorial labels.

**Spacing**
- Form gap: `space-y-6`; grid gap: `gap-6`.

**Submit button**
- Increase to `px-10 py-4`, `text-xs font-bold tracking-[0.2em]`.
- Add `shadow-primary/20`, hover `bg-primary/90`, keep the existing lift on hover.
- Wrap in a `pt-2` div for breathing room.

**Tokens**
- Use semantic tokens throughout (`bg-muted`, `bg-card`, `border-border`, `text-muted-foreground`, `text-foreground`, `primary`) — no hardcoded hex values.

### Out of scope
- Left column (contact info, social icons)
- Page header / hero
- NewsletterCTA, CountdownBanner, SiteFooter
- Form validation logic, schema, and submit behavior (no functional changes)