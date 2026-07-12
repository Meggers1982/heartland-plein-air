# Heartland Plein Air Festival

Website for the Heartland Plein Air Arts Festival — September 13–19, 2026, Douglas & Sarpy County, Nebraska. Deployed at [heartlandpleinair.org](https://heartlandpleinair.org).

## Tech stack

- Next.js 15 (App Router)
- TypeScript (loose mode)
- Tailwind CSS
- shadcn/ui (Radix UI primitives)
- React Hook Form + Zod
- TanStack React Query
- Vitest + Testing Library

## Getting started

Requires Node.js and npm.

```sh
git clone https://github.com/Meggers1982/heartland-plein-air.git
cd heartland-plein-air
npm install
npm run dev
```

The dev server runs at `http://localhost:8080`.

Copy `.env.example`-style values into a local `.env` file (see `CLAUDE.md` for which variables are required — it's gitignored and not committed).

## Commands

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm start` — run the production build locally
- `npm run lint` — run ESLint
- `npm test` — run tests once
- `npm run test:watch` — run tests in watch mode

## Project structure and conventions

See [`CLAUDE.md`](./CLAUDE.md) for the full project structure, coding conventions, and content-editing guide (how to add artists, FAQ items, schedule entries, etc.).

## Deployment

Deployed via Vercel, connected to this repo's `main` branch (auto-deploys on push). See [`CHANGES.md`](./CHANGES.md) for a running log of notable changes and open follow-up items.
