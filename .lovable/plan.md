## Polish Festival Schedule formatting

Edit `src/components/ScheduleSection.tsx` only.

### 1. Restructure data
New shape per day:
```ts
{ date: string; weekday: string; title: string; icon: LucideIcon;
  description: string; events: { time: string; location: string }[];
  links?: { label: string; href: string }[] }
```
- Sept 12 — Pre-Festival Youth Paint Out → 2 events (Wildwood Park 10–2; Baright Library 5–7).
- Sept 13 — Artist Orientation → single event, no time, location only.
- Sept 14 — Quick Paint: Benson → 1 event.
- Sept 15 — Quick Paint: Dundee → 1 event.
- Sept 16 — Cathedral & Castle + Youth Mentors → 2 events (Quick Paint lunchtime, 40th St; Mentor Sessions 4–5:30).
- Sept 17 — Artist Lecture & Evening Quick Paint → 2 events (Lecture 5–6 at Library; Quick Paint 6–8 at Main & 77th).
- Sept 18 — Collector's Soirée → 1 event at The Granary.
- Sept 19 — Public Exhibition & Auction → 1 event at The Granary.
- Sept 19 – Oct 2 — Online Art Sales → no time row; `links` to ralstonarts.org and heartlandpleinair.org.

### 2. Card layout
- Header: eyebrow `date` (uppercase tracked primary text-xs) over `weekday` (display, text-xl, foreground). Title h3 stays below at text-lg.
- Description unchanged.
- Events list separated from description by `border-t border-border/60 mt-4 pt-4`, with `space-y-2` between sub-events.
- Each sub-event row: `Calendar` icon + bold time (`text-sm font-semibold text-foreground`), `MapPin` icon + location (`text-sm text-muted-foreground`). Stack vertically on mobile, inline-flex with gap-4 on `sm:`.
- For right-aligned (odd index) cards: keep `md:text-right` and reverse icon order so icons stay on the outer edge using `md:flex-row-reverse`.
- Online Sales entry: no Calendar/MapPin row; render `links` as anchor tags `text-primary hover:underline`, separated by `·`.

### 3. Polish
- Card: add `ring-1 ring-border/40`, bump padding to `p-7`.
- Keep existing AnimatedSection wrapper, timeline dot, and alternating layout untouched.
