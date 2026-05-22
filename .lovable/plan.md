## Move the festival map to its own full-width section

Restructure the Schedule page so the map breathes between the intro and the day cards.

### Changes to `src/pages/Schedule.tsx`

1. Remove the map block (lines 338–349) from inside the narrow `max-w-3xl` intro section.
2. Add a new full-width section between the intro section and the existing `<BrushStrokeDivider />`:
   - Section padding consistent with neighbors (`py-16` or `py-20`)
   - Inner container `max-w-6xl` so the map spans wider than the prose column
   - Keep the eyebrow ("Where to find us"), H2 ("Festival locations"), and helper paragraph above the map
   - Wrap in `AnimatedSection` to match scroll-in behavior

### Resulting flow

```
Header
Intro (jump nav + prose)        ← narrow column
─ Festival locations + Map ─    ← full width, new section
BrushStrokeDivider
Day cards                       ← narrow column
```

No changes to `LocationsMap.tsx`, data, or styling tokens.