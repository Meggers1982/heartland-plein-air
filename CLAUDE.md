# Heartland Plein Air Arts Festival — Agent Guide

## What This Project Is
A static festival website for the Heartland Plein Air Arts Festival (September 13–19, 2026) in Douglas and Sarpy County. Features 25 nationally recognized artists, an interactive schedule, Google Maps venue integration, artist bios, a gallery lightbox, and newsletter signup. There is no backend — all data is static TypeScript files.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (loose mode — strict is off)
- **Routing:** Next.js file-based routing (`src/app/**/page.tsx`) — no React Router
- **Styling:** Tailwind CSS 3 with custom brand theme
- **Components:** shadcn/ui (Radix UI primitives)
- **Forms:** React Hook Form + Zod
- **Data fetching:** TanStack React Query
- **Maps:** Google Maps API (loaded dynamically)
- **Testing:** Vitest + Testing Library
- **Package manager:** npm (`package-lock.json` is the source of truth — there is no bun lockfile)

## Project Structure
```
/src
  ├── app/               → Route files, one per route: `<route>/page.tsx` (thin wrappers that set
  │                         Next.js `metadata` and render the matching page-component)
  ├── page-components/    → Actual page implementations (About, Artists, Blog, Contact, Faq,
  │                         Gallery, Index, NotFound, OpenDivision, Schedule, Sponsors, etc.)
  │                         — named this way (not `pages/`) specifically to avoid Next.js Pages
  │                         Router auto-pickup
  ├── components/         → Custom components + /ui (shadcn primitives)
  ├── data/                → ALL static data lives here (artists.ts, gallery.ts, faq.ts,
  │                         locations.ts, schedule.ts, blog.ts, sponsors.ts, etc.)
  ├── lib/                 → Utilities: utils.ts (cn helper), meta.ts (client-side meta helper),
  │                         ics.ts (calendar export), schema.ts (structured data)
  ├── hooks/               → useInView.ts, use-mobile.tsx, use-toast.ts
  ├── App.tsx              → Client-side providers (React Query, Toaster, TooltipProvider) —
  │                         mounted from src/app/layout.tsx, not a router
  └── test/                → Vitest setup and test files
public/assets/             → Images, artist headshots (webp) — moved out of src/assets during the
                              Vite → Next.js migration; referenced as URL strings, not imports
```

## Commands
- `npm run dev` — start dev server on localhost:8080
- `npm run build` — production build
- `npm start` — run the production build locally
- `npm run lint` — run ESLint (`next lint`)
- `npm test` — run tests once
- `npm run test:watch` — run tests in watch mode

## Conventions

### Components
- One component per file, named with PascalCase matching the filename
- Route wrappers live in `/src/app/<route>/page.tsx`; actual page implementations in `/src/page-components/`; reusable components in `/src/components/`
- shadcn/ui primitives live in `/src/components/ui/` — do not edit these directly
- Use Tailwind utility classes for all styling — no CSS modules or inline styles
- Responsive classes follow Tailwind breakpoints: `sm:`, `md:`, `lg:`

### Pages / Routes
Every route must:
1. Live at `src/app/<route>/page.tsx`, export a Next.js `metadata` object (title, description, `alternates.canonical`), and render the matching component from `/src/page-components/`
2. The page-component itself should include `<SiteNav />` and `<SiteFooter />`
3. New internal links use `next/link`'s `<Link>` — do not use `<a>` tags for internal navigation

### Data
- All content lives in `/src/data/` as TypeScript files — this is the source of truth
- To update artist info, bios, photos, events, FAQs, or map locations: edit the relevant file in `/src/data/`
- Do not hardcode content inside components — import from `/src/data/`

### Styling
- Brand colors are defined as CSS custom properties in `src/app/globals.css` and as Tailwind config tokens
- Primary palette: burnt orange (`festival-orange`), teal (`festival-teal`), cream (`festival-cream`), plum, sun gold
- Fonts: Playfair Display for headings (`font-display`), Source Sans 3 for body (`font-body`)
- Animations: use the `useInView` hook + `animate-fade-in-up` class for scroll-triggered reveals

### TypeScript
- Strict mode is off — types are loose by design for flexibility
- Use explicit types for component props and data shapes
- Path alias `@/` maps to `src/` — use it for all imports

## What Not to Do
- Do not edit files in `/src/components/ui/` — these are shadcn/ui primitives managed by the CLI
- Do not commit `.env` — it contains live Google Maps API keys and is gitignored; keep it that way
- Do not add a backend or database — this is intentionally a static frontend
- Do not install new packages without confirming first
- Do not use inline styles or `<style>` tags — use Tailwind classes
- Do not use `<a>` tags for internal navigation — use `next/link`'s `<Link>`
- Do not modify `package-lock.json` directly — only via `npm install`
- Do not reintroduce Vite tooling (`vite.config.ts`, `index.html`, `vite-env.d.ts`, bun lockfiles) — the project fully migrated to Next.js; these were removed as dead artifacts

## Sensitive Files — Do Not Touch
- `.env` — contains live Google Maps API keys (`NEXT_PUBLIC_GOOGLE_MAPS_KEY`, `NEXT_PUBLIC_GOOGLE_MAPS_TRACKING_ID`); never log, expose, or commit. These are `NEXT_PUBLIC_*` so they do ship in the client bundle by design — the real safeguard is domain-restricting the key in Google Cloud Console, not keeping it out of the bundle.
- `/public/assets/artists/` — artist headshot images; replace only with confirmed new images

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
1. Create the component in `/src/page-components/`
2. Create the route wrapper at `/src/app/<route>/page.tsx` that exports `metadata` and renders it
3. Add a link in `SiteNav.tsx` if it should appear in navigation

## Testing
- Tests live in `src/test/` or alongside components as `*.test.tsx`
- Run `npm test` before committing changes
- Testing Library + Vitest globals are available — no imports needed for `describe`, `it`, `expect`
- Coverage is currently minimal (one smoke test) — don't assume `npm test` passing means a change is regression-free

## Git Workflow
- Default branch is `main`
- After making changes: run `npm run lint` and `npm test`, then commit with a clear message
- Push updates to GitHub when ready — do not push until lint and tests pass
- Deployed via Vercel, connected to GitHub repo `Meggers1982/heartland-plein-air` (auto-deploys `main`)
