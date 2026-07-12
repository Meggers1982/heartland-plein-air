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

---

## 2026-07-12 — Open Division Form: Street Address / City / State / Zip

- **Added separate Street Address, City, State, and Zip Code fields** to the
  Open Division registration form (`/open-division`). Previously the form
  only had a single "City, State" free-text field, which was itself the
  shared `InquiryForm` component's generic "Organization" field relabeled —
  not a real structured address.
- `InquiryForm` (`src/components/InquiryForm.tsx`) gained a new optional
  `addressFields` prop. When enabled, it swaps the generic
  Organization/Business Name field for the four address fields (each
  required except none are optional; zip is validated against a 5-digit or
  ZIP+4 pattern) and submits `street`/`city`/`state`/`zip` to Formspree
  instead of `organization`. Sponsors and Advertising, which still use the
  plain Organization field, are unaffected — verified both still render
  correctly.
- `OpenDivision.tsx` now passes `addressFields` instead of the old
  `organizationLabel="City, State"` / `organizationPlaceholder="Omaha, NE"`
  hack.
- Verified in-browser: all four fields render in the expected layout (Street
  Address full-width, City/State/Zip as a 3-column row), and client-side
  validation correctly blocks submission with per-field error messages when
  left empty. `next build` and `vitest` both pass.

---

## 2026-07-12 — Open Division Registration Fee / PayPal Copy

- **Reworded the intro text above the Open Division registration form**
  (`src/page-components/OpenDivision.tsx`) to lead with the call to action,
  then the fee/cap, then a payment instruction: "Fill out the form below to
  reserve your spot. Registration is $30 and limited to 30 artists, first
  come, first served. Please click the PayPal button after submitting the
  form to pay your fee. Any registration without payment will not be
  accepted."
- **Matching update on the success page**
  (`src/page-components/OpenDivisionSuccess.tsx`): the confirmation intro
  now repeats the fee/payment requirement instead of the old vague "we'll
  follow up soon with payment instructions."
- **No PayPal button exists in the codebase yet** — this is copy only. Both
  pages currently reference a PayPal button that isn't there. User is aware
  and will supply PayPal details in a follow-up to actually wire it in.
- Verified `next build` and `vitest` both pass.

---

## 2026-07-12 — About Page: Organizers & Funders Text

- **`src/page-components/About.tsx`**, "About the Organizers" section:
  - First paragraph now ends with "...owner of Debra Joy Groesser Fine Art,
    and the Ralston HINGE Creative District Board. The board consists of
    local business and civic leaders and volunteers." (previously ended
    right after the Debra Joy Groesser Fine Art link).
  - Second paragraph replaced entirely: was "It's also grant-supported:
    Ralston was selected as one of just 13 recipients of a Nebraska Arts
    Council Creative District Development Grant — funding designed for
    projects that attract visitors, create jobs, and strengthen Nebraska
    communities. The festival is also supported by The Sherwood Foundation
    and the Ralston Archives Museum." — now reads "In addition to the
    Nebraska Arts Council, the festival is supported by funding from the
    Nebraska Cultural Endowment, The Wiebe Ralston Foundation, Visit
    Nebraska, and the Sherwood Foundation." Note this drops the "13
    recipients" grant-program detail and the Ralston Archives Museum
    mention, per the user's exact replacement text — flagged here in case
    that was unintentional.
- Verified `next build` and `vitest` both pass.

---

## 2026-07-12 — Open Division Registration Copy Split Into Two Paragraphs

- **`src/page-components/OpenDivision.tsx`**: the "Ready to Register?" intro
  (added earlier today, see the Registration Fee / PayPal Copy entry above)
  is now two separate `<p>` tags instead of one: the reserve-your-spot /
  fee-and-cap sentence, then the PayPal payment-instruction sentence.
  Verified in-browser — renders as two visually distinct paragraphs.

---

## 2026-07-12 — Advertising Deadline Moved to July 17 + Auto-Close

- **Deadline text updated** in `src/page-components/Advertising.tsx` from
  "July 15th" to "July 17, 2026."
