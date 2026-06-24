# Heartland Plein Air Arts Festival — Agent Guide

## What This Project Is
A static festival website for the Heartland Plein Air Arts Festival (September 13–19, 2026) in Douglas and Sarpy County. Features 25 nationally recognized artists, an interactive schedule, Google Maps venue integration, artist bios, a gallery lightbox, and newsletter signup. There is no backend — all data is static TypeScript files.

## Tech Stack
- **Framework:** React 18 + Vite 5 (SWC compiler)
- **Language:** TypeScript (loose mode — strict is off)
- **Routing:** React Router v6 (client-side only)
- **Styling:** Tailwind CSS 3 with custom brand theme
- **Components:** shadcn/ui (Radix UI primitives)
- **Forms:** React Hook Form + Zod
- **Data fetching:** TanStack React Query
- **Maps:** Google Maps API (loaded dynamically)
- **Testing:** Vitest + Testing Library

## Project Structure
```
/src
  ├── pages/        → 8 route pages (Index, About, Schedule, Artists, Gallery, Faq, Contact, NotFound)
  ├── components/   → Custom components + /ui (shadcn primitives)
  ├── data/         → ALL static data lives here (artists.ts, gallery.ts, faq.ts, locations.ts)
  ├── lib/          → Utilities: utils.ts (cn helper), meta.ts (SEO), ics.ts (calendar export)
  ├── hooks/        → useInView.ts, use-mobile.tsx, use-toast.ts
  ├── assets/       → Images, artist headshots (webp)
  └── test/         → Vitest setup and test files
```

## Commands
- `npm run dev` — start dev server on localhost:8080
- `npm run build` — production build
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint
- `npm test` — run tests once
- `npm run test:watch` — run tests in watch mode

## Conventions

### Components
- One component per file, named with PascalCase matching the filename
- Page components live in `/src/pages/`, reusable components in `/src/components/`
- shadcn/ui primitives live in `/src/components/ui/` — do not edit these directly
- Use Tailwind utility classes for all styling — no CSS modules or inline styles
- Responsive classes follow Tailwind breakpoints: `sm:`, `md:`, `lg:`

### Pages
Every page component must:
1. Include `<SiteNav />` and `<SiteFooter />`
2. Set page meta using `setPageMeta()` from `/lib/meta.ts` inside a `useEffect`
3. Be registered as a route in `App.tsx` before the catch-all `*` route

### Data
- All content lives in `/src/data/` as TypeScript files — this is the source of truth
- To update artist info, bios, photos, events, FAQs, or map locations: edit the relevant file in `/src/data/`
- Do not hardcode content inside components — import from `/src/data/`

### Styling
- Brand colors are defined as CSS custom properties in `index.css` and as Tailwind config tokens
- Primary palette: burnt orange (`festival-orange`), teal (`festival-teal`), cream (`festival-cream`), plum, sun gold
- Fonts: Playfair Display for headings (`font-display`), Source Sans 3 for body (`font-body`)
- Animations: use the `useInView` hook + `animate-fade-in-up` class for scroll-triggered reveals

### Routing
- All routes are defined in `App.tsx`
- New routes must be added before the `<Route path="*">` catch-all
- Navigation uses React Router `<Link>` — do not use `<a>` tags for internal links

### TypeScript
- Strict mode is off — types are loose by design for flexibility
- Use explicit types for component props and data shapes
- Path alias `@/` maps to `src/` — use it for all imports

## What Not to Do
- Do not edit files in `/src/components/ui/` — these are shadcn/ui primitives managed by the CLI
- Do not commit `.env` — it contains live Google Maps API keys
- Do not add the catch-all `*` route before other routes in `App.tsx`
- Do not add a backend or database — this is intentionally a static frontend
- Do not install new packages without confirming first
- Do not use inline styles or `<style>` tags — use Tailwind classes
- Do not use `<a>` tags for internal navigation — use React Router `<Link>`
- Do not modify `package-lock.json` or `bun.lock` directly — only via `npm install`

## Sensitive Files — Do Not Touch
- `.env` — contains live Google Maps API keys; never log, expose, or commit
- `/src/assets/artists/` — artist headshot images; replace only with confirmed new images

## Adding New Content

### New artist
Edit `/src/data/artists.ts` — add an entry to the `artists` array following the existing shape.

### New gallery painting
Edit `/src/data/gallery.ts` — add to the `galleryArtists` array, linked by artist ID.

### New FAQ item
Edit `/src/data/faq.ts` — add to the `faqItems` array with `question` and `answer` fields.

### New map location
Edit `/src/data/locations.ts` — add an entry with `id`, `name`, `lat`, `lng`, and associated events.

### New page
1. Create the component in `/src/pages/`
2. Add the route in `App.tsx` before the `*` catch-all
3. Add a link in `SiteNav.tsx` if it should appear in navigation
4. Call `setPageMeta()` in a `useEffect` for SEO

## Testing
- Tests live in `src/test/` or alongside components as `*.test.tsx`
- Run `npm test` before committing changes
- Testing Library + Vitest globals are available — no imports needed for `describe`, `it`, `expect`

## Git Workflow
- Default branch is `main`
- After making changes: run `npm run lint` and `npm test`, then commit with a clear message
- Push updates to GitHub when ready — do not push until lint and tests pass
