# Heartland Plein Air Arts Festival — Agent Guide

## What This Project Is
A festival website for the Heartland Plein Air Arts Festival (September 13–19, 2026) in Douglas and Sarpy County. Features 25 nationally recognized artists, an interactive schedule, Google Maps venue integration, artist bios, a gallery lightbox, and newsletter signup. Content (artists, gallery, schedule, locations, FAQ, sponsors, ad sizes, open division facts) lives in Sanity CMS, edited through an embedded Studio at `/studio` — see "Sanity CMS" below. Two other backend surfaces exist: `src/app/api/revalidate/route.ts` (Sanity webhook, revalidates ISR cache on publish) and `src/app/api/verify-paypal-payment/route.ts`, a single serverless route that independently re-checks captured PayPal payment amounts against PayPal's own records (see "PayPal Payment Verification" below). Do not add further backend/database functionality beyond these three.

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
  ├── page-components/    → Actual page implementations (About, Artists, Contact, Faq,
  │                         Gallery, Index, NotFound, OpenDivision, Schedule, Sponsors, etc.)
  │                         — named this way (not `pages/`) specifically to avoid Next.js Pages
  │                         Router auto-pickup
  ├── components/         → Custom components + /ui (shadcn primitives)
  ├── sanity/              → Sanity source of truth: schemaTypes/ (document + object schemas),
  │                         queries/ (one module per content area, e.g. queries/artists.ts),
  │                         lib/ (image.ts urlFor() helper, iconMap.ts, portableText.ts),
  │                         client.ts, env.ts, structure.ts (Studio desk structure)
  ├── lib/                 → Utilities: utils.ts (cn helper), ics.ts (calendar export),
  │                         schema.tsx (structured data), richText.tsx (renderRichText — only
  │                         for the handful of plain strings that still use inline
  │                         [label](url) links and were never migrated to Sanity Portable
  │                         Text: OpenDivision.tsx's static requirement lists and
  │                         HomepageHighlight.description; don't assume it's dead)
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
- All content lives in Sanity — editors change it in Studio at `/studio`, not via a code PR. See "Sanity CMS" below
- Route `page.tsx` files fetch via `src/sanity/queries/*.ts` and pass data down as props to the (usually `'use client'`) page-component — page-components don't fetch directly
- Do not hardcode content inside components — it should come from a Sanity query, passed in as a prop
- `src/data/` no longer exists — it held the pre-migration static TypeScript files; every one of the 9 files was fully replaced by a Sanity document type and deleted

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
- Do not add a backend, database, or server framework beyond Sanity + the two serverless routes already listed under "What This Project Is" — content changes go through Sanity Studio, not new app infrastructure
- Do not install new packages without confirming first
- Do not use inline styles or `<style>` tags — use Tailwind classes
- Do not use `<a>` tags for internal navigation — use `next/link`'s `<Link>`
- Do not modify `package-lock.json` directly — only via `npm install`
- Do not reintroduce Vite tooling (`vite.config.ts`, `index.html`, `vite-env.d.ts`, bun lockfiles) — the project fully migrated to Next.js; these were removed as dead artifacts

## PayPal Payment Verification
- `PayPalButton.tsx` runs the whole order lifecycle (create → approve → capture) client-side, per PayPal's standard no-backend Smart Buttons pattern — but that means a captured amount is whatever the browser reported, not something the site can trust on its own.
- After `actions.order.capture()` succeeds, `onApprove` fires a fire-and-forget POST to `/api/verify-paypal-payment` with the order ID and the amount the site expected. That route (`src/app/api/verify-paypal-payment/route.ts`, logic in `src/lib/paypalVerify.ts`) authenticates to PayPal's REST API server-side and re-fetches the order to compare PayPal's own captured amount against what was expected.
- This can only detect and log a mismatch (via `console.error`, visible in Vercel function logs) — payment has already been captured by the time it runs, so it cannot block or reverse anything. Treat a mismatch log as a signal for manual follow-up (refund/contact), not an automated safeguard.
- Requires two **server-only** env vars (not `NEXT_PUBLIC_*`, so they never reach the client bundle): `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET`, from the same Live PayPal app as `NEXT_PUBLIC_PAYPAL_CLIENT_ID`. Without them the verification call fails (logged, not thrown to the user) — the visitor-facing payment flow is unaffected either way.

## Sensitive Files — Do Not Touch
- `.env` — contains live Google Maps API keys (`NEXT_PUBLIC_GOOGLE_MAPS_KEY`, `NEXT_PUBLIC_GOOGLE_MAPS_TRACKING_ID`); never log, expose, or commit. These are `NEXT_PUBLIC_*` so they do ship in the client bundle by design — the real safeguard is domain-restricting the key in Google Cloud Console, not keeping it out of the bundle.
- `PAYPAL_CLIENT_SECRET` (server-only, no `NEXT_PUBLIC_` prefix) — used by `/api/verify-paypal-payment` to authenticate to PayPal's REST API. Unlike the Maps keys, this one must never ship to the client; if it's ever accidentally renamed with a `NEXT_PUBLIC_` prefix, rotate it immediately in the PayPal Developer Dashboard.
- `SANITY_WRITE_TOKEN` (in `.env.local`, gitignored) — an Editor-role Sanity API token that can rewrite any content in the `production` dataset. Nothing in the app reads it; it exists so mutations can be scripted. Never commit it, never print it to a terminal, and revoke it at sanity.io/manage if it is ever pasted anywhere shared
- `/public/assets/artists/` — artist headshot images; replace only with confirmed new images