- **New site-wide-style deadline banner** on `/advertising` only, matching
  the pattern the existing `CountdownRibbon` uses: `SiteNav.tsx` now
  conditionally renders a new `AdvertisingDeadlineBanner` component
  (`src/components/AdvertisingDeadlineBanner.tsx`) when
  `pathname === "/advertising"`, stacked inside the same fixed nav block so
  it scrolls correctly with the rest of the header. Reads "Advertising
  deadline: July 17, 2026 — reserve your ad space now" until the deadline,
  then switches text/color to "Advertising reservations are now closed."
  (A banner placed as a plain sibling of `<SiteNav />` in the page itself
  would've been visually covered by the nav, since `<nav>` is
  `position: fixed` — hence wiring it through SiteNav like the ribbon.)
- **Form auto-disables after the deadline** — answers the "can this be done
  programmatically" question: yes. Added `src/lib/adDeadline.ts` exporting
  a single `AD_DEADLINE` constant (`2026-07-18T00:00:00-05:00`, i.e. end of
  day July 17 in Central time, explicitly offset so the cutoff doesn't
  depend on a visitor's local timezone), imported by both the banner and
  `Advertising.tsx`. Past the deadline, `Advertising.tsx` replaces the
  `InquiryForm` with a "reservations are closed" message and an email
  fallback, instead of rendering the form.
- Verified in-browser by temporarily setting `AD_DEADLINE` to a past date:
  banner and form both correctly switch to the closed state, then reverted.
  `next build` and `vitest` both pass.

---

## 2026-07-12 — Homepage Hero: Mobile Button Fix + Subheading Legibility

- **Bug fix (mobile Safari):** the "Meet the Artists" button was getting
  covered by Safari's bottom toolbar on iOS, per a user-supplied screenshot.
  Root cause: the hero `<section>` used `min-h-screen` (`100vh`) with
  `items-end`, bottom-anchoring the button row — but iOS Safari's `100vh` is
  sized for the *collapsed*-chrome viewport, so when the toolbar is expanded
  (e.g. on initial page load) it overlaps that bottom strip.
  `src/page-components/Index.tsx`: changed to `min-h-[100dvh]` (dynamic
  viewport height), which tracks the actually-visible viewport as the
  browser chrome shows/hides, natively, without JS. Only reproducible/
  verifiable on a real iOS Safari device — desktop Chrome doesn't have the
  same dynamic-toolbar behavior, so this couldn't be re-verified locally
  beyond confirming the layout still renders correctly.
- **Subheading legibility:** the hero intro paragraph ("Art, out in the
  open...") used `font-light` at `text-secondary/85`, which was hard to read
  against the busy textured painting background — and was the only hero-
  style intro paragraph on the site still using `font-light` (Advertising,
  Contact, and Open Division's matching intro paragraphs are all default
  weight). Changed to `font-medium` at `text-secondary/95` for stronger
  contrast. Verified in-browser — visibly bolder and higher-contrast.
- `next build` and `vitest` both pass.

---

## 2026-07-12 — Countdown Ribbon: Mobile Context Label

- **Gap flagged during review:** on mobile (`<640px`), the sticky countdown
  ribbon shown on every inner page (Schedule, Sponsors, FAQ, etc. — every
  page except the homepage) rendered as just `62 DAYS : 09 HRS : 27 MIN :
  19 SEC` with no indication of what it was counting down to. Both the
  "Brushes Out In" label and the date/location line are hidden below the
  `sm`/`md` breakpoints, so a visitor landing on an inner page via a shared
  link (not the homepage, which has full hero context) saw a bare,
  unexplained timer.
- `src/components/CountdownRibbon.tsx`: added a compact "Festival in" label
  visible only below `sm` (replacing the fully-hidden "Brushes Out In" on
  mobile — that longer label stays sm+ only). Verified in-browser at a
  375px width: fits with room to spare, no wrapping. Left the date/location
  line hidden on mobile — lower priority than the "what is this" label, and
  space is tighter.
- `next build` and `vitest` both pass.

---

## 2026-07-12 — About Page: Small Copy/Link Fixes

- `src/page-components/About.tsx`: "What Is Plein Air" H2 now "What Is Plein
  Air?" (missing question mark).
- Same page, "About the Organizers" section: "supported by funding" now
  links to `/sponsors` (via `next/link`, matching site convention of no
  `<a>` tags for internal navigation).
- `next build` and `vitest` both pass.

---

## 2026-07-12 — Mobile UX Consistency Audit + Fixes

Code-level audit of every page's hero/header, prompted by a request to QA
mobile UX (browser tooling in this session couldn't force a true mobile
viewport, so this was done by reading the actual mobile CSS directly —
Tailwind's unprefixed classes are the mobile styles). Findings and fixes:

- **Confirmed by design, left alone:** two header systems exist — dark
  `bg-foreground` band pages (About, Advertising, Contact, Open Division,
  Schedule, Sponsors, all success pages) at `pt-44 pb-16`, vs. light-
  background listing pages (Artists, Gallery, Blog) at `pt-36` + inner
  `py-16`. This split was already reviewed and deliberately kept in an
  earlier QA sweep (see §10 above) — image-heavy listing pages get the
  lighter treatment. Not touched.
- **Fixed: hero eyebrow letter-spacing drift.** Every page's hero-position
  eyebrow (the small label directly above the H1) uses `tracking-[0.25em]`
  — including FAQ, which isn't even part of the dark-band group — except
  Artists, Gallery, and Blog, which were using the in-page-section value
  (`tracking-[0.2em]`) for their hero eyebrow instead. Normalized all three
  to `[0.25em]` to match every other page's hero. Their other, non-hero
  section eyebrows correctly stay at `[0.2em]`, matching the site-wide
  convention for body-section labels.
- **Fixed: FAQ intro paragraph still `font-light`.** Same legibility pattern
  fixed on the homepage hero in an earlier session — FAQ was the last page
  still using it. Removed, now matches every other intro paragraph's
  default weight.
- **Fixed: 404 page was completely unbranded.** `src/app/not-found.tsx` had
  no `SiteNav`/`SiteFooter`, no `font-display` heading font, no logo — a
  dead end with only a plain text link back home. Rebuilt using the same
  header pattern as every other content page (`SiteNav`, dark-band header
  with eyebrow/H1/intro, styled CTA button back to `/`, `SiteFooter`).
  Verified in-browser via a nonexistent URL. Also deleted
  `src/page-components/NotFound.tsx`, a pre-migration duplicate that was
  never imported anywhere (confirmed via grep) — the live 404 is
  `src/app/not-found.tsx` per Next.js's App Router convention.
- **Fixed: Open Division's "Ready to Register?" CTA intro didn't match its
  siblings.** Advertising's "Ready to reserve your ad space?" and Sponsors'
  "Ready to sponsor the festival?" both use a plain bold `<p>` line with no
  icon or heading. Open Division's equivalent intro had an icon circle plus
  a `font-display text-3xl` `<h2>`, meaningfully more visual weight than
  the other two for the same kind of card. Simplified to match — dropped
  the icon (and its now-unused `Users` import) and the `<h2>`, now a plain
  bold line like the other two. User confirmed this direction over
  upgrading the other two to match Open Division instead.
- `next build` and `vitest` both pass.

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
4. **Add the actual PayPal button** to `/open-division` and
   `/open-division/success` — the copy on both pages now references it
   (see the 2026-07-12 Registration Fee / PayPal Copy entry), but no button
   exists yet. Needs a PayPal.me link or hosted button ID from the user.
5. Two lower-priority items flagged during the QA sweep but intentionally
   left alone (judgment calls, not bugs):
   - `Contact.tsx` duplicates `FestivalContactInfo.tsx`'s JSX instead of
     reusing the component — the two contexts (wide page section vs. narrow
     card) have different heading sizes, so consolidating risked a visual
     regression. Worth revisiting for maintainability.
   - Artists/Gallery pages use a lighter page-header style than the other 5
     interior pages (no dark `bg-foreground` band) — flagged as a possible
     site-wide inconsistency, but plausibly intentional for image-heavy
     pages, so left as a design decision rather than unilaterally changed.
