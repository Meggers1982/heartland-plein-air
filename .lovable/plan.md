## Schedule page improvements

### 1. Extract shared chrome
- New `src/components/SiteNav.tsx` — current nav from `Index`/`Schedule`, with router-aware link handling.
- New `src/components/SiteFooter.tsx` — current footer markup.
- Replace nav/footer in `src/pages/Index.tsx` and `src/pages/Schedule.tsx` with these components. Fix footer date drift to **September 13–19, 2026** (canonical, per project memory).

### 2. Schedule page UX
- **Jump-to-day chip strip** under the header: sticky on scroll, one chip per day (Sat 12, Sun 13, … Sep 19–Oct 2), smooth-scrolls to `#day-N` anchors on each `<article>`.
- **Event badges** on each day card:
  - "Free · Public" — youth events, quick paints, lecture, public exhibition
  - "Tickets required" — Collector's Soirée
  - "Artists only" — Sunday orientation, mentor session
- **Map links**: turn each `ev.location` into an external Google Maps search link (`https://www.google.com/maps/search/?api=1&query=<encoded address>`), opens in new tab. No API/connector needed — just link out.
- **Date treatment**: replace tiny uppercase eyebrow with a larger left-aligned display date ("SAT · SEP 12") for better scanning. Keep current card structure otherwise.

### 3. Content/consistency fixes
- Soften "every September" → "each September" in intro paragraph 2 (festival is new).
- Stable list keys: `${d.day}-${ev.name}` instead of index.
- Mobile menu: swap `max-h-96` for `max-h-[32rem]` in the shared nav to avoid clipping.

### 4. SEO
- Add `<link rel="canonical" href="/schedule">` via the existing `useEffect` head-management block.
- Inject `Event` JSON-LD (one `Event` per public schedule entry) into the document head on mount; remove on unmount.

### Out of scope
- No design-system token changes.
- No new colors/fonts.
- No changes to `ScheduleSection` card on the homepage.
- No print stylesheet, no .ics download, no timeline rail, no hero texture (can do in a follow-up if wanted).

### Technical notes
- New files:
  - `src/components/SiteNav.tsx`
  - `src/components/SiteFooter.tsx`
  - `src/components/ScheduleJumpNav.tsx` (sticky chip strip)
- Edited files:
  - `src/pages/Schedule.tsx` — use new components, add badges/map links/anchors/JSON-LD/canonical, date treatment.
  - `src/pages/Index.tsx` — use shared nav + footer.
- Event data gets two new optional fields: `audience: "public" | "ticketed" | "artists"` on the day (or per-event), and addresses parsed out of existing `location` strings for the maps URL (regex to grab the parenthesized address).
