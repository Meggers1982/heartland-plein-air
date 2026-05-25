## Move FAQ topics under search bar

Restructure the FAQ page so the topic navigation appears directly below the search input in the hero, instead of in a left sidebar.

### Changes to `src/pages/Faq.tsx`

1. **Hero section** — Add a horizontal topic chip row directly below the search input. Render the categories as pill-style buttons that wrap on smaller screens, centered under the search bar. Each chip shows the topic title and item count, and clicking it scrolls to that section. The active topic keeps the primary-accent styling already in use.

2. **Body section** — Remove the `<aside>` sidebar and switch the grid wrapper to a single column (`max-w-4xl`, no `lg:grid-cols-[260px_1fr]`). The content column becomes the full width of the container.

3. **Scroll behavior** — Keep the existing `scrollTo`, `activeId`, and scroll-spy logic unchanged so the chip row reflects which section is in view.

No other pages or components are affected.
