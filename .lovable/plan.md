## Update Festival Schedule

Replace the `schedule` array in `src/components/ScheduleSection.tsx` with the 8 day entries from the attached markdown. The timeline layout, animations, and styling stay the same — only data changes.

### New schedule entries

1. **Sept 12 — Pre-Festival Youth Paint Out** (icon: Paintbrush)
   - 10 AM–2 PM Wildwood Park (Ralston Ave & 78th St) + 5–7 PM Youth Exhibition at Baright Library (5555 S. 77th St., Ralston)

2. **Sept 13 — Artist Orientation** (icon: Users)
   - Kickoff orientation for participating artists.

3. **Sept 14 — Quick Paint: Benson** (icon: Paintbrush)
   - Artists painting across the metro; Lunchtime Quick Paint Competition at Benson (62nd & Maple, Omaha).

4. **Sept 15 — Quick Paint: Dundee** (icon: Paintbrush)
   - Artists painting across the metro; Lunchtime Quick Paint Competition at Dundee (50th & Underwood, Omaha).

5. **Sept 16 — Quick Paint: Cathedral & Castle + Youth Mentor Sessions** (icon: Users)
   - Lunchtime Quick Paint along 40th St (Cuming–Davenport); 4–5:30 PM Youth–Professional Artist Mentor Sessions.

6. **Sept 17 — Artist Lecture & Evening Quick Paint** (icon: Gavel→swap to Paintbrush)
   - 5–6 PM Artist Lecture by Plein Air Judge at the Library (5555 S. 77th St.); 6–8 PM Evening Quick Paint during Concert (Main & 77th, Ralston).

7. **Sept 18 — Collector's Soirée** (icon: PartyPopper)
   - 5–8 PM music, food, award ceremony, and auction at The Granary (7401 Main St., Ralston).

8. **Sept 19 — Public Exhibition & Auction** (icon: Gavel)
   - 1–4 PM at The Granary (7401 Main St., Ralston).

9. **Sept 19 – Oct 2 — Online Art Sales** (icon: ShoppingBag)
   - Remaining artworks available at ralstonarts.org and heartlandpleinair.org.

### Technical notes

- Each entry uses the existing `{ day, title, icon, description, time, location }` shape so the rendered card layout is unchanged.
- Add `ShoppingBag` to the lucide-react import for the online sales entry.
- No changes to `Index.tsx` or other components.
