## Plan: Schedule Page

Create a dedicated `/schedule` route featuring the full narrative copy from the uploaded document, while keeping the existing condensed `ScheduleSection` on the home page as a teaser.

### New file: `src/pages/Schedule.tsx`
- Shared nav + footer styling matching `Index.tsx` (reusing same markup; mobile hamburger included)
- Hero header band with title "Schedule of Events" and date range "September 12 – October 2, 2026"
- Intro section with the three opening paragraphs about plein air and the festival
- Day-by-day sections (Sept 12, 13, 14, 15, 16, 17, 18, 19, and Sept 19–Oct 2), each with:
  - Day label (eyebrow)
  - Headline (e.g., "It Starts with the Kids")
  - Narrative paragraph
  - Bulleted event list with time, name, and location
- `BrushStrokeDivider` between days for visual rhythm
- `AnimatedSection` for scroll reveals
- Closing CTA linking to ralstonarts.org / heartlandpleinair.org for online sales
- SEO: `<title>`, meta description, single H1

### Routing: `src/App.tsx`
- Add `<Route path="/schedule" element={<Schedule />} />` above the catch-all

### Navigation update: `src/pages/Index.tsx`
- Change the "Schedule" nav link from `#schedule` anchor to `/schedule` route (using `react-router` `Link`), so both desktop and mobile nav point to the new page
- Keep the existing on-page `ScheduleSection` as a teaser; add a "View full schedule" link/button beneath it pointing to `/schedule`

### Schedule page nav behavior
- Nav links that point to home-page sections (#about, #highlights, etc.) navigate to `/#about`, etc., so they work from the schedule route
- "Schedule" link stays as `/schedule`

### Out of scope
- No changes to copy on the existing `ScheduleSection` cards
- No design system / token changes
