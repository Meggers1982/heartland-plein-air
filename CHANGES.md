# Heartland Plein Air Festival — Site Changes

Documentation of all work completed on the site during the 2026-07-02 working
session. Covers 34 commits from `7579927` (initial Next.js migration state)
through `f6402f0`. All changes are live on `main` and deployed via Vercel.

---

## 1. Content & Branding

**Contact email** — Site-wide contact address changed from
`info@heartlandpleinair.org` to `ralstoncreativedistrict@gmail.com`
(`src/page-components/Contact.tsx`). *(ba240a7)*

**Meta (Facebook) Pixel** — Added tracking pixel (ID `1819681512327549`) to
`src/app/layout.tsx` via `next/script`, same pattern as the existing GA4 tag.
Fires on every route since it's in the root layout. Includes the standard
`<noscript>` fallback pixel. *(9d42000)*

**Homepage "About" photo** — Replaced the stock artist photo below the hero
with a real photo of an artist painting at the Niobrara River. Converted to
WebP (`public/assets/plein-air-painter-niobrara-river.webp`), old file
removed. *(4da4adf)*

**Favicons** — The site had a generic, unbranded placeholder favicon.
Generated a proper set from the Heartland logo's painter-and-sunset mark:
`public/favicon.ico` (16/32/48px), `src/app/icon.png` (512px), and
`src/app/apple-icon.png` (180px, for iOS home-screen icons). *(f0b10ca)*

**Ribbon copy** — The countdown ribbon (`CountdownRibbon.tsx`) and homepage
countdown banner (`CountdownBanner.tsx`) now read "Sept 13–19, 2026 · Douglas
& Sarpy County, **Nebraska**" (state name added). *(dcc2093)*

---

## 2. Sponsors Page (`/sponsors`)

