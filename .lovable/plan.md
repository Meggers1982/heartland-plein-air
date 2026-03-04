

## Visual Appeal Improvements

After comparing your current site with the reference (Peninsula School of Art), here are targeted improvements:

### 1. Scroll-triggered animations
Add fade-in and slide-up animations to sections as users scroll down. Currently the page is entirely static — adding intersection observer-based animations would make each section feel alive.

### 2. Parallax effect on the hero image
Add a subtle parallax scroll effect to the hero background image so it moves at a different rate than the text overlay, creating depth.

### 3. Image gallery / painting showcase section
Add a masonry or grid gallery section between Highlights and FAQ showing sample plein air paintings. This is the most impactful visual addition — an art festival site needs art on display.

### 4. Hover effects on highlight cards
Add scale-up transforms and subtle shadow transitions on the highlight cards for interactivity.

### 5. Smooth scroll navigation
Add smooth scrolling behavior for anchor links so clicking nav items glides to sections instead of jumping.

### 6. Decorative accents
Add subtle decorative elements like a painted brush stroke divider between sections (using an SVG or CSS shape), reinforcing the artistic theme.

### 7. Countdown timer
Replace the static "Save the Date" banner with a live countdown to September 13, 2026 — adds dynamism and urgency.

### 8. Better typography hierarchy in the hero
Add a subtle text-shadow to the hero heading for better legibility, and animate the hero text elements with staggered fade-ins on page load.

### Technical approach
- Use a custom `useInView` hook (Intersection Observer) for scroll animations
- CSS `background-attachment: fixed` or transform-based parallax for the hero
- Add a new `GallerySection` component with placeholder painting images
- Use existing Tailwind animation utilities plus new keyframes for staggered entrance effects
- All changes in `Index.tsx`, `index.css`, and `tailwind.config.ts`

