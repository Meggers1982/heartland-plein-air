## Goal

One CTA across the entire site: the newsletter signup. Remove every other call-to-action button or link-styled CTA so attention concentrates on a single, well-designed conversion point.

## 1. Remove existing CTAs

**`src/pages/Index.tsx`**
- Hero: remove the "Learn More" and "Festival Highlights" button row (lines ~128–146).
- About section: remove the "Learn More About the Festival" link (lines ~174–179).
- Post-schedule: remove the "View Full Schedule" link block (lines ~228–235).

**`src/pages/About.tsx`**
- Remove the "Meet the Artists" link (lines ~91–96).
- Remove the "View Full Schedule" link (lines ~122–127).

**`src/pages/Schedule.tsx`**
- Keep the existing `<NewsletterCTA />` at the bottom (it's the global CTA).

**`src/components/SiteFooter.tsx`**
- No CTA changes. Social icons remain (informational, not a CTA).

## 2. Add the global CTA everywhere

Mount `<NewsletterCTA />` at the bottom of every page (just above `<SiteFooter />`):
- Index — already present, keep.
- Schedule — already present, keep.
- About — add it.
- Artists — add it.

This guarantees one consistent CTA at the end of every page.

## 3. Redesign the Newsletter CTA

Replace `src/components/NewsletterCTA.tsx` with a more enticing, visually pleasing version while staying within the project's design system (Playfair Display headings, Source Sans 3 body, warm earthy palette, brush-stroke motif, scroll animations).

**Content improvements**
- Eyebrow: "Join the Festival" (uppercase tracked).
- Headline: "Be First to Know" (Playfair, large).
- Subhead: a tighter, more enticing pitch — e.g. "Artist reveals, paint-out locations, exhibition previews, and Collector's Soirée access — delivered the moment they're announced."
- Trust line under the form: "No spam. Unsubscribe anytime. Festival updates only."
- Three short value bullets above the form with small icons (Palette/Calendar/Sparkles or similar from lucide-react): "Artist announcements", "Event schedules & maps", "Early collector access".

**Visual improvements**
- Background: warm earthy gradient (using existing tokens — e.g. `from-foreground via-foreground to-primary/30`) instead of flat dark.
- Decorative brush-stroke divider at the top using the existing `BrushStrokeDivider` motif.
- Centered card-on-section layout with generous whitespace, max-width ~640px for copy, ~480px for form.
- Form: pill-rounded input + button, larger touch targets, focus ring in primary. On small screens stacked; on `sm+` inline.
- Submit state: on submit, validate email with zod; show inline error if invalid; on success swap to a confirmation block ("Thanks — you're on the list.") with a subtle fade/slide animation.
- Subtle scroll-in animation via existing `AnimatedSection`.
- Optional: small decorative paint-stroke SVG accents flanking the headline.

**Accessibility / SEO**
- Proper `<label>` (visually hidden) for the email input.
- `aria-live="polite"` region for success/error messaging.
- Single `<h2>` per section.

## Technical notes

- Use `zod` for client-side email validation; show errors inline (no toast spam).
- No backend wiring requested — keep submit as a local success state (preserved `e.preventDefault()`), ready for a future Lovable Cloud hookup.
- All colors via semantic tokens (`bg-foreground`, `text-background`, `bg-primary`, etc.); no hard-coded hex.
- Keep component self-contained; no new routes or providers.

## Out of scope

- Wiring the newsletter to an actual mailing list backend.
- Changing navigation, footer links, or social icons.
- Editorial copy elsewhere on the site beyond the removed CTA buttons.