- **Real sponsorship tiers added**, sourced from the client's "Sponsorship
  Levels-Opportunities" doc: Titanium ($5,000+) → Friend of the District
  ($100–$249), each with real benefits (catalog ad size, logo placement,
  Collector's VIP Packages). Plus a separate "Award & Event Sponsorships"
  section (Artist Awards, Collectors Gala, Advertising match, General
  Support). Data lives in `src/data/sponsorTiers.ts`. *(6cd582a)*
- **Sponsor logos**: replaced text-only placeholder cards with real logos for
  all 7 sponsors (PleinAir Magazine, Art of the West, Visit Nebraska, Wiebe
  Ralston Foundation, Ralston Archives Museum, Nebraska Arts Council/Cultural
  Endowment, Sherwood Foundation). Logos converted to transparent PNGs
  (chroma-keyed from white-background source files) so they float directly on
  the card background with no white box artifacts. Shared list lives in
  `src/data/sponsors.ts`. *(0612466, ce94d26)*
- **Sponsor links**: 7 of 7 sponsor logos now link out (`target="_blank"`) —
  Ralston Archives Museum → ralstonarchivesmuseum.com, Sherwood Foundation →
  sherwoodfoundation.org, Nebraska Arts Council → artscouncil.nebraska.gov,
  Visit Nebraska → visitnebraska.com, Art of the West → aotw.com, PleinAir
  Magazine → pleinairmagazine.com. URLs centralized in `src/data/sponsors.ts`
  as the single source of truth (previously scattered/incomplete).
  *(8deacf8)*
- **Removed the outdated "Advertise in the Catalog / form coming soon"
  section** — redundant once the dedicated Advertising page shipped with a
  real form. *(c47e71d)*
- **Sponsorship inquiry form**: replaced the "email us to sponsor" CTA with a
  real form (Name, Organization, Email, Phone, Sponsorship Level dropdown,
  Message) submitting to Formspree, redirecting to `/sponsors/success` on
  completion. *(f3fe37b, ed98836)*

## 3. Advertising Page (`/advertising`) — New Page

Built from scratch using content from the "Advertising Opportunities" doc:
Full/Half/Quarter Page ad pricing ($300/$200/$125) with exact dimensions,
file specs (PDF, 300dpi, CMYK, no crop marks), July 15th deadline, and
payment-by-check instructions (mailed to 5615 S. 77th St, Ralston, NE 68127 —
this address was missing from the original copy and added afterward).
*(233efb6)*

- **Nav placement**: reachable only via a dropdown under "About" in the main
  nav (Radix `DropdownMenu`, hover + keyboard accessible) — not a standalone
  top-level nav item, per explicit design direction. Route itself is
  top-level (`/advertising`, not `/about/advertising`). *(233efb6)*
- **Ad reservation form**: Name, Business Name, Email, Phone, Ad Size
  dropdown, Message → Formspree → `/advertising/success`. *(f3fe37b,
  ed98836)*

## 4. Open Division Page (`/open-division`)

- **Full page content built** from the "Open Category Artist Registration"
  doc: registration fee/cap, check-in logistics, canvas stamping rules,
  painting requirements (medium, size, framing), conduct guidelines,
  sales/commission terms, turn-in/pickup schedule. *(6b297d1)*
- **Registration form**: Name, City/State, Email, Phone, Primary Medium
  dropdown (Oils/Acrylics/Watercolor/Gouache/Casein/Pastel/Oil Sticks),
  Message → Formspree → `/open-division/success`, which recaps the "Quick
  Facts" cards. Quick facts data extracted to
  `src/data/openDivisionQuickFacts.ts` so the page and its success screen
  share one source. *(f6402f0)*

## 5. Homepage (`/`)

- **"Festival Highlights" cards**: fixed unequal card heights (cards now
  stretch to match the tallest in their row) and changed "25 National
  Artists" description to spell out "**Twenty-five** nationally recognized
  painters..." *(136a080)*
- **"Made Possible By / Our Sponsors" section** (`SponsorsSection.tsx`) was
  showing entirely fake placeholder sponsors (initials avatars for made-up
  companies like "First National Bank"). Replaced with the real 7 sponsor
  logos and the same external links as the Sponsors page. *(9adb23e)*
- **Schedule timeline consolidated**: previously maintained a second,
  separately hand-typed schedule array that could drift from the real
  `/schedule` page. Now derives its condensed teaser cards from
  `src/data/schedule.ts` (linked to the canonical `days[]` array by ID), so
  dates can never go out of sync between the two pages. *(dcc2093)*
- **District logos** (Ralston Hinge, Castle & Cathedral, Benson, Dundee) now
  appear on both the homepage timeline and the full `/schedule` page day
  cards, sourced from the same place. *(0eb7f64)*

## 6. Footer (site-wide)

- **Hinge Creative District logo** added next to "Presented by Ralston HINGE
  Creative District" in the copyright bar; now links to ralstonarts.org.
  *(0122740, dcc2093)*
- **Sponsor logo strip** added (all 7 sponsors), scaled for the footer
  context, sized up once for legibility after initial feedback. *(0122740,
  b12de81)*
- **Newsletter signup** (`FooterSignup`) now actually submits to Formspree
  instead of faking success. *(dcc2093)*

## 7. Contact Page (`/contact`)

- **Topic dropdown** added (Sponsorship / Advertising / Tickets / General
  Questions) so inquiries can be triaged on the receiving end. *(7210089)*
- **Form wired to Formspree** (`formspree.io/f/mojopwyp`) — previously faked
  success client-side like every other form on the site before this session.
  *(434f8f0)*

## 8. Forms & Formspree — Summary

Every form on the site now submits to a real Formspree endpoint with proper
loading/error states (previously all four were decorative — they validated
input but never sent anything anywhere):

| Form | Location | Formspree Endpoint |
|---|---|---|
| General Contact | `/contact` | `f/mojopwyp` |
| Sponsorship Inquiry | `/sponsors` | `f/xykqbjnp` |
| Ad Reservation | `/advertising` | `f/xeebpkrr` |
| Open Division Registration | `/open-division` | `f/xbdvpkdb` |
| Newsletter Signup (×2) | Homepage CTA + footer | `f/xpqgolwo` |

Three of the forms (Sponsorship, Advertising, Open Division) share a common
`InquiryForm` component (`src/components/InquiryForm.tsx`) and redirect to a
dedicated success page (`InquirySuccess.tsx`) on submission, recapping
relevant pricing/info and full festival contact details
(`FestivalContactInfo.tsx`).

**Action needed:** Formspree requires the account owner to confirm each
form's *first* submission via a link emailed to whatever address created the
form — this can't be done from code. Submit one real test through each of the
5 forms above and click the confirmation link to activate them.

## 9. Google Maps Fix

The "Painting Locations" map on the homepage was silently failing —
`RefererNotAllowedMapError` from Google (the API key's HTTP referrer
allowlist doesn't cover the domains being tested from). Fixed the app to
actually detect this failure mode (`window.gm_authFailure` wasn't being
listened for) and show the existing "map couldn't load, browse the list
below" fallback instead of a blank box. *(08de0e0)*

**Action needed (outside the codebase):**
- In Google Cloud Console, add the production domain and any preview/dev
  domains to the Maps API key's HTTP referrer allowlist, and confirm billing
  is enabled.
- **Security note:** `.env` (containing this live API key) is committed to
  git history, not gitignored. Recommend rotating the key and/or removing
  `.env` from tracking going forward.

## 10. Full-Site QA Sweep (UX / Accessibility / SEO)

Three parallel audits covering every page, each fixing real issues found
along the way (not just cosmetic):

**Bugs fixed:**
- Stale canonical URLs on About, Artists, and Schedule pages still pointed at
  the pre-migration `ralston-plein-air.lovable.app` domain instead of
  `heartlandpleinair.org`.
- FAQ page had a second, drifting copy of its Q&A content hardcoded in the
  component instead of using `src/data/faq.ts` — consolidated.
- JSON-LD structured data (`src/lib/schema.ts`) had a wrong phone number and
  wrong street address, and referenced a nonexistent `og-image.jpg` — these
  were invisible bugs since the schema was defined but never actually
  rendered anywhere; became real once the QA sweep wired it into every page,
  caught and fixed immediately after. *(75a16b9)*
- Root layout's Open Graph/Twitter metadata had **no preview image at all** —
  shared links showed no image. Added the hero photo. *(75a16b9)*

**Accessibility:**
- Site-wide color contrast fix: the primary brand orange and the error-red
  both measured below WCAG AA (4.5:1) against their backgrounds — darkened
  both slightly in `globals.css` while staying visually on-brand.
- Nav links were calling `preventDefault()` unconditionally, breaking
  cmd/ctrl-click "open in new tab" — replaced with proper `next/link`.
- Invisible keyboard focus ring on the newsletter email input.
- Missing chevron icons on native `<select>` dropdowns (sponsorship level, ad
  size, Contact topic) — `appearance-none` had removed the native arrow with
  nothing replacing it.
- Form error messages now linked to their fields via `aria-describedby` for
  screen readers.
- Heading hierarchy fixes (a skipped H2 on Open Division, a wrongly-nested H2
  inside `FestivalContactInfo`, `<h2>`→`<h3>` on repeated Artists cards).
- Missing/generic alt text fixed across artist headshots and gallery
  paintings.

**SEO:**
- Created `src/app/sitemap.ts` (auto-generates `/sitemap.xml` for all real
  content routes; excludes the three `/success` confirmation pages
  intentionally, since they have no independent content and shouldn't show
  up in search results).
- Added `Sitemap:` line to `public/robots.txt`.

*(Sweep commits: 556b4fc, e312b1d, 0998717, plus follow-up fixes in 75a16b9)*

## 11. Jumplink & Navigation Polish

- Added `scroll-mt-32` to the newsletter section (`#newsletter`) so CTA
  links ("Subscribe for Updates" on the countdown banner, "Notify me..." on
  the online-sales schedule entry) land with the heading fully visible below
  the fixed nav, instead of being partially clipped. *(dcc2093)*

---

## 2026-07-12 — Repo Cleanup (post-migration artifacts)

- **`.env` stopped being tracked** and added to `.gitignore` — closes half of
  the §9 security note (still present locally for dev). The key itself is
  `NEXT_PUBLIC_*` so it ships in the client bundle by design either way; git
  history was deliberately *not* rewritten to purge old commits containing
  it, since that wouldn't add real security and would require a disruptive
  force-push to `main`. The actual remaining fix is the Cloud Console
  referrer allowlist (§9, follow-up #2).
- **Removed dead Vite/Lovable-era files** left over from the pre-migration
  scaffold, now confirmed unused by `next build`: `index.html`,
  `vite.config.ts`, `src/vite-env.d.ts`, `tsconfig.app.json`,
  `tsconfig.node.json`.
- **Removed stale bun lockfiles** (`bun.lock`, `bun.lockb`) — last modified
  before the Next.js migration; `package-lock.json`/npm has been the real
  package manager since. `package.json`'s `name` field also fixed from the
  leftover `vite_react_shadcn_ts` to `heartland-plein-air`.
- **`CLAUDE.md` rewritten** — previously still described the pre-migration
  Vite/React Router stack; now matches the actual Next.js App Router
  structure. Also added explicit rules: always commit + push after changes,
  and log updates here in `CHANGES.md` rather than the README (README is
  separately flagged as stale boilerplate, not yet rewritten).
- Verified `next build` (all 22 routes) and `vitest` both pass after the
  cleanup. *(bef6ae7)*

---

## 2026-07-12 — Renamed "Collector's Soirée" event

- **Every mention of "Collector's Soirée" site-wide renamed to "Collectors
  Preview Reception and Awards Presentation"** (apostrophe dropped per the
  new name). Updated: `src/data/schedule.ts` (day title, narrative, and
  event name for Sep 18, plus the homepage teaser card), `src/data/faq.ts`
  (9 occurrences across the Buying the Art and General Info sections,
  including the question title "How do I get tickets to the Collectors
  Preview Reception and Awards Presentation?"), `src/data/locations.ts`
  (the Granary's event list), `src/page-components/Index.tsx` (homepage
  FAQ), `src/page-components/About.tsx`, and `src/lib/schema.ts`
  (site-wide JSON-LD event description).
- Verified `next build` and `vitest` both pass after the rename.

---

## Known follow-ups (not code — need your action)

1. **Activate Formspree forms** — submit one test through each of the 5 forms
   listed in §8 and confirm via the email Formspree sends.
2. **Google Maps referrer allowlist** — add production/preview domains in
   Google Cloud Console (see §9), and confirm the key is restricted to
   `heartlandpleinair.org/*`. This is the actual mitigation for the exposed
   key — see the 2026-07-12 entry above for why rewriting git history
   wouldn't help.
3. **Rewrite `README.md`** — still the default Lovable scaffold boilerplate
   (mentions Vite, the Lovable platform, a placeholder project URL). Not a
   changelog target; CHANGES.md (this file) is.
4. Two lower-priority items flagged during the QA sweep but intentionally
   left alone (judgment calls, not bugs):
   - `Contact.tsx` duplicates `FestivalContactInfo.tsx`'s JSX instead of
     reusing the component — the two contexts (wide page section vs. narrow
     card) have different heading sizes, so consolidating risked a visual
     regression. Worth revisiting for maintainability.
   - Artists/Gallery pages use a lighter page-header style than the other 5
     interior pages (no dark `bg-foreground` band) — flagged as a possible
     site-wide inconsistency, but plausibly intentional for image-heavy
     pages, so left as a design decision rather than unilaterally changed.