## Sanity CMS
- Project ID `e2m4q82h`, dataset `production`. Env vars in `.env.local` (gitignored) and in Vercel's Production/Preview/Development env vars
- Studio is embedded in this app at `/studio` (not a separate deploy) — `sanity.config.ts`/`sanity.cli.ts` at repo root, schema in `src/sanity/schemaTypes/`
- Editors (Ralston HINGE Creative District staff/volunteers) manage their own Studio access at sanity.io/manage — that's an account/role question, not something this codebase controls
- Content types: `openDivisionQuickFact`, `sponsorTier`, `sponsor`, `scheduleDay`, `homepageHighlight`, `festivalLocation`, `adSize`, `faqCategory`, `faqItem`, `artist` (folds in what used to be `gallery.ts`'s paintings). Most support drag-to-reorder in Studio via `@sanity/orderable-document-list` (see `ORDERABLE_TYPES` in `src/sanity/structure.ts`). Alongside those are page-level singletons (`openDivisionPage`, `ticketsPage`, `siteChrome`, …) and reusable **objects** in `schemaTypes/objects/` that only exist inside a parent document: `scheduleEvent`, `paintoutSpot`, `openDivisionSection`, `locationEvent`, `artistPainting`
- **Prefer a repeatable array of objects over another run of named fields.** `openDivisionPage` grew by bolting on `xEyebrow`/`xTitle`/`xBody` trios, so every new section the client wanted cost a schema change and a deploy. `openDivisionPage.festivalWeek` (an array of `openDivisionSection`) is the pattern to copy: the client adds, reorders and removes whole sections in Studio. Reach for it whenever content is "a list of similar blocks"
- Rich text (FAQ answers, `scheduleDay.narrative`) is Portable Text, rendered with `src/components/RichText.tsx`. A handful of other fields (e.g. `homepageHighlight.description`) are still plain strings with inline `[label](url)` links, rendered via `renderRichText()` in `src/lib/richText.tsx` — that file is not dead code
- Icon fields (e.g. `sponsorTier.icon`) store a Lucide icon name as a string; resolve it to a component via `ICON_MAP` in `src/sanity/lib/iconMap.ts`
- Images are Sanity assets, rendered via `urlFor()` from `src/sanity/lib/image.ts` + a plain `<img>` (not `next/image` — several grids, e.g. Sponsors.tsx's tier grids, depend on each image's natural intrinsic aspect ratio, which `next/image`'s `fill` sizing model doesn't preserve the same way)
- Freshness model: ISR with `revalidate: 3600` + tags (see any `src/sanity/queries/*.ts` file), backed by a webhook at `src/app/api/revalidate/route.ts` that Sanity calls on publish so changes usually show up within seconds, not an hour
- **Writing to the dataset needs an Editor API token, not a CLI login.** `SANITY_API_READ_TOKEN` in `.env.local` is read-only. `npx sanity login` does *not* grant write here: it has been tried with three separate Google accounts including `upsidemeagan1982@gmail.com`, which sanity.io/manage lists as the project's sole **Administrator**, and that session token still returns `insufficientPermissionsError` on update (and 401 on project metadata) while reading the dataset fine. Create an Editor token at sanity.io/manage → project `e2m4q82h` → API → Tokens and put it in `.env.local` as `SANITY_WRITE_TOKEN`. Always send mutations with `?dryRun=true` first — a permissions failure then changes nothing
- Two gotchas that hide content with no error anywhere:
  - **A `sponsor` with no `tier` is not broken.** Untiered sponsors are grant funders / media partners and render in the "Presented with Support From" grid (`getFunders()` selects `!defined(tier)`). What hides one completely is *both* no tier **and** `hideFromPartnersGrid: true` — two independently harmless settings that together leave it nowhere to render
  - **`{fee}` and `{capacity}` only expand where the component calls `fill()`.** On the Open Division page that helper substitutes the live registration fee and capacity, so copy can never contradict what PayPal charges. Any new field rendering editable copy on that page must be wrapped in `fill()`, or editors will hardcode the numbers and they will silently drift out of sync
  - **A Sanity string used as an `href` must go through `stegaClean()`.** Visual Editing embeds invisible metadata characters in returned strings. They are harmless in visible copy but turn a valid URL or path into a 404. See the `ctaHref` handling in `src/page-components/Schedule.tsx`
- One growing migration script, `scripts/migrate-to-sanity.mjs`, was used to seed all the content from the original `src/data/*.ts` files (now deleted) — run with `set -a && source .env.local && set +a && node scripts/migrate-to-sanity.mjs [section]`. It's idempotent (deterministic `_id`s + `createOrReplace`) but re-running it after Studio edits will overwrite those edits — treat it as historical record, not a sync tool
- To add a genuinely new document type: define the schema in `src/sanity/schemaTypes/`, register it in `schemaTypes/index.ts`, add a query in `src/sanity/queries/`, and wire it into the relevant `page.tsx` + page-component the same way the existing types are wired

## Adding a New Page
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
- Always commit and push to GitHub after making changes — do not leave finished work sitting uncommitted or unpushed. Only hold off if lint or tests are failing.
- Deployed via Vercel, connected to GitHub repo `Meggers1982/heartland-plein-air` (auto-deploys `main`)

## Logging Updates
- `CHANGES.md` is this repo's changelog — log notable updates there (what changed, which file, and the commit hash), following the existing numbered-section format
- Only use the README for updates if they're about setup/usage/tech stack itself (README is currently stale Lovable boilerplate and needs a rewrite — see it as a target for cleanup, not a changelog)
- Don't skip logging just because a change feels small — CHANGES.md's "Known follow-ups" section is also where open action items belong (e.g. things a human still needs to do, like rotating a key or checking a Cloud Console setting)
