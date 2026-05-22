## Replace sticky jump nav with a mini week calendar

Swap the sticky chip strip for a single, non-sticky mini week calendar placed once near the top of the intro. Eight cells (Sat 12 → Sat 19) plus an "Online" cell, each linking to its day section.

### Changes

1. **Rewrite `src/components/ScheduleJumpNav.tsx`** as a `ScheduleWeekCalendar` (keep filename for minimal churn, or rename — see technical notes):
   - Non-sticky, centered card
   - Grid of 9 cells: weekday short label on top (SAT, SUN, …), large date number below (12, 13, …), plus a final "ONLINE" cell
   - Each cell is an anchor that smooth-scrolls to its day section (reuse current scroll-with-offset logic)
   - Subtle hover state using existing tokens (border, bg-card → hover:border-primary)
   - Responsive: 9 columns on md+, wraps to a tighter 5-col grid on mobile

2. **Update `src/pages/Schedule.tsx`**:
   - Pass full day data (id, dayShort, dateNum) instead of just `{id, short}`
   - Move the component out from under the sticky header position and place it once at the top of the intro section (above the two intro paragraphs), so it reads as part of the page, not chrome
   - Remove the dark header gap that the sticky bar used to sit against

### Technical notes

- Item shape becomes `{ id, weekday, date }` (e.g., `{ id: "sat-12", weekday: "Sat", date: "12" }`). The "Online" cell is appended with no date number.
- Keep the existing `id` values on each day `<section>` so anchors keep working.
- No new dependencies. Pure Tailwind + existing semantic tokens (`bg-card`, `border-border`, `text-primary`, `font-display`, `font-body`).

### Out of scope

- No changes to day section content, table of events, or footer.
- No active-day highlighting on scroll (can add later if wanted).