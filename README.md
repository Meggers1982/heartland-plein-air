# Heartland Plein Air Festival

Website for the **Heartland Plein Air Arts Festival** — September 13–19, 2026, across Douglas and Sarpy County, Nebraska. Twenty-five nationally recognized artists paint the Omaha metro in public for a week, closing with an exhibition and auction.

**Live:** [heartlandpleinair.org](https://heartlandpleinair.org) · **Studio:** [heartlandpleinair.org/studio](https://heartlandpleinair.org/studio)

Presented by the Ralston HINGE Creative District, a 501(c)(3) nonprofit.

---

## Tech stack

| | |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript — `strict: false` by design |
| Styling | Tailwind CSS 3 + shadcn/ui (Radix primitives) |
| CMS | Sanity v4, Studio embedded at `/studio` |
| Forms | React Hook Form + Zod, delivered by Formspree |
| Payments | PayPal Smart Buttons |
| Maps | Google Maps JavaScript API |
| Testing | Vitest + Testing Library |
| Hosting | Vercel, auto-deploying `main` |

React is pinned at **18.3.1**, not 19 — a few workarounds in the codebase exist specifically because React 19 features aren't available.

---

## Content lives in Sanity, not in this repo

Nearly all site copy — artists, schedule, FAQ, sponsors, locations, ad sizes, homepage highlights, and even form field labels — is edited in **Sanity Studio at `/studio`**, not through a pull request. There is no `src/data/` directory; it was fully migrated and deleted.

- **Project:** `e2m4q82h` · **Dataset:** `production` (public read)
- **Schemas:** `src/sanity/schemaTypes/` · **Queries:** `src/sanity/queries/`
- **Preview:** the **Presentation** tab gives a live side-by-side preview with click-to-edit, including unpublished drafts
- **Freshness:** ISR with `revalidate: 3600`, plus a webhook at `/api/revalidate` that Sanity calls on publish — changes usually appear within seconds

Adding a *page* (a new route) is still a code change. Adding *content* is not.

---

## Getting started

**Prerequisites:** npm and Node.js **≥20.19, or ≥22.12**. That odd range is Sanity's, and it's stricter than Next's (`^18.18 || ^19.8 || >=20`) — note the gap: Node 22.0–22.11 will fail Sanity's engine check. The lockfile is `package-lock.json`; there is no bun/yarn/pnpm setup.

```sh
git clone https://github.com/Meggers1982/heartland-plein-air.git
cd heartland-plein-air
npm install
```

### Environment variables

Create **`.env.local`** in the repo root (gitignored). **The build fails without the first three** — it compiles fine, then dies at "Collecting page data", which looks like a code bug but isn't.

```sh
# Required
NEXT_PUBLIC_SANITY_PROJECT_ID=e2m4q82h
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=      # Viewer token — sanity.io/manage → API → Tokens

# Optional — the app runs without these, the feature degrades
NEXT_PUBLIC_GOOGLE_MAPS_KEY=
NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID=
NEXT_PUBLIC_GOOGLE_MAPS_TRACKING_ID=
NEXT_PUBLIC_PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_ID=            # server-only
PAYPAL_CLIENT_SECRET=        # server-only — never prefix with NEXT_PUBLIC_
SANITY_REVALIDATE_SECRET=    # only to test the publish webhook locally
```

| Missing | Effect |
|---|---|
| `NEXT_PUBLIC_GOOGLE_MAPS_*` | Locations map shows its "couldn't load" fallback |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | PayPal buttons don't render |
| `PAYPAL_CLIENT_ID` / `_SECRET` | Payment verification logs a failure; the payment flow still works |

Copy the optional values from Vercel → project Settings → Environment Variables.

```sh
npm run dev     # http://localhost:8080  (Studio at /studio)
```

---

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on **port 8080** (not 3000) |
| `npm run build` | Production build. Runs `prebuild` first |
| `npm start` | Serve the production build locally |
| `npm run lint` | ESLint via `next lint` |
| `npm test` | Vitest, single run |
| `npm run test:watch` | Vitest in watch mode |
| `npm run stamp:legal` | Refresh the legal pages' "last updated" dates from git |

---

## Project structure

```
src/
├── app/                    Routes. Public pages live under (site)/,
│                           which supplies the shared footer.
│   ├── (site)/<route>/page.tsx   Thin wrapper: exports `metadata`,
│   │                             fetches data, renders a page-component
│   ├── api/                revalidate · verify-paypal-payment · draft-mode
│   ├── studio/             Embedded Sanity Studio
│   ├── layout.tsx          Root layout, analytics tags
│   ├── not-found.tsx       404
│   └── sitemap.ts
├── page-components/        The real page implementations. Named this way
│                           (not `pages/`) to avoid Pages Router pickup.
├── components/             Shared components + ui/ (shadcn — don't edit)
├── sanity/                 schemaTypes/ · queries/ · lib/ · structure.ts
│                           presentation/resolve.ts (preview locations)
├── lib/                    utils · schema (JSON-LD) · ics · legalDates
├── hooks/
└── test/
```

**Route files fetch; page-components render.** A `page.tsx` calls `src/sanity/queries/*` and passes data down as props. Page-components (usually `'use client'`) never fetch.

---

## How the moving parts work

**Forms** post to **Formspree** (6 endpoints) and arrive as email at the festival office. Field labels, placeholders, character limits and required-ness come from `formConfig` documents in Sanity, so editors can change form copy — and real validation, since the Zod schema is built from that config at runtime.

**Payments** run PayPal Smart Buttons entirely client-side. Because a captured amount is whatever the browser reported, `onApprove` fires a follow-up POST to `/api/verify-paypal-payment`, which re-checks the amount against PayPal's own records server-side. It can only *detect* a mismatch and log it — the capture has already happened — so treat a mismatch in the Vercel logs as a prompt for manual follow-up.

**Legal pages** (`/privacy`, `/terms`) are the one deliberate exception to "content lives in Sanity". Their "last updated" dates are derived from git by `scripts/stamp-legal-updated.mjs` on every build, so editing the page moves its own date — `new Date()` is deliberately *not* used, since it would restamp both pages on every unrelated deploy and claim a revision that never happened.

---

## Deployment

Vercel, connected to this repo. Pushing to `main` deploys to production in roughly two minutes. Environment variables are set in the Vercel dashboard — `.env.local` is local only.

---

## Gotchas

Things that have already cost someone a debugging session:

- **`orderRank` must be a LexoRank string** (`0|hzzzzz:`), never a plain counter. `@sanity/orderable-document-list` parses these, and an invalid value throws `Unknown bucket:` while building the desk structure — which takes down the *entire* Studio, not one list. Also note `order(orderRank)` compares as a **string**, so counters like `a10` sort between `a1` and `a2`.
- **Call `stegaClean()` on any Sanity value used as logic** — comparisons, filters, map keys. In preview mode strings carry invisible characters, so `value === "public"` silently fails. See `iconMap.ts`, `Gallery.tsx`, `Schedule.tsx`.
- **`not-found.tsx` cannot export `metadata`.** The 404's title is set client-side by `SetDocumentTitle.tsx`, which re-asserts on `<head>` mutation because Next streams its own title in afterwards. On React 19 this file can be deleted in favour of a rendered `<title>`.
- **`scripts/migrate-to-sanity.mjs` is a historical record, not a sync tool.** Re-running overwrites Studio edits, and its `sponsors` section no longer works — the local logo files it uploads were deleted once the images moved into Sanity.
- **The Google Maps key is domain-restricted.** The map won't render on `localhost` until `http://localhost:8080/*` is added to the key's allowed referrers in Google Cloud Console.
- **Don't edit `src/components/ui/`** — shadcn primitives, managed by the CLI.

---

## Further reading

- **[`CLAUDE.md`](./CLAUDE.md)** — conventions, architecture, and the content-editing guide
- **[`CHANGES.md`](./CHANGES.md)** — running changelog and open follow-ups needing a human
