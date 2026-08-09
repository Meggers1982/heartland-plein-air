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

## 2026-07-12 — README Rewrite, Contact/FestivalContactInfo Dedup, Sponsors Page Updates

Working through the "Known follow-ups" backlog:

- **Rewrote `README.md`** — was still the default Lovable scaffold
  (mentioned Vite, the Lovable platform, a placeholder project URL). Now
  documents the actual Next.js stack, real setup steps, and points to
  `CLAUDE.md` (conventions/content editing) and `CHANGES.md` (changelog)
  instead of duplicating them.
- **Consolidated `Contact.tsx`'s duplicated contact-info JSX** into
  `FestivalContactInfo.tsx`, the shared component the success pages already
  use. The two contexts needed different heading levels/sizes (page section
  `<h2 className="text-3xl">` vs. success-page card `<h3 className="text-2xl">`)
  — that's why this was left alone in an earlier QA pass. Added a
  `headingLevel?: "h2" | "h3"` prop (defaults to `"h3"`, preserving the
  success-page behavior unchanged) so `Contact.tsx` can request the `h2`/
  `text-3xl` variant explicitly. Verified in-browser: Contact page renders
  pixel-identical to before.
- **Sponsors page** (`src/page-components/Sponsors.tsx`):
  - Added a "See the 2026 Sponsors →" jump link under the "Become a
    Sponsor" intro paragraph, linking to `#grant-partners`.
  - "Our Sponsors" section: updated the intro paragraph text, added an
    `id="grant-partners"` (with `scroll-mt-32`, matching the site's
    existing jump-link offset convention) H3 "Our Grant Partners" above
    the sponsor logo grid, and two more H3s below it — "Our Gold Sponsors"
    and "Our Silver Partners" — as placeholders for logos to be added
    later.
  - Verified in-browser: jump link scrolls to the correctly-offset heading
    (not hidden behind the fixed nav/ribbon), new headings render in the
    right order.
- `next build` and `vitest` both pass.

---

## 2026-07-12 — Nav: "About" Directly Clickable, Dropdown Now Advertising-Only

- `src/components/SiteNav.tsx`: previously "About" was purely a dropdown
  trigger (clicking it only opened a menu containing both "About" and
  "Advertising" — clicking the word "About" itself never navigated
  anywhere). Split it into a real `Link` to `/about` plus a small separate
  chevron-only trigger button next to it; the dropdown now contains just
  "Advertising". Hovering either the "About" link or the chevron opens the
  flyout, same as before. Mobile menu was already correct (About and
  Advertising as separate, directly clickable rows) — not touched.
- Verified in-browser: clicking "About" navigates to `/about`; hovering
  reveals a single-item "Advertising" flyout.
- `next build` and `vitest` both pass.

---

## 2026-07-12 — New Tickets Page: Collector VIP Pass

Most festival events are free, but there's a paid Collector VIP Pass with
benefits spanning four separate days, plus a standalone lecture ticket and
a free RSVP for the Public Exhibition. Discussed page-vs-inline options
first (see prior context) — landed on a dedicated page since one pass
spanning four days is closer in shape to Open Division/Advertising than a
couple of one-off ticket links, and only one of the four days (the Judge's
Lecture) even has a second standalone option to disambiguate.

- **New `/tickets` page** (`src/page-components/Tickets.tsx` +
  `src/app/tickets/page.tsx`): three offerings, each with its own external
  purchase link (all via `app.gopassage.com`, `target="_blank"`):
  - **Collector VIP Pass — $125**: day-by-day benefit cards for Sep 13
    (Private Meet & Greet — same event as the existing "Artist Meet &
    Greet" on the Schedule page, confirmed with the user; no schedule data
    changes needed), Sep 17 (Judge's Lecture, priority seating), Sep 18
    (Collectors Preview Reception and Awards Presentation), and Sep 19
    (live auction priority seating). Closing blurb on how the pass
    supports the Ralston HINGE Creative District.
  - **Judge's Lecture Only — $25**: standalone ticket for people who just
    want the lecture, separate from the full pass.
  - **Public Exhibition & Sale — Free**: RSVP link (still free, GoPassage
    used for headcount).
- **Nav**: added "Tickets" to `SiteNav.tsx`'s link list (both desktop and
  mobile pick it up automatically, same array), positioned right after
  Schedule.
- **Schedule page cross-links**: `src/page-components/Schedule.tsx` now
  shows an "Included in the Collector VIP Pass →" link to `/tickets` on
  the Sep 13, 17, 18, and 19 day cards, following the same inline-CTA
  pattern already used for the online-sale day.
- **Updated stale "pricing coming soon" copy** now that real pricing
  exists: `src/data/faq.ts` ("Is there an admission fee?" and "How do I
  get tickets...") and `src/page-components/Index.tsx` (homepage FAQ,
  which also had incorrect event times — 5–8 PM/1–4 PM instead of the
  correct 5:30–8 PM/11 AM–5 PM from `schedule.ts` — fixed those too since
  they were in the exact paragraphs being edited).
- **`src/lib/schema.ts`**: the JSON-LD `offers` array was auto-deriving
  generic ticketed offers from schedule data with no `price` field at all.
  Replaced with two explicit offers (VIP Pass $125, Lecture $25) with real
  `price`/`priceCurrency`/`url`, removed the now-unused `days` import.
- **`src/app/sitemap.ts`**: added the missing `/tickets` entry (this file
  is manually maintained, not auto-generated from routes).
- **Second "Buy the Collector VIP Pass" button** added right below the
  price, above the benefit cards — the pass now has a purchase button both
  at the top and bottom of its section, per request ("so people see it
  twice").
- Verified in-browser: page renders end-to-end, all CTA buttons point to
  the correct external URLs, Schedule cross-links navigate to `/tickets`
  correctly. `next build` (23 routes now) and `vitest` both pass.

---

## 2026-07-12 — Homepage: Buy Tickets Hero Button + Collector VIP Pass Section

- **Hero** (`src/page-components/Index.tsx`): added a third button, "Buy
  Tickets" → `/tickets`, between the existing "View Schedule" (primary)
  and "Meet the Artists" (outline) buttons. Styled to match "Meet the
  Artists" (outline) rather than introducing a third visual treatment.
  Verified all three fit on one line without wrapping.
- **New "Collector VIP Pass" section**, placed right after the homepage
  Schedule section (same logical pairing as the Schedule-page cross-links
  added earlier): eyebrow, H2, a summary of what the $125 pass includes
  plus the $25 lecture-only option, and a "View Tickets" button to
  `/tickets`. Matches the visual pattern of the homepage's other simple
  sections (About, Highlights) — no separate component, since it's
  homepage-only content.
- Verified in-browser: hero buttons render without wrapping, "Buy Tickets"
  navigates to `/tickets`, `#tickets` anchor lands correctly on the new
  section. `next build` and `vitest` both pass.

---

## 2026-07-12 — SEO Title/Description Rewrite (All 11 Pages)

User supplied hand-optimized `<title>`/description pairs (with exact
character counts) for every page. Replaced the previous
`"<Page> | Heartland Plein Air Festival"` convention entirely — the new
titles are full standalone SEO titles, not meant to have the site name
suffix appended (appending it would have blown well past the character
counts the user specifically targeted).

- Updated both the SSR `metadata` export in each `src/app/<route>/page.tsx`
  and the matching client-side `document.title`/`setPageMeta()` (or, for
  Schedule, its own inline meta-tag logic) in each page-component, so the
  two stay in sync. `Faq.tsx` and `Index.tsx` have no client-side override
  — they rely solely on the SSR metadata, so only their route wrapper
  needed updating.
- Pages covered: Home, About, Schedule, Tickets, Artists, Gallery, Open
  Division, Sponsors, FAQ, Contact, Advertising.
- **Fixed a stale drift while touching Gallery**: its client-side
  `setPageMeta` said "23 artists," inconsistent with the site's actual
  25-artist roster used everywhere else (including the new copy). Now
  consistent.
- **Flagged, not changed**: the new Gallery title is "Browse Plein Air
  Paintings for Sale," but Gallery is intentionally a portfolio-only page
  with no purchase flow (a deliberate decision from an earlier session —
  see the "Gallery-as-portfolio" note). Implemented exactly as given per
  explicit instruction, but flagged the wording tension to the user.
- Verified the actual built HTML `<title>` and `<meta name="description">`
  tags for all 11 pages match the requested copy exactly. `next build` and
  `vitest` both pass.

---

## 2026-07-12 — Gallery Title Corrected + Hero Buttons Fixed on Mobile

- **Gallery title fixed**: "Browse Plein Air Paintings for Sale" (flagged
  as inaccurate in the previous entry) changed to "Preview Artist
  Portfolios: Plein Air Festival 2026" in both
  `src/app/gallery/page.tsx`'s metadata and `Gallery.tsx`'s client-side
  `document.title`. The description was already accurate ("preview," not
  "buy") and didn't need changing — only the title claimed a sale that
  doesn't happen on this page.
- **Hero buttons fixed on mobile** (`src/page-components/Index.tsx`): the
  three hero buttons (View Schedule / Buy Tickets / Meet the Artists,
  added in the last two sessions) used `flex flex-wrap`, which on narrow
  screens wraps three differently-sized pill buttons unevenly. Changed to
  `flex-col` (full-width, stacked) below the `sm` breakpoint and
  `sm:flex-row sm:w-auto` (original pill layout) at 640px and up.
  Verified `next build`/`vitest` pass; could not get a true mobile-width
  screenshot in this environment (the browser tool's resize doesn't
  constrain the actual render viewport — confirmed again via
  `window.innerWidth`), but the fix is deterministic: Tailwind's
  unprefixed classes are mobile-first, so this applies correctly below
  640px regardless of exact device width.

---

## 2026-07-12 — Desktop Hero Bugs: Advertising Cutoff + Site-Wide Fade-In Bug

User reported the Advertising page's top text was cut off and other pages
had "weird spacing" on desktop. Investigated both — two separate real bugs,
not one:

- **Advertising header text was genuinely clipped.** Measured the fixed
  nav stack's actual height on `/advertising`: nav (112px) + countdown
  ribbon (44px) + the `AdvertisingDeadlineBanner` added a few sessions ago
  (~37px) = 193px total. The header's `pt-44` (176px) was tuned for
  nav+ribbon only (156px, with buffer) — it never accounted for the extra
  banner, so the eyebrow text ("Reach Collectors & Attendees") was
  rendering ~17px behind the fixed bar and invisible. Bumped Advertising's
  header specifically to `pt-52` (208px). Every other content page's
  `pt-44` was already correctly sized for its actual (banner-less) nav
  stack — confirmed by measuring `/about` (156px stack, 176px padding, ~20px
  intentional buffer) — so only Advertising needed the change.
- **Site-wide fade-in bug, more serious**: `useInView` (the hook behind
  `AnimatedSection`, used all over the site) relies on
  `IntersectionObserver`'s first async callback to reveal content. For
  elements already on-screen at mount — i.e. anything above the fold —
  that first callback can be missed depending on paint/layout timing,
  leaving the element stuck at `opacity: 0` permanently until the user
  manually scrolls. Confirmed this reproduces in an actual **production
  build** (`next build && next start`), not just dev — so it was live-site
  behavior, not a dev artifact. Concretely: `/artists`, `/gallery`,
  `/blog`, and `/faq` all wrap their entire hero (eyebrow/H1/intro) in
  `AnimatedSection`, so all four rendered a blank hero on direct page load
  until scrolled — this is very likely what read as "weird spacing" across
  "the rest of the pages." Fixed in `src/hooks/useInView.ts`: synchronously
  check `getBoundingClientRect()` when the effect runs, and short-circuit
  to visible immediately if the element is already in the viewport,
  instead of relying solely on the observer's async first notification.
  Below-the-fold scroll-triggered animations are unaffected (still gated
  by the observer as before). This is a hook-level fix, so it applies
  everywhere `AnimatedSection` is used, not just the four pages tested.
- Verified all fixes against a production build (not dev server), since
  the fade-in bug specifically didn't reproduce reliably enough in dev to
  trust that environment for this. `next build` and `vitest` both pass.

---

## 2026-07-12 — Real PayPal Button Wired Into Open Division

Closes out the PayPal follow-up from earlier — the "click the PayPal
button" copy on `/open-division` and `/open-division/success` now has an
actual working button behind it.

- **New `src/components/PayPalButton.tsx`**: loads the PayPal JS SDK
  client-side via `next/script` (`strategy="afterInteractive"`, same
  pattern already used for GA4/Meta Pixel in `layout.tsx`), renders Smart
  Payment Buttons for a fixed amount/description passed in as props, and
  shows a simple "Payment received" confirmation on `onApprove`. No
  backend — matches this site's static architecture. Client ID comes from
  `NEXT_PUBLIC_PAYPAL_CLIENT_ID`, a **Live** (not Sandbox) app credential
  the user confirmed was tied to the correct PayPal business account
  (verified via the Developer Dashboard's account context, not just
  assumed).
- **`InquirySuccess.tsx`** gained an optional `children` slot, rendered
  right after the intro paragraph in the header, so
  `OpenDivisionSuccess.tsx` could drop the button in without forking the
  shared component. Other success pages (Contact, Sponsors, Advertising)
  don't pass children, so they're unaffected.
- **`OpenDivision.tsx`**: added a small "Already Registered? Pay Your $30
  Fee" card directly below the registration form, so the button is present
  on this page too (not just success), per explicit placement
  confirmation.
- Verified in-browser against a **production build**: the SDK actually
  loads and renders a real, functional "Pay with PayPal" button on both
  pages (not a placeholder) — did not click through to complete an actual
  payment, since that would be a real financial transaction.
- `.env` (containing the real Client ID) is confirmed still gitignored and
  untracked — never committed.
- `next build` and `vitest` both pass.
- **Update:** the button initially didn't render on the live site after
  the user added `NEXT_PUBLIC_PAYPAL_CLIENT_ID` to Vercel — because
  `NEXT_PUBLIC_*` vars are baked in at build time, not read at runtime, so
  adding one doesn't affect an already-built deployment. User triggered a
  redeploy from the Vercel dashboard and confirmed the button now renders
  on the live `/open-division` page. Closed out.

---

## 2026-07-12 — Site-Wide Heading Size & Body Text Consistency Pass

Full UX QA pass covering heading sizes, body text sizes, contrast, and
heading hierarchy site-wide, per explicit request. Method: grepped every
`<h1>`–`<h3>` and body `<p>`/`<span>` className across all page-components
to find the dominant convention vs. outliers, then verified contrast and
heading hierarchy by computing actual rendered WCAG contrast ratios and
walking the heading-level tree live in-browser against a production build
(not just eyeballing).

**H2 normalization** — the site's dominant H2 convention is static
`text-4xl` (no responsive breakpoint). Found and fixed 8 outliers using a
smaller `text-3xl` (some with a `md:text-4xl` bump, some without) that had
no clear intentional reason to differ:
- `Tickets.tsx`: "Judge's Lecture Only" and "Public Exhibition & Sale" —
  didn't match the "Collector VIP Pass" H2 on the same page (this page's
  own internal inconsistency, introduced when the page was built).
- `Schedule.tsx`: "Festival Locations" (page-section header) and the
  per-day title H2 inside each schedule day card.
- `Gallery.tsx`: the per-artist name H2.
- `InquirySuccess.tsx`: the recap title ("Open Division Quick Facts" etc.)
  and "Get in Touch" — shared by all 4 success pages, one fix covers all.
- `SponsorsSection.tsx` (homepage): "Our Sponsors" — the only H2 on the
  entire homepage that didn't match every other section's `text-4xl`.
- `Faq.tsx`: the per-category headers ("General," "Artists & Events," etc.)
- **Left alone, not part of this fix**: `BlogPost.tsx`'s "Related Articles"
  (that page already has its own smaller H1 scale, so a smaller H2 is
  proportionally consistent within it) and two pre-existing `md:text-5xl`
  outliers (`NewsletterCTA.tsx`'s H2 and Artists' "Awards Judge" H2) —
  both are larger than standard, used as a single deliberate emphasis
  point rather than repeated inconsistently, and weren't part of what was
  flagged/asked to fix.
- **H1s already consistent** — confirmed `text-5xl md:text-6xl` on every
  content page; the homepage hero (`md:text-7xl`) and BlogPost/success
  pages (`md:text-5xl`) are the only exceptions, both clearly intentional
  (primary landing hero vs. secondary confirmation/article pages).

**Body text normalization** — the site has an established two-tier system:
`text-lg` for main flowing prose, `text-sm` for list-item/card
descriptions. `OpenDivision.tsx` was the sole outlier, using `text-base`
for both tiers (5 instances: the Registration & Check-In prose block, 3
checklist `<span>`s, and the Turn-In & Pickup card description). Fixed all
5 to match their respective tier.

**Forms checked, already consistent** — no page uses a real heading
element for the "Ready to Register/reserve/sponsor?" CTA intros
(Advertising, Sponsors, Open Division all use a styled `<p>`, matching
each other exactly). The one genuine `<h3>` inside a form
(`InquiryForm.tsx`'s inline "Inquiry sent" success state, shown on
Sponsors/Advertising which don't redirect) is `text-2xl`, matching other
legitimate H3 sizes used elsewhere on the site. No changes needed.

**Accessibility, verified clean:**
- Contrast: wrote a script that computes actual rendered WCAG AA contrast
  ratios (alpha-composited effective color vs. actual ancestor background,
  not just the raw CSS color value) and ran it against Advertising,
  Tickets, Sponsors, and the Open Division success page (including the new
  PayPal card). Zero violations. One false positive along the way
  (NewsletterCTA's gradient background isn't a plain `background-color`,
  so the first version of the script mis-detected its ancestor background
  — fixed the script to bail out on gradient ancestors rather than falsely
  flag it).
- Heading hierarchy: walked the h1–h6 tree on Tickets, Sponsors, and Open
  Division success looking for skipped levels. None found.
- `next build` and `vitest` both pass.

---

## 2026-07-13 — Sponsors Page: Silver Tier Heading Wording

**"Our Silver Partners" → "Our Silver Sponsors"** (`Sponsors.tsx`) — matches
the "Our Gold Sponsors" heading directly above it; the two tiers used
different words ("Partners" vs. "Sponsors") for the same kind of heading.
*(262ea14)*

---

## 2026-07-13 — Body Text Size Audit: text-base Outliers Fixed

Prompted by a report that Tickets page body text looked smaller than the
rest of the site. Confirmed this isn't a mobile breakpoint bug (no
responsive class shrinks text at small screens anywhere in the codebase)
— it's a handful of paragraphs still on the site's older `text-base` size
instead of the now-dominant `text-lg` used for standalone flowing prose
(established on About, Advertising, Sponsors, and even Tickets' own
sibling paragraphs). Audited every `text-base`/`text-lg` usage
site-wide and fixed the 7 genuine outliers:

- `Tickets.tsx` — VIP Pass closing paragraph ("Your pass also supports...")
- `Index.tsx` — "Art Made Here" body, "Collector VIP Pass" intro,
  "Painting Locations" intro
- `ArtistSpotlight.tsx` — "Artist Spotlight" intro
- `Schedule.tsx` — "Festival Locations" intro, per-day narrative paragraph

*(4548b97)*

Left unchanged as distinct, internally-consistent tiers (not outliers):
CTA sub-copy under a bold "Ready to...?" line (Advertising, OpenDivision,
Sponsors — all three match each other), FAQ/accordion answer content,
form input text, and card/list description text.

---

## 2026-07-13 — FAQ Page: Internal Links + Festival-Hours Reformat

**Internal links in answers** (`src/data/faq.ts`, `src/page-components/Faq.tsx`)
— reviewed every FAQ answer for existing plain-text mentions of other
site pages (e.g. "See the Tickets page for details.") and made them
real links. Added a small `[label](/path)` markdown-style syntax to
the data file, parsed by a new `renderAnswer()` helper in `Faq.tsx`
into `next/link` `<Link>` elements — keeps `faq.ts` as the sole
content source per convention, no new dependency. Linked ~13 mentions
across Tickets, Schedule, Open Division, Sponsors, Contact, and
Artists pages.

**"What days and times is the festival open?" reformatted** — was 2
dense paragraphs cramming 8 separate dated events together. Split
into one paragraph per date/event plus a closing link to the
Schedule page for the full itinerary.

*(c0edd9f)*

Known data drift (not fixed, flagging only): the homepage's FAQ
section (`Index.tsx`'s own `faqs` array, separate from `src/data/faq.ts`)
has an outdated Quick Paint schedule (different days/locations than
the real data). Out of scope for this pass since it wasn't asked for,
but worth reconciling — it's a second, hand-maintained copy of similar
content that's drifted from the source of truth.

---

## 2026-07-13 — Partner Org Links + Sponsor Contact Info Update

**External links added** — reviewed the site for every mention of six
partner organizations and linked them where they weren't already:
Benson Creative District, Historic Dundee Creative District, Castle &
Cathedral Creative District, Visit Nebraska, Nebraska Arts Council,
and Nebraska Cultural Endowment. Linked in the FAQ's "How can local
businesses support the festival?" answer and in the About page's
"About the Organizers" section (previously plain text). Also linked
FosterLove and Healing Ribbons in the FAQ's "Does the festival partner
with local nonprofits or schools?" answer.

`renderAnswer()` in `Faq.tsx` (added in the previous pass) now also
handles external URLs in its `[label](url)` syntax, rendering them as
`target="_blank"` links distinct from internal `next/link` routes.

**Creative district logos now link out** — added a `logoUrl` field to
`ScheduleDay` (`src/data/schedule.ts`) for the Castle & Cathedral,
Benson, and Dundee day entries. Both `Schedule.tsx` (Schedule page)
and `ScheduleSection.tsx` (homepage) read from the same `schedule.ts`
data, so wiring the link through that one shared field made both
places consistent in a single change — no logo-linking code
duplicated. The Ralston HINGE logo (also `logo`'d on two of the same
days) intentionally has no `logoUrl`; it wasn't part of the org list
for this change and is already linked separately elsewhere (About
page → ralstonarts.org).

**Sponsor contact info corrected** — "How can I become a festival
sponsor?" previously listed City Administrator Jack Cheloha
(402.331.6677, jcheloha@cityofralston.com) as the direct contact.
Replaced with the Ralston HINGE Creative District's own email
(ralstoncreativedistrict@gmail.com, attn. Debra Joy Groesser) — the
same contact used everywhere else on the site. Grepped the full repo
afterward; confirmed zero remaining mentions of Cheloha or
cityofralston.com anywhere.

*(6f800c8)*

Judgment call, not changed: `Sponsors.tsx`'s "Best of the Creative
Districts (Ralston, Dundee, Benson, Castle & Cathedral) — $500 each"
line names three of the same districts, but as a dense award-category
parenthetical rather than a genuine reference to their organizations.
Linking individual words inside it looked more cluttered than useful,
so it was left as plain text — flagging in case you'd rather it be
linked too.

---

## 2026-07-13 — Homepage Schedule CTA, FAQ Data-Drift Fix, Sitewide Link/QA Pass

**Homepage "View Full Schedule" button** — added to the bottom of the
homepage's Festival Schedule section (`ScheduleSection.tsx`), matching
the existing "View All FAQs" button style.

**Homepage FAQ fixed at the root cause** — `Index.tsx` had its own
hand-duplicated `faqs` array, separate from `src/data/faq.ts`, flagged
as data drift in the previous pass. While verifying the Google Map
data against the schedule this session, confirmed the drift was worse
than cosmetic: the homepage copy had the *wrong* days and locations
for the Lunch Break Paintouts (old plan — Benson/Dundee/Castle &
Cathedral on the wrong days, calling them "Quick Paint competitions"
instead of paintouts). Rather than patch the duplicate again, added a
`featured?: boolean` flag to `FaqItem` in `src/data/faq.ts` and made
the homepage derive its 5 questions from that single source
(`faqCategories.flatMap(...).filter((i) => i.featured)`). The
duplicate can't drift again because there's only one copy now.

**Shared rich-text link renderer** — extracted the FAQ page's
`[label](url)` markdown-style link parser into `src/lib/richText.tsx`
(handles both internal `next/link` routes and external
`target="_blank"` links). Previously only `Faq.tsx` had it; now also
used by the homepage FAQ, `Schedule.tsx` (day narratives),
`ScheduleSection.tsx` (homepage schedule cards), and `OpenDivision.tsx`
(checklist items) — one implementation instead of four.

**The Granary linked everywhere it's mentioned** — FAQ answers,
schedule day narratives/descriptions, `Tickets.tsx`, `OpenDivision.tsx`
→ atthegranary.com. Also added an optional `websiteUrl` field to
`FestivalLocation` (`src/data/locations.ts`) and wired a "Visit
website" link into the Granary's Google Map popup and the map's
list-view fallback (`LocationsMap.tsx`).

**Creative district logos now link out on the homepage too** — the
`logoUrl` field added to `ScheduleDay` last session only reached the
Schedule page. `ScheduleSection.tsx` (the homepage's schedule cards)
reads the same `days` data but wasn't updated to render the link —
fixed, so Castle & Cathedral / Benson / Dundee logos link out in both
places now.

**Google Map data verified** — cross-checked every address, event
name, day, and time in `src/data/locations.ts` against
`src/data/schedule.ts`. Everything matches; no errors found in what
the map displays. (The stale info was in the homepage FAQ text, not
the map — see above.)

**Nav: "FAQ" → "FAQs"** (`SiteNav.tsx`) — one shared array drives both
desktop and mobile menus, so a single edit fixed both.

**Heading consistency** — `Artists.tsx`, `Blog.tsx`, and `Gallery.tsx`
H1s were missing `leading-tight`, present on all 8 other page heroes.
Added it for consistency (low visual impact today since these are
short one-line titles, but keeps the class list uniform).

Audited heading/body alignment site-wide (centered vs. left) looking
for accidental inconsistency. Conclusion: the site already follows a
consistent, deliberate convention per page — centered for short
intro/pitch sections and section-header-before-a-grid, left-aligned
for longer flowing prose and reference lists — repeated the same way
on Advertising, Open Division, and Sponsors. No bug found beyond the
`leading-tight` gap above.

**Orphaned/widowed text (last-line single words)** — rather than hand-
editing non-breaking spaces into every heading and paragraph across
the site (fragile against future content edits, especially for
data-driven/looped text), added `text-wrap: balance` to all headings
and `text-wrap: pretty` to paragraphs globally in `globals.css`. A
`.text-balance` utility already existed there but was never applied
anywhere in the codebase — this replaces that gap with a systemic
fix. Note: `text-wrap: pretty` has narrower browser support than
`balance` (modern Chromium; not yet Safari/Firefox as of this
writing) — it degrades harmlessly to normal wrapping where
unsupported, so there's no regression risk, just less-than-universal
coverage until other browsers catch up.

**Removed `src/index.css`** — unused (not imported anywhere in the
Next.js app), and a stale duplicate of `globals.css` from before the
WCAG contrast fixes (still had the old, less-accessible color
values). Leftover from the Vite migration that should have been
deleted with the other Vite artifacts.

*(af75743)*

Judgment call, not changed: same as last session's flagged item —
`Sponsors.tsx`'s "Best of the Creative Districts (Ralston, Dundee,
Benson, Castle & Cathedral)" award-list line still isn't linked.
Consistent with leaving it alone previously.

---

## 2026-07-13 — Sponsorship FAQ Wording + Sitewide Schema Markup Audit

**"How can local businesses support the festival?"** — closing
sentence changed from "contact the Ralston HINGE Creative District
directly" to "see the Sponsors page or contact us to learn more,"
with both the Sponsors and Contact pages linked.

**Schema markup audit** — before this pass, only two files touched
JSON-LD at all: the root layout (Organization + Event, injected on
every page identically) and `Schedule.tsx` (its own per-event Event
schema, but injected client-side via `document.createElement`, so it
wasn't in the server-rendered HTML). No page had schema tailored to
its own content beyond that shared graph.

- **BreadcrumbList** added to all 11 top-level pages and to individual
  blog posts (3 levels: Home > Blog > post title, since a single post
  is a level deeper than everything else). `breadcrumbSchema()` in
  `schema.tsx` now takes an array of crumbs instead of one fixed
  label/path, to support both cases with the same function.
- **FAQPage** added to `/faq` — the clearest gap: the site already has
  a rich, categorized Q&A dataset that's exactly what Google's FAQ
  rich results expect, and it had none. Answers are stripped of the
  `[label](url)` markdown link syntax for the schema's plain-text
  field (the visible page still shows the real links via
  `renderRichText`).
- **BlogPosting** added to individual blog post pages.
- **`schema.ts` → `schema.tsx`** — replaced the unused `addJsonLd()`
  helper (dead code; nothing in the repo called it — `Schedule.tsx`
  had silently reimplemented the same DOM-injection logic by hand
  instead) with a `JsonLd` component rendered directly in JSX. Root
  layout and every new schema addition uses this now, so JSON-LD is
  present in the initial server-rendered HTML everywhere, not
  dependent on client JS execution.
- **`Schedule.tsx` per-event schema moved to JSX** — the computation
  was already static (derived from the `days` import, not client
  state), so it didn't need the `useEffect` + manual script-tag
  dance. Left the same effect's title/meta/canonical DOM manipulation
  untouched (redundant with the route's own `metadata` export, but
  that's a pre-existing pattern repeated across every page and out of
  scope for a schema-specific audit).
- **Data gap fixed**: the Benson and Dundee Lunch Break Paintout
  entries in `schedule.ts` had no `address` field, so their Event
  schema silently had no `location` at all (the code already handled
  a missing address gracefully — it just meant no location was ever
  emitted). Filled in from `src/data/locations.ts` (62nd & Maple /
  50th & Underwood — the same addresses verified against the Google
  Map in the previous session).

*(3ebc036)*

Not touched: the four post-submission success pages
(`/advertising/success`, `/sponsors/success`, `/open-division/success`,
`/contact/success`) — confirmed via `sitemap.ts`'s own comment that
they're deliberately excluded from search discovery, so page-specific
schema there would have no audience.

---

## 2026-07-13 — Internal Link Audit: Blog Removed, Targeted Links Added

Audited every page for both outgoing and incoming **content-level**
internal links (i.e. links inside body copy, not just the shared
header nav that's identical on every page — nav technically makes
every page reachable from every other, but doesn't carry the same
SEO/contextual weight as an in-content link).

**Findings**: Schedule, Tickets, and Artists were already well-linked
from multiple pages. About, Advertising, Gallery, Contact, Sponsors,
and Open Division had zero incoming content links — reachable only
via the header nav. The blog was a true orphan: not linked from the
header nav, the footer, or any page's content — the only ways to
reach it were typing the URL directly or finding it through search
(it was in `sitemap.xml`, so Google could still index it, but no
human visitor had a way to click into it from anywhere on the site).

**Decision**: remove the blog entirely rather than fix its
discoverability, and add links only where there's a genuinely natural
fit — no inserting a link into a sentence just to have one.

- **Blog removed completely**: `src/app/blog/` (both routes),
  `Blog.tsx`, `BlogPost.tsx`, `BlogPostCard.tsx`, `src/data/blog.ts`,
  and the blog import/route/per-post generation in `sitemap.ts`.
  `CLAUDE.md`'s project structure section updated to drop the stale
  references. Verified with a full `next build` that no route,
  import, or type error resulted.
- **`Artists.tsx`** → added "See Their Work in the Gallery →" next to
  the existing "Meet This Year's Judge →" link. Gallery already
  linked to Artists; this makes it bidirectional instead of one-way.
- **`Index.tsx`** (homepage) → added "Read Our Full Story →" (`/about`)
  under the "Art Made Here" teaser, which is a condensed version of
  the About page's own content — the same teaser-to-full-page pattern
  the homepage already uses for Schedule and FAQ.
- **`SponsorsSection.tsx`** (homepage) → added a "Become a Sponsor"
  button matching the homepage's other section CTAs. The sponsor logo
  grid only linked out to sponsors' own external sites before this;
  there was no path from the homepage back to the site's own Sponsors
  page.
- **FAQ** — "How can local businesses support the festival?" now also
  mentions catalog advertising as a concrete way to support the
  festival, linking to `/advertising` — same topic as the rest of
  that answer.

Left `/contact` and `/open-division` as they were: both already have
multiple incoming links from the FAQ page, and there was no existing
content elsewhere natural enough to hang a link off without writing
new copy just to create one.

*(0f7f3dc)*

---

## 2026-07-14 — PayPal Button Fallback Message for Blocked/Failed SDK Loads

Investigated a report that the PayPal button on `/open-division` "randomly"
doesn't show up. Confirmed live that `NEXT_PUBLIC_PAYPAL_CLIENT_ID` is set
correctly and baked into the current deploy (button rendered fine on both a
fresh load and a client-side nav to the page). The remaining, unfixable-by-us
cause is visitor-side: `paypal.com/sdk/js` is commonly blocked by ad blockers
and privacy browser extensions. When that happens the script's `onLoad` never
fires, so the button container just stays empty — and the component's
existing error message only fired from PayPal's own `onError` callback, which
never runs if the SDK never loaded in the first place. Net effect: a silent
blank box with no indication to the visitor (or us) that anything failed.

- **`src/components/PayPalButton.tsx`**: added a 6-second timeout — if the
  SDK hasn't signaled ready by then, shows the same "Something went wrong
  with PayPal... email ralstoncreativedistrict@gmail.com" fallback message
  that already existed for the `onError` case. If the SDK loads late (slow
  network, not fully blocked) after the timeout already fired, the message
  clears once the button actually renders.
- **New `src/components/PayPalButton.test.tsx`**: covers both paths —
  fallback message appears when the SDK never loads, and stays absent when it
  loads normally.
- `next build`, `npm test`, and `npm run lint` all pass. Verified manually via
  `npm run dev` that the button still renders normally.

*(c4e64b1)*

---

## 2026-07-15 — Mail-a-Check Option Added Alongside PayPal on Open Division

Added a "mail a check" payment option next to the existing PayPal button, per
explicit request, so registrants who prefer not to pay online have an
alternative.

- **New `src/components/MailCheckOption.tsx`**: simple info block — payee
  name, amount, and mailing address (Ralston HINGE Creative District, 5615
  S. 77th St, Ralston, NE 68127 — same address already used in
  `FestivalContactInfo.tsx`). Takes an `amount` prop so the dollar figure
  isn't hardcoded twice.
- **`OpenDivision.tsx`** and **`OpenDivisionSuccess.tsx`**: the "Pay Your $30
  Fee" card on both pages now shows a two-column "Pay Online" (PayPal) /
  "Mail a Check" layout instead of PayPal alone, stacking to one column on
  mobile via the same `sm:grid-cols-2` pattern used elsewhere on the site.
  Updated the surrounding copy on both pages to mention both payment paths
  instead of only PayPal.
- `next build`, `npm test`, and `npm run lint` all pass. Verified visually via
  `npm run dev` on both pages.

*(3c5e394)*

---

## 2026-07-17 — Standalone Collectors Preview Reception Ticket ($95)

Added a third standalone ticket tier — previously the Collectors Preview
Reception and Awards Presentation was only available bundled into the $125
Collector VIP Pass.

- **`src/page-components/Tickets.tsx`**: new "Collectors Preview Reception
  Only" section ($95), same layout pattern as the existing "Judge's Lecture
  Only" ($25) section, linking to
  `https://app.gopassage.com/events/heartland-plein-air-festival-collectors-reception-and-awards-presentation`.
- **`src/page-components/Index.tsx`**: homepage ticket teaser copy updated
  from "Prefer just the lecture? A standalone ticket is available for $25."
  to also mention the $95 reception ticket.
- **`src/data/faq.ts`**: "How do I get tickets to the Collectors Preview
  Reception and Awards Presentation?" updated — previously stated it was
  VIP-Pass-only, now leads with the $95 standalone option.
- `npm run lint` and `npm test` pass.

---

## 2026-07-17 — Reception Ticket Also Surfaced in Meta/Schema/Schedule CTA

Follow-up to the entry above: the $95 standalone reception ticket wasn't yet
reflected outside the Tickets page content itself.

- **`src/app/tickets/page.tsx`** and **`src/page-components/Tickets.tsx`**:
  SEO/client meta descriptions now mention all three ticket options instead
  of just the VIP Pass and lecture.
- **`src/lib/schema.tsx`**: added a third `Offer` ($95) to `ticketOffers`,
  which feeds the site-wide JSON-LD Event schema in `layout.tsx` — verified
  via `npm run build` that the rendered `<script type="application/ld+json">`
  on `/` includes all four offers (free, $125, $25, $95).
- **`src/page-components/Schedule.tsx`**: the Sep 17 and Sep 18 schedule-day
  cards had a shared "Included in the Collector VIP Pass →" link that
  implied VIP-only. Added a `standaloneTicketCta` map so those two days now
  mention the standalone option instead.
- **`src/data/faq.ts`**: the "what's free vs. paid" overview answer now
  mentions the $95 standalone reception ticket alongside the $25 lecture.

---

## 2026-07-17 — Second PayPal Button: Variable-Amount Sponsorship Payment

Added an online payment option to `/sponsors`, mirroring the Open Division
"Pay Your $30 Fee" pattern — but sponsorship levels are priced as ranges
($100–$249 up to $5,000+), not one flat fee, so a single fixed-amount
button (like Open Division's) wouldn't fit six different tiers.

- **`src/data/sponsorTiers.ts`**: added a numeric `min` field to each tier
  (100/250/500/1,000/2,500/5,000) alongside the existing display `price`
  range string.
- **New `src/components/SponsorPaymentForm.tsx`**: a tier `<select>` plus
  an editable amount `<input type="number">`. Picking a tier sets the
  amount to that tier's minimum; the amount field can then be edited freely
  (e.g. for "$5,000 and over" or a custom figure) independent of the
  dropdown. Renders `PayPalButton` and `MailCheckOption` side by side, both
  driven by the same `amount` state — same two-column layout as Open
  Division. Shows a prompt instead of the payment options when the amount
  field is empty/invalid.
- **`src/page-components/Sponsors.tsx`**: new "Already Committed? Pay Your
  Sponsorship Online" card added below the sponsorship inquiry form,
  rendering `SponsorPaymentForm`.
- As with Open Division's PayPal button, there's no backend — the amount
  charged is whatever the visitor's browser sends at click time, and
  nothing enforces it matches the tier they selected. Same trust model as
  the existing $30 Open Division fee, just more visible now that the
  amount field is free-form.
- Verified interactively via `npm run dev`: switching tiers updates the
  amount and the "Mail a Check" copy; editing the amount directly still
  updates the PayPal button's order amount; clearing the field hides both
  payment options and shows a prompt instead. `npm run lint`, `npm test`,
  and `npm run build` all pass.

---

## 2026-07-17 — Sponsorship PayPal Button Also Added to Success Page

Follow-up to the entry above: `/sponsors/success` (shown after submitting
the inquiry form) didn't yet offer online payment, unlike Open Division's
success page which already has its $30 fee button.

- **`src/page-components/SponsorSuccess.tsx`**: reused `SponsorPaymentForm`
  (no duplication — same tier/amount inputs, `PayPalButton`, and
  `MailCheckOption` as `/sponsors`) inside `InquirySuccess`'s `children`
  slot, in a `bg-card` panel matching Open Division's success-page pattern.
  Wrapped in `text-left` since `InquirySuccess` centers its header content
  by default and the form's labels/inputs are left-aligned on `/sponsors`.
  Updated the intro copy to mention paying online now that the option
  exists.
- Verified visually via `npm run dev`. `npm run lint`, `npm test`, and
  `npm run build` all pass.

---

## 2026-07-17 — Per-Page Open Graph / Twitter Metadata (All 10 Routes)

SEO audit found that no route under `src/app/*/page.tsx` set its own
`openGraph`/`twitter` metadata — only `title`, `description`, and
`alternates.canonical`. Next.js only merges `Metadata` objects at the
top level, so any nested object (like `openGraph`) a route doesn't
redeclare is inherited *whole* from the root layout. Net effect: sharing
any page on Facebook/Slack/iMessage/Twitter showed the homepage's generic
title, description, and hero image — not that page's own content.

- Added `openGraph` and `twitter` blocks to all 10 route files (`about`,
  `advertising`, `artists`, `contact`, `faq`, `gallery`, `open-division`,
  `schedule`, `sponsors`, `tickets`), reusing each page's existing
  `title`/`description` text plus `siteName`/`locale` (which must be
  redeclared per page too, since providing `openGraph` at all replaces
  the parent's entire object rather than merging into it).
- Images: reused real, on-topic assets where they existed — About uses
  `plein-air-painter-niobrara-river.webp` (already the page's own hero
  photo), Gallery uses `sunlit-riverside-valley-plein-air-oil-painting.webp`
  (an actual festival-artist painting) instead of the generic festival
  hero. The other 8 pages fall back to `hero-pleinair.jpg` — no other
  real (non-placeholder) photo fit those pages specifically.
- Verified via `npm run build` by inspecting the rendered
  `.next/server/app/*.html` output directly: `/gallery` and `/tickets`
  now render distinct `og:title`/`og:description`/`og:image` (resolved to
  absolute URLs via `metadataBase`) instead of the homepage's, and
  `og:site_name`/`og:locale` are still present.
- `npm run lint`, `npm test`, and `npm run build` all pass.

---

## 2026-07-17 — Person Schema for Each Artist (`/artists`)

Second item from the SEO audit: the Artists page had breadcrumb schema
only, no structured data identifying the 25 individual artists (or Rick
J. Delanty, the Judge of Awards) — a missed opportunity for Google to
surface rich results when someone searches an artist's name alongside
the festival.

- **`src/page-components/Artists.tsx`**: added a `toPersonSchema` helper
  mapping each `Artist` (from `src/data/artists.ts`) to a schema.org
  `Person` node — `name`, `jobTitle` ("Plein Air Artist", or "Judge of
  Awards" for Rick Delanty), `image` (resolved to an absolute URL via
  `SITE_URL`), `description` (bio paragraphs joined into one string),
  `homeLocation`, `url` (their site, if present), and `sameAs` (website +
  Instagram + Facebook, whichever exist). All 26 `Person` nodes are added
  to the page's existing `@graph` alongside its breadcrumb schema — kept
  page-scoped rather than added to the site-wide `festivalEventSchema` in
  `layout.tsx`, matching how `FAQPage` schema is scoped to `/faq` only.
- Verified by inspecting `.next/server/app/artists.html` after `npm run
  build`: all 25 artists plus the judge render as `Person` nodes with
  correct fields (spot-checked Hector Acuna and Rick Delanty).
- `npm run lint`, `npm test`, and `npm run build` all pass.

---

## 2026-07-17 — Descriptive Copy + Place Schema for Festival Locations

Third and final item from the SEO audit: the 7 venue entries in
`src/data/locations.ts` (Wildwood Park, Baright Library, Downtown Ralston,
Castle & Cathedral, Benson, Dundee, the Granary) had only name/address/
event-list — no descriptive copy anywhere, and no structured data tying
the festival to these local venues/neighborhoods.

- **`src/data/locations.ts`**: added a `description` field to each of the
  7 `FestivalLocation` entries. Wording was drawn from copy already
  vetted elsewhere on the site (the day-by-day `narrative` text in
  `schedule.ts`, FAQ answers) rather than inventing new claims about the
  venues.
- **`src/components/LocationsMap.tsx`**: renders the new description in
  both the map's info-window popup and the "All Locations" expandable
  list — visible on `/schedule` and the homepage (both render
  `LocationsMap`).
- **`src/page-components/Schedule.tsx`**: added a `festivalLocationSchema`
  array — one schema.org `Place` node per venue with `description`,
  `address`, and `geo` (lat/lng, already in `locations.ts` for the map)
  — added to the page's existing JSON-LD `@graph`. Kept scoped to
  `/schedule` only (not the site-wide `festivalEventSchema` in
  `layout.tsx`), matching the Person-schema decision for `/artists`, and
  avoiding duplicate Place schema on the homepage where `LocationsMap`
  also renders.
- Verified via `npm run build` + inspecting `.next/server/app/schedule.html`
  that all 7 `Place` nodes render with correct geo/description, and via
  `npm run dev` that the new copy displays correctly in the "All
  Locations" list (map itself doesn't load locally — pre-existing,
  unrelated to this change, likely the Google Maps key's domain
  restriction not covering `localhost`).
- `npm run lint`, `npm test`, and `npm run build` all pass.

---

## 2026-07-17 — Fixed Schema Validator Errors: Missing Event Location

User ran a schema/rich-results validator and found "Missing field
'location'" (critical) on two `Event` nodes: "Artwork Framing & Hanging —
Not Open to the Public" and "Youth Mentorship with Professional Artists —
Preselected Participants Only". Both are internal-only sub-events with no
address in `schedule.ts` (by design — they're not events the public can
attend), so the old code's `location: ev.address ? {...} : undefined`
left `location` off entirely, which Google requires for Event rich
results.

- **`src/page-components/Schedule.tsx`**: `scheduleEventsSchema` now
  filters out events without an `address` before mapping to `Event`
  nodes, instead of mapping all events and conditionally omitting
  `location`. This isn't a workaround — these two sub-events genuinely
  aren't public events to surface in search (their names say so), so
  excluding them from Event schema is the correct fix, not just a
  validator-pleasing one. `location` is now always present on every
  emitted `Event` node.
- Verified via `npm run build` + inspecting `.next/server/app/schedule.html`:
  event count dropped from 16 to 14 (the two internal-only sub-events
  gone), and all 14 remaining `Event` nodes have `location` set.
- `npm run lint`, `npm test`, and `npm run build` all pass.

---

## 2026-07-17 — Filled Optional Event Schema Fields (image, offers) + Fixed isAccessibleForFree Bug

Follow-up to the location-schema fix above: the validator's remaining
warnings were all "optional" (`image`, `offers`, `endDate`, `performer`).
Filled in the two with real, accurate data already available; skipped
`performer` (doesn't cleanly apply to paintouts/receptions) and
`endDate` (would need a new time-range parser) per user's choice.

- **`src/lib/schema.tsx`**: exported `ticketOffers` (was module-private)
  so `Schedule.tsx` can reuse the real $25/$95 ticket Offer objects
  instead of duplicating price/URL strings.
- **`src/page-components/Schedule.tsx`**:
  - Every `Event` node now gets `image` (the festival hero photo) and
    `offers` — the Judge's Lecture and Collectors Preview Reception get
    their real ticketed `Offer` (matched by event name via
    `ticketedEventOffers`); every other event gets a `$0` free `Offer`
    linking to `/schedule`.
  - **Bug fix**: `isAccessibleForFree` was set from the *day's* overall
    `audience` field, not the individual event — so the $25 Judge's
    Lecture (a ticketed sub-event on an otherwise free/public day) was
    marked `isAccessibleForFree: true` right next to its own `offers.price:
    "25"`, a direct self-contradiction in the same JSON-LD object. Now
    derived per-event from whether it has a real ticketed offer.
  - **"Artists Turn In Paintings" excluded** from Event schema (per
    user's choice) — same reasoning as the two events removed in the
    prior fix: it's artists dropping off work, not something the public
    attends, even though it has an address. Event count: 14 → 13.
- Verified via `npm run build` + inspecting `.next/server/app/schedule.html`:
  all 13 events have `image`, correct `offers` (2 ticketed, 11 free), and
  `isAccessibleForFree` now matches each event's own offer.
- `npm run lint`, `npm test`, and `npm run build` all pass.

---

## 2026-07-21 — Replaced Rick J. Delanty's Gallery Painting, Gallery Sort Order

Swapped the single placeholder painting under Rick J. Delanty (Awards
Judge) on the Gallery page for three real pieces supplied by the user;
also alphabetized the gallery artist order and standardized his display
name.

- Converted 3 source JPEGs to WebP (`quality=90`) and added to
  `public/artwork/`: `rick-delanty-beach-trail.webp`,
  `rick-delanty-dusks-gentle-touch.webp`,
  `rick-delanty-a-quiet-halleluia.webp`. Removed the old placeholder
  `rick-delanty-coastal-cliffs.webp`.
- **`src/data/gallery.ts`**: Rick J. Delanty's `paintings` array now lists
  "Beach Trail," "Dusk's Gentle Touch," and "A Quiet Halleluia" with new
  alt text, replacing the single "Coastal Cliffs" placeholder entry.
  Entry moved into alphabetical (by last name) position between Larry
  DeGraff and John Evans — it had been appended at the end of the array
  instead of sorted in. `name` field changed from "Rick Delanty" to
  "Rick J. Delanty" to match how he's referred to everywhere else on the
  site (Artists page, Schedule, FAQ).
- Verified in the browser at `/gallery`: all three thumbnails render under
  his section and the lightbox shows correct title/image for each.
- `npm run lint` and `npm test` pass.

---

## 2026-07-21 — Fixed Gallery Jump-Link Scroll Offset

Clicking an artist chip in the Gallery's sticky filter bar was landing a
bit past each artist's `h2`, leaving the heading partly hidden behind the
sticky bar. The hardcoded `-112` scroll offset in `scrollToArtist()`
(`src/page-components/Gallery.tsx`) no longer matched the sticky bar's
real height once it wrapped to 3 lines of chips (grew further with "Rick
J. Delanty" added).

- `scrollToArtist()` now computes the offset dynamically from the sticky
  bar's actual `offsetHeight` (layout height, unaffected by whether the
  bar is currently "stuck") plus its known `top-[72px]` sticky offset and
  a 20px gap, instead of a stale hardcoded number.
- Also targets each section's `h2` directly (was targeting the section
  element, which has extra top padding before the heading).
- Added `id="gallery-jump-bar"` to the sticky filter container so the
  offset can be measured live.
- Verified via direct DOM measurement (both from page-top and mid-scroll
  starting positions) that each `h2` now lands a clean 20px below the
  sticky bar with no overlap.
- `npm run lint` and `npm test` pass.

---

## 2026-08-04 — Google Workspace Nonprofit Approval: Charity ID, Domain Email, Social Links

Three transparency/contact updates requested by Google before Workspace
(nonprofit) approval.

- **Charity ID now displayed site-wide** — the footer's "Presented by" line
  (`src/components/SiteFooter.tsx`) now reads "Presented by the Ralston HINGE
  Creative District, a registered 501(c)(3) nonprofit. Charity ID (EIN):
  41-5038534." Since the footer renders on every page, the Charity ID is now
  explicitly shown across the whole site. Also added `taxID: "41-5038534"` to
  the Organization JSON-LD in `src/lib/schema.tsx` (alongside the existing
  `nonprofitStatus`).
- **Generic email replaced with domain email** — every user-facing instance of
  `ralstoncreativedistrict@gmail.com` swapped to `info@ralstonarts.org`:
  `FestivalContactInfo.tsx` (Festival Office contact + mailto), `schema.tsx`
  (Organization email), `faq.ts` (accessibility + sponsorship answers),
  `Contact.tsx` / `InquiryForm.tsx` / `PayPalButton.tsx` (form-failure fallback
  messages), and `Advertising.tsx` / `AdvertisingSuccess.tsx` (ad-artwork
  contact). The unrelated `@heartlandpleinair` calendar UID in `lib/ics.ts` was
  left untouched (it is not an email).
- **Social icons normalized to canonical URLs** — Facebook and Instagram links
  in `SiteFooter.tsx` and `FestivalContactInfo.tsx` now use the trailing-slash
  canonical form (`facebook.com/RalstonArts/`, `instagram.com/ralstonarts/`) to
  avoid the redirect an automated reviewer can flag. Both were verified live and
  resolve to the correct official Ralston HINGE Creative District profiles — the
  targets themselves were already correct; the reviewer likely tested a stale
  deploy. Redeploying with these changes should clear the flag.
- `npm run lint`, `npm run build`, and `npm test` all pass.

---

## 2026-08-04 — Benson Map Pin Corrected + Public Exhibition Now Ends 4 PM

Two client-requested content fixes.

- **Benson Creative District map pin moved to 60th & Maple** — the stored
  coordinates (`41.2871, -95.9750`) were reverse-geocoding to *4125 Spencer
  Street* (42nd & Spencer), and the address label read "62nd & Maple" — neither
  matched. Updated `src/data/locations.ts` to `address: "60th & Maple, Omaha,
  NE"` with corrected coordinates `41.2851, -96.0050` (geocoded from 6006 Maple
  St, Benson). The pin now lands in the Benson business district as the client
  requested.
- **Public Exhibition & Sale now ends at 4 PM** (was 5 PM), Saturday Sep 19.
  Updated every reference: the schedule event and day summary/span
  (`src/data/schedule.ts` — "11 AM – 4 PM" and day span "9 AM – 4 PM"), the
  Granary location listing (`src/data/locations.ts`), two FAQ answers
  (`src/data/faq.ts`), and two Tickets-page mentions (`Tickets.tsx`). The .ics
  calendar export derives its times from these strings (`parseTimeRange`), so it
  updates automatically — no hardcoded end time existed elsewhere.
- `npm run lint`, `npm run build`, and `npm test` all pass.

---

## 2026-08-08 — Sponsor Tiers Added to /sponsors (Platinum, Gold, Silver, Bronze)

The "Our Sponsors" section previously had only the Grant Partners logo grid plus
two empty headings ("Our Gold Sponsors", "Our Silver Sponsors"). It now renders
four complete tiers driven by data.

- **New `sponsorLevels` export** in `src/data/sponsors.ts` — 20 sponsors across
  Platinum (2), Gold (4), Silver (12), and Bronze (2), each with name and
  website URL. Bronze is flagged `nameOnly: true` because that level is
  name-only recognition by design. The original `sponsors` export (grant
  partners / media partners) is unchanged.
- **12 new logo files** copied into `public/assets/sponsors/` as WebP. Two more
  tiered sponsors reuse logos already in `public/assets/`: Art of the West
  (Platinum) and Benson Creative District (Silver).
- **`Sponsors.tsx` renders the tiers** from a `levelLayout` map that steps logo
  size down by level — Platinum `h-44/h-56`, Gold `h-36/h-44`, Silver
  `h-32/h-40` — so Platinum reads largest, as the sponsor agreements promise.
  Column count is deliberately low (Platinum and Gold 2-up, Silver 3-up at
  `lg`): several marks are very wide (United Seeds is ~13:1), and in a narrow
  column the width cap shrinks them far below the cell height, which is what
  made the first pass unreadable. Transparent margins were also trimmed off
  every logo so each fills its cell.
  Logos sit directly on the cream page background with no card or border,
  matching the Grant Partners grid above. Each links to the sponsor's site in a
  new tab.
- **Six logo files were re-cut for transparency.** Ralston Keno, Edward Jones,
  King Kong, Dayspring Bank, South O Roofing, and United Seeds shipped with
  opaque white backgrounds, which would have shown as white rectangles on the
  cream page. Each was flood-filled from its corners (tolerance 60) so only the
  *outer* white is removed — whites inside the mark (letter counters, knockouts,
  the "ROOFING" bar) survive. Edward Jones was left opaque on purpose: its whole
  canvas is the brand's yellow `#FFCC00` box, not a white background.
- **Sponsors without artwork render as their name** in the same cell footprint,
  no card — so rows stay aligned and the treatment matches the logos around
  them. Four Silver sponsors are currently in this state (see follow-ups).
- The section container widened from `max-w-3xl` to `max-w-5xl` to fit the
  4-across Gold/Silver grids; the intro copy is still capped at `max-w-3xl`.
- **"See the 2026 Sponsors →" jump target fixed.** The link pointed at
  `#grant-partners`, which skipped past the "Thank You" eyebrow and the
  "Our Sponsors" `h2` and dropped readers straight into the logo grid. It now
  targets a new `id="our-sponsors"` on the intro block, with `scroll-mt-48` to
  clear the fixed nav + countdown ribbon (measured at 157px; the eyebrow lands
  35px below it).
- **Two more sponsor logos sourced from the sponsors' own sites:** eCreamery's
  wordmark and Lovely Brewing Co.'s horizontal lockup. Lovely Brewing publishes
  *only* light-on-dark artwork — every variant on their site is cream type — so
  theirs keeps its dark plate rather than being recolored. It's the one logo on
  the page with a background.
- **Ralston Keno re-cut.** The first pass only flood-filled the outer white, so
  white remained in the enclosed counters of the letters (R, A, O) and read as
  stray white blobs on the cream. Re-derived from the original with a global
  near-white → alpha threshold plus a feathered edge, so the counters now show
  cream and the mark's white inline survives as a soft outline.
- `npm run lint`, `npm run build`, and `npm test` all pass.

- **Grant Partners logos standardized and enlarged.** They previously had no
  fixed cell and a `max-h-28` (112px) cap, so they sat unevenly and read smaller
  than the paid tiers below them. They now share a `h-56 md:h-72` cell
  (224/288px) — deliberately taller than Platinum's `h-44 md:h-56` — in the same
  two-column grid, which keeps the very wide marks (Art of the West is ~16:1) as
  large as the container allows.
  - Baked-in transparent margins were trimmed off all seven, which is most of
    the apparent size gain; several were floating inside their own padding.
  - **Sherwood Foundation was the blocker**: the file was 400×200 with only
    231×176 of content, so it could not be enlarged without visible blur. The
    foundation publishes the same vertical lockup at 1000×795, in white. That
    file is pure white with every edge antialiased in the *alpha* channel, so
    recolouring it to the near-black already on the page (`#040707`, sampled
    from the old file) is lossless — same mark, same colour, 4.5× the pixels.
  - Nebraska Arts Council (5000px) and Art of the West (3756px) were downscaled
    to 1800px — still well over 2× the ~492px slot, and it cut ~330 KB.
  - Verified in-browser: every logo's natural height vs its rendered height at
    2× DPI. All are ≥1.0 (retina-crisp) except Wiebe Ralston at 0.88 — see
    follow-ups.

- **Youth Art Show Reception moved to 5–6:30 PM** (was 6–7:30 PM) and credited
  to Applewood Hy-Vee. Updated all five places the old time appeared:
  `schedule.ts` (the Sep 12 event and the homepage highlight), `locations.ts`
  (the Baright Library map popup), and two `faq.ts` answers. Verified no
  `6–7:30` string survives anywhere — the only remaining `7:30` is an unrelated
  7:30 AM artist breakfast.
- **Per-event sponsor credit is a new capability.** `ScheduleEvent` and
  `HomepageHighlight` gained optional `sponsor` / `sponsorLogo` / `sponsorAlt` /
  `sponsorUrl` fields, rendered on both `Schedule.tsx` and `ScheduleSection.tsx`
  as "Sponsored by <name>" plus a small linked logo. The credit deliberately
  sits on the *event*, not the day — the existing day-level `logo` field is for
  creative-district branding, and hanging Hy-Vee there would have implied they
  sponsored the whole of September 12 rather than the reception. Any future
  event sponsor now just needs the four data fields.
- Hy-Vee logo added at `public/assets/sponsors/hy-vee.webp` (already
  transparent; trimmed to content).
- The .ics export derives from the time string, so it followed automatically —
  confirmed `"5 – 6:30 PM"` parses to 17:00–18:30 (the start borrows "PM" from
  the end token).

- **Tickets page jump links.** A four-up nav sits directly under the hero, one
  card per ticket type on the page — Collector VIP Pass ($125), Judge's Lecture
  Only ($25), Collectors Preview Reception ($95), Public Exhibition & Sale
  (Free) — each showing name and price. Follows the `ScheduleJumpNav` pattern
  (smooth scroll, `history.replaceState` so the URL is shareable) but is inline
  in `Tickets.tsx` alongside the existing `passBenefits` array rather than a
  separate component, since it is page-specific. The four sections gained ids
  and `scroll-mt-40`; the handler offsets by 150px to clear the fixed nav +
  countdown ribbon. Verified all four land with the section eyebrow ~113px
  below the fixed chrome.

- **Youth Paintout registration form** added to the Tickets page
  (`src/components/YouthPaintoutForm.tsx`, posting to Formspree `xzepdkyb`).
  Collects the youth's first name, last name, phone, and email — all required,
  Zod-validated client-side, with the same input/label/error styling as
  `InquiryForm`. It's a separate component rather than a reuse of `InquiryForm`
  because that one is built around name/organization/level/message and has no
  first/last split.
  - Also collects the **parent or guardian's name** (required), a **required
    participation consent** checkbox, and a **separate optional photo-release**
    checkbox. The photo release is deliberately not bundled into the required
    consent — permission to attend shouldn't be conditional on agreeing to be
    photographed, and splitting them means the Formspree record shows a real
    yes/no per registration.
  - On success it routes to `/tickets/youth-paintout/success`, matching the
    other four forms. The page uses the shared `InquirySuccess` component, with
    its `recapItems` grid carrying the day-of instructions: wear clothes that
    can get paint on them, no ticket needed (give the youth's name at the
    registration table), where/when to arrive, and a pointer to the Youth Art
    Show Reception that evening. Excluded from `sitemap.ts` like the other
    confirmation pages (comment there updated).
  - Submissions include an `event` field ("Youth Paintout — Saturday, September
    12") so the Formspree inbox is self-describing if this endpoint is ever
    reused.
  - Added as a fifth card in the ticket jump nav (grid went 4-up to 5-up).
  - The FAQ answer that says the Youth Paintout requires pre-registration now
    links to it (`/tickets#youth-paintout`). The FAQ JSON-LD already runs
    answers through `stripLinks`, so the structured data is unaffected.
  - Verified client-side validation fires on every required field without
    contacting Formspree; **no live test submission was sent.**
  - The confirmation page addresses the youth and the parent/guardian together
    rather than talking about the youth in the third person, and offers **Add to
    calendar** (.ics for the Sep 12 morning) and **Print this page**. The "Come
    back that evening" card is flagged `featured` — a new optional field on
    `InquirySuccess`'s recap items that spans the full row with a gradient,
    accent rule, and larger type, instead of being stranded alone on the last
    grid row.
  - Print styles live in `globals.css` under `@media print`: hides nav/footer/
    newsletter, forces black-on-white, neutralises the section bands and card
    fills, un-hides anything still mid-scroll-reveal, and appends URLs after
    external links.

- **`.ics` bug fixed: "Noon" didn't parse.** `parseClock` only accepted
  digits plus AM/PM, so "10 AM – Noon" fell through to the "end = start + 1h"
  fallback and the Youth Paintout exported as **10–11 AM instead of 10 AM–Noon**.
  This affected the existing "Add to calendar" button on the Schedule page too,
  not just the new one. `parseClock` now understands "Noon" and "Midnight", and
  the meridiem-borrowing step skips those words so "Noon – 5 PM" can't become
  "Noon PM". Covered by a new `src/lib/ics.test.ts` (6 cases, including both
  regressions).

**Testing note for future sessions:** scroll-reveal (`AnimatedSection` /
`useInView`) does not fire in a *background* browser tab — Chrome suspends
IntersectionObserver callbacks when `document.visibilityState === "hidden"`.
Automated screenshots of this site will come back blank unless the tab is
foregrounded or the `opacity-0`/`translate-y-10` classes are stripped first.
This is a harness artifact, not a site bug. Smooth scrolling is suppressed the
same way — `window.scrollTo({behavior: "smooth"})` silently no-ops in a hidden
tab — so use `behavior: "auto"` when verifying jump-link offsets.

---

## 2026-08-09 — Paintout Spots Listed Under Each Lunch Break Paintout

Deb's "Schedule of Events-Final updated 8-9-26" doc named the specific spots
within each creative district where the public can expect to find artists
painting. Previously the schedule named only the district.

- **New `spots` field on `ScheduleEvent`** (`src/data/schedule.ts`) — an array
  of `{ name, address?, note? }`. Kept separate from the event's own
  `location`/`address`, which still name the district as a whole, so the
  existing map links, Event schema, and .ics export are untouched.
- **Spots added to all four Lunch Break Paintouts:**
  - Mon Sep 14 (Hinge): Wildwood Park; Historic Downtown Ralston (no address
    given in the doc).
  - Tue Sep 15 (Castle & Cathedral): Joslyn Castle & Gardens; Cali Commons;
    St. Cecilia Cathedral / Cathedral Arts Project.
  - Wed Sep 16 (Benson): Ted & Wally's Parking Lot (festival info booth);
    Benson Rain Garden; Gallagher Park.
  - Thu Sep 17 (Dundee): Memorial Park Rose Garden; Dundee Business District
    Streetscape (antique street lights with hanging flower baskets).
- **Rendering** (`src/page-components/Schedule.tsx`) — spots render as an
  indented "Where to find the artists" list beneath the event's district line,
  each linked to Google Maps when it has an address, with the optional `note`
  in muted text after an em dash.
- `npm run lint`, `npm run build`, and `npm test` all pass.

**Two source discrepancies left as-is** — see follow-up 7 below.

---

## 2026-08-09 — Sponsor Logos, Section Rename, Dundee's New Logo, Youth Paintout Form

### Sponsors page

- **"Our Grant Partners" renamed to "Presented with Support From"**
  (`Sponsors.tsx`). The `id="grant-partners"` anchor was left unchanged — a
  repo-wide grep found nothing linking to it, so renaming the id would have
  been churn with no benefit.
- **Plein Air Magazine and Art of the West removed** from that grid
  (`sponsors.ts`). Their image files were deliberately left in
  `public/assets/` rather than deleted, so restoring either is a one-line
  change. **Note:** Art of the West is a Platinum-level supporter that was only
  ever shown in this grid. **Same-day follow-up:** it was then added to the
  Platinum tier, where it is now recognized. Plein Air Magazine remains
  unlisted — see follow-up 7.
- **Three Silver sponsor logos added/replaced** (all in
  `public/assets/sponsors/`):
  - `debra-joy-groesser-fine-art.webp` (1200×360) — **new**; she previously
    rendered as a name-only card. Closes half of the old follow-up 4.
  - `ecreamery.webp` (1200×237) — replaced the 1076×213 version.
  - `lovely-brew-co.webp` (1933×243) — replaces `lovely-brewing.webp`. The
    sponsor's displayed name also changed from "Lovely Brewing Co." to **"Lovely
    Brew Co."** to match their new logo and their domain (lovelybrewco.com).
    The new artwork is a transparent dark-on-light wordmark, so the old comment
    about their logo only existing as cream-on-a-dark-plate is now obsolete and
    was removed. The logo's cream "ESTABLISHED 2025 · RALSTON, NEBRASKA" tagline
    was cropped off — it is cream on a cream page background and would have been
    invisible. `lovely-brewing.webp` is left on disk, unreferenced.

### Schedule page

- **Dundee Creative District's new logo** now appears in the Thursday Sept 17
  section. Dundee supplied it as an Affinity `.af` file (unreadable without
  Affinity Designer) plus a usable WebP export; the export was the source.
  It arrived as opaque RGB on pure white, which would have shown as a white box
  on the cream card, so the white was converted to alpha with a soft edge ramp
  and the result saved as `public/assets/dundee-logo.webp` (512×180, 29 KB).
  The old `dundee-logo.png` was deleted — `schedule.ts` was its only reference.

### Tickets page

- **Youth Paintout registration form expanded to match the paper form**
  (`YouthPaintoutForm.tsx`). Added: `age`; `streetAddress` / `city` / `state` /
  `zip`; and `emergencyContactName` / `emergencyContactPhone` / `relationship`.
  All required, all wired into the Formspree POST body, all following the
  existing `field()` helper and zod validation conventions. The guardian consent
  and photo-release checkboxes were left exactly as they were.
- **"Good to Know Before You Arrive" info block added** above the form, carrying
  the non-field content from the paper version: ages 5–18, arrive by 9:45 AM,
  a guardian must stay in the park, limit 2 youth per family, art kit to keep,
  paintings framed and displayed at Baright Library.
- **Youth Art Show Reception RSVP removed** — the client confirmed no RSVP is
  needed. Removed its entry from the Tickets page `ticketOptions` jump-nav and
  removed `ticketHref`/`ticketLabel` from its `homepageHighlights` entry in
  `schedule.ts`. The event itself is untouched and still listed everywhere. No
  `ticketOffers` entry existed for it in `schema.tsx`.

`npm run lint`, `npm run build`, and `npm test` all pass. Sponsors and schedule
pages were both verified in a real browser.

---

## 2026-08-09 — Partner Removals Reached the Footer and Homepage Too (Fix)

**The bug:** deleting Plein Air Magazine and Art of the West from the `sponsors`
array earlier the same day was treated as a /sponsors-page change. It wasn't.
That array is consumed in **three** places:

1. `Sponsors.tsx` — the "Presented with Support From" grid on /sponsors
2. `SiteFooter.tsx` — the "Sponsors & Partners" strip, on **every page**
3. `SponsorsSection.tsx` — the homepage "Made Possible By" row

So both partners silently vanished site-wide, not just from the grid. Adding
Art of the West to the Platinum tier didn't bring it back either, since the
tier arrays are only rendered on /sponsors. The homepage row is also
`lg:grid-cols-7`, sized for the seven entries the array used to hold, so it
had been left short by two.

**The fix:** both entries are restored to `sponsors`, each flagged
`hideFromPartnersGrid: true`. A new exported `Partner` type carries the field,
and `Sponsors.tsx` filters on it via a module-level `partnersGrid` constant.
Net result:

| Surface | Plein Air Magazine | Art of the West |
| --- | --- | --- |
| /sponsors grid | hidden | hidden |
| /sponsors Platinum tier | — | shown |
| Site footer (all pages) | shown | shown |
| Homepage "Made Possible By" | shown | shown |

The `Partner` type's doc comment warns that deleting an entry removes that
partner from all three surfaces, and to reach for the flag instead. Verified in
a browser on /sponsors, /schedule, and the homepage; lint, build, and tests
pass.

---

## 2026-08-09 — Full-Site QA Pass and Fixes

A full QA sweep (routes, assets, links, content consistency, SEO, structured
data, accessibility) surfaced the following, all fixed here except where noted.

### Content accuracy

- **Artist count is 25, not 24.** The client confirmed Rick J. Delanty is the
  Awards Judge *and* a painting artist, so he counts toward the total. He stays
  rendered in his own section rather than moving into the `artists` array.
  `schema.tsx` now uses `artists.length + 1` so the JSON-LD reports 25 instead
  of contradicting the visible copy (it had been emitting 24 site-wide). The FAQ
  answer was rewritten from "24 … plus Awards Judge Rick J. Delanty" to "25 …
  including Awards Judge Rick J. Delanty, who both judges and paints" — the old
  phrasing would have double-counted him.
- **Open Division capacity is 40, not 30.** Corrected in
  `openDivisionQuickFacts.ts`, `OpenDivision.tsx` (×3), `OpenDivisionSuccess.tsx`,
  and the route metadata. The **$30 registration fee is unchanged** — every
  affected line reads "$30 … limited to 40 artists". PayPal amounts untouched.
  With 25 + 40, the FAQ's total is now **65** (was 64).
- **Online Exhibition and Sale moved to September 21 – October 4** per the
  client's "Schedule of Events-Final updated 8-9-26" doc (site had Sept 19 –
  Oct 2). Updated in `schedule.ts` (`dayShort`, `dayLong`, narrative), three FAQ
  answers, and the hardcoded `"Sep 19+"` jump-nav label in `Schedule.tsx`. The
  Sept 19 exhibition day itself is unchanged — only the online window moved.
- **One contact email.** `YouthPaintoutForm.tsx`'s error message pointed at
  `ralstoncreativedistrict@gmail.com` while the other eight files use
  `info@ralstonarts.org`. Normalised to `info@ralstonarts.org`, which forwards
  to that gmail.

### SEO

- **Success pages are no longer crawlable.** All five `/success` routes now set
  `robots: { index: false, follow: false }` via the App Router metadata API.
  Verified the eleven real routes remain indexable.
- **Trailing-slash mismatch fixed.** The sitemap emitted
  `https://heartlandpleinair.org/` for the root while every canonical omits the
  slash. Standardised on no trailing slash, fixed in `sitemap.ts`.

### Accessibility

- **Skip link added** (WCAG 2.4.1, Level A) — every page opened with a ten-item
  nav and no way to bypass it. `layout.tsx` renders a "Skip to main content"
  link as the first focusable element in `<body>`, `sr-only` until focused then
  visible in brand styling. The target is an `sr-only` div with `tabIndex={-1}`
  rendered by `SiteNav` immediately after `</nav>`, which is where it needs to
  be given page components own their own layout. Verified present on all 16
  routes including the success pages.
- **`/artists` heading order fixed** — it jumped h1 → h3. A real `<h2>`
  ("The 2026 Invited Artists") now introduces the roster. Order is h1 → h2 → h3
  with no skipped levels.

### Cleanup

- Deleted the orphaned `public/assets/sponsors/lovely-brewing.webp`.
- Removed the dead "Bio coming soon." fallback on `/artists` — all artists have
  bios. Bio rendering is now a plain `{active.bio && …}` guard.

### Deliberately NOT changed

- **`google.maps.Marker` deprecation** — see follow-up 7. Migrating requires a
  Cloud Console Map ID we do not have, and advanced markers fail *silently*
  without one, which would mean a map with no pins. The deprecated API is not
  scheduled for removal and still receives fixes, so the warning stays for now.

Verified: clean `.next` rebuild, `npm run lint` (no errors), `npm test` (9/9),
all 22 routes prerendered, plus curl verification of every fix above.

---

## 2026-08-09 — Google Maps Migrated to AdvancedMarkerElement

The client supplied a Map ID, unblocking the migration deferred earlier today.
`src/components/LocationsMap.tsx`:

- Loader URL now requests `libraries=marker` (required for
  `AdvancedMarkerElement`; without it `google.maps.marker` is undefined).
- The map is constructed with `mapId` from
  `NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID`.
- Markers are `AdvancedMarkerElement` with **`gmpClickable: true`** — advanced
  markers are not clickable by default, and omitting it renders pins that
  silently do nothing when clicked.
- Click handling uses the native `gmp-click` event for advanced markers
  (`addListener("click", …)` works but Google logs a warning telling you to
  switch); legacy markers keep the Maps event system.
- The day filter uses `.map` / `.position` properties instead of `setMap()` /
  `getPosition()`, via `setMarkerVisible` / `getMarkerPosition` helpers that
  handle both marker kinds.
- Click handlers are now bound once and read the current filter from a ref.
  The old code re-bound them on every filter change via `clearListeners()`,
  which is fragile against a DOM custom element.
- Markers are detached on unmount — advanced markers are real DOM nodes and
  leak more readily than legacy ones.

**Two safety nets, because advanced markers fail *silently* (pins simply never
appear) when the Map ID is missing or wrong:**

1. If `NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID` is absent at build time, the code uses
   legacy `Marker` instead. `NEXT_PUBLIC_*` vars are inlined at build time, so
   a deploy without the var set would otherwise ship a pinless map.
2. A `mapcapabilities_changed` listener detects advanced markers being
   unavailable at runtime and **rebuilds the markers as legacy ones**, logging
   a warning. The deprecation notice coming back is a far better outcome than
   an empty map.

**Verification limits — read this before trusting it.** The Maps API key is
referrer-restricted, so the map cannot render on `localhost` at all: it shows
the "Map couldn't load" fallback. This was confirmed to be **pre-existing** by
stashing the change and rebuilding — the original committed code fails the same
way locally. So this migration could NOT be visually confirmed. What was
confirmed: the build inlines both the Map ID and `libraries=marker`, the old
`google.maps.Marker` deprecation warning is gone, and Google's
`<gmp-advanced-marker>` warning appeared — proving advanced markers really were
constructed. **The pins still need eyes on them in a Vercel deploy.**

---

## 2026-08-09 — Hydration Mismatch Fixed, Plus Four Content/Layout Fixes

### Hydration mismatch (React error #418) — fixed

Every page threw a hydration error on load. Cause: **both** countdown
components computed `Date.now()` during the initial render —
`CountdownBanner.tsx` and `CountdownRibbon.tsx` (the latter is rendered by
`SiteNav` on every route except `/`). Because these pages are **statically
prerendered**, those digits were baked into the HTML at *build* time, so the
client always computed something different on hydration. React reported a text
mismatch and re-rendered the subtree.

- New shared hook `src/hooks/useCountdown.ts` returns `null` until mounted, then
  ticks every second. Both components now use it, and both got their duplicate
  copies of `getTimeLeft` deleted.
- Pre-mount the digits render as `00` with Tailwind's `invisible` rather than
  being omitted, so each box reserves its exact final width and nothing shifts
  when the first tick lands.
- `CountdownRibbon` previously called `Date.now()` again during render to decide
  whether to hide itself after the festival. That is now an `isExpired()` check
  against the hook's value, so no time is read during render at all.

Verified: the prerendered HTML now contains stable `00` placeholders instead of
build-time digits, and the console is clean across `/about`, `/schedule`, and
`/open-division`. **Note for future debugging:** an intermediate test appeared
to show the error surviving the fix — that was a browser-cached copy of the
pre-fix HTML. Cache-bust when verifying hydration changes.

`AdvertisingDeadlineBanner.tsx` and `Advertising.tsx` were checked and are
already correct — they initialise to a static `false` and update in an effect.

### Content and layout

- **The Sherwood Foundation is now linked** on the About page
  (https://sherwoodfoundation.org/), matching the plain `<a>` pattern used by
  the adjacent funder links rather than introducing `renderRichText`.
- **Sponsors intro copy fixed** — it read "the generous support of our generous
  sponsors and partners", using "generous" twice in one sentence. Now reads
  "the generous support of our sponsors and partners", with `text-pretty` added
  to prevent an orphan line (Tailwind 3.4.17 supports it).
- **Open Division "Quick Facts" cards are now equal height.** The grid does
  stretch its children, but the stretched child was the `AnimatedSection`
  wrapper — the card `div` inside it sized to its own text. Fixed with `h-full`
  on the wrapper and `flex h-full flex-col` on the card, the same pattern
  `InquirySuccess.tsx` already uses. No fixed pixel height, so longer copy
  still can't clip.
- **Youth Paintout success page updated** for the expanded form: the recap card
  now leads with "Arrive by 9:45 AM to check in" and states that a parent or
  guardian must stay in the park for the full session — the two facts a family
  most needs after registering. The calendar `.ics` description was updated to
  match.

---

## 2026-08-09 — Delanty in the Roster, Wildewood Park, Sponsors Line Break

- **Rick J. Delanty now appears in the artist roster grid** as the 25th card,
  with a "Judge of Awards" badge. The page copy says 25 artists but the grid
  showed 24, because he was only in the separate Awards Judge section — a
  visitor counting cards came up one short. The client confirmed he judges *and*
  paints, so he belongs in the roster.
  Implementation notes: a new `roster = [...artists, awardsJudge]` drives the
  grid, with the judge appended **last** so every existing index into `artists`
  (used by the bio lightbox and its prev/next controls) stays valid. His card is
  an anchor to `#awards-judge` rather than a lightbox trigger, so his full bio
  isn't duplicated in a modal and the existing "Meet This Year's Judge →" link
  still lands somewhere meaningful. The featured Awards Judge section is
  unchanged.
- **Wildwood Park → Wildewood Park**, confirmed by the client. Renamed in
  `schedule.ts` (×4), `faq.ts` (×4), `locations.ts` (name and the
  `wildewood-park` key), `Tickets.tsx`, `YouthPaintoutSuccess.tsx`, and
  `ics.test.ts`. The key was verified to have no external references before
  renaming. The park's *address* is still an open question — see follow-up 6.
- **Sponsors intro line break.** The earlier `text-pretty` wasn't enough:
  `text-wrap: pretty` only prevents single-word orphans, and this sentence was
  breaking into one full line plus a three-word tail. Swapped to `text-balance`,
  which splits it into two even lines so the break reads as deliberate.
  **Superseded later the same day — see below. The real cause was the container
  width, not the wrap algorithm.**

---

## 2026-08-09 — Wildewood Park Address Corrected, Page Headers Unified

### Wildewood Park: official address, and a map pin that was ~1 km off

The client confirmed the official address is **8000 Ralston Ave, Ralston, NE
68127**. The site had "78th & Ralston Ave." everywhere.

- Address updated in `schedule.ts` (×3, including the homepage highlight
  string), `locations.ts`, `Tickets.tsx`, `YouthPaintoutSuccess.tsx`, and
  `ics.test.ts`. Rendered as "8000 Ralston Ave., Ralston, NE" — the ZIP was
  dropped to match the house format used by every other address on the site
  (e.g. "7401 Main St., Ralston, NE"). Easy to add back if wanted.
- **The map pin was wrong, not just the label.** The stored coordinates
  (`41.2055, -96.0436`) sat up by downtown Ralston, roughly a kilometre from
  the park. Corrected to `41.1966, -96.0370`. That figure was cross-checked two
  ways before changing it: geocoding the street address returned
  `41.1959, -96.0371`, and looking up the park by name returned the park
  polygon at `41.1966, -96.0370`. Both agree; the old pin did not.

### All nine interior pages now share one header treatment

Flagged during QA as a possible inconsistency and left alone at the time. On
closer look it was **three** different treatments, not two:

| Treatment | Pages |
| --- | --- |
| Dark `bg-foreground` band | About, Schedule, Sponsors, Contact, Tickets, Open Division |
| No band at all | Artists, Gallery |
| Tinted `bg-primary/10` wash | FAQ |

Standardised on the dark band, since it was already the majority and gives the
strongest separation from the fixed nav. Artists, Gallery, and FAQ now open
with `<header className="bg-foreground pt-44 pb-16">` carrying the eyebrow and
`<h1>` in `text-secondary`, exactly like About.

Only the eyebrow and heading moved into the dark band. Each page's intro copy,
CTA links, and (on FAQ) the search field stay in a light section below, so
nothing that needs to be scannable ended up on a dark ground. FAQ keeps its
`bg-primary/10` wash for that section, which now reads as a search band rather
than a competing page header. `pt-36` was dropped from the `<main>` elements on
Artists and Gallery — it existed to clear the fixed nav, which the header's
`pt-44` now handles.

Verified: all nine interior pages emit the header class exactly once, each page
still has exactly one `<h1>`, and no page ended up with nested `<main>`.

---

## 2026-08-09 — Sponsors Intro Now Fits on One Line

Third attempt, and the first one that addressed the actual cause. The sentence
("The 2026 Heartland Plein Air Festival is made possible through the generous
support of our sponsors and partners.") needs roughly 950px at `text-lg`, but
the block was capped at `max-w-3xl` — 768px. It was never going to fit, so both
earlier attempts were tuning *how* it broke rather than stopping it breaking:
`text-pretty` did nothing (it only prevents single-word orphans), and
`text-balance` made it two even lines, which the client found worse.

Removed the `max-w-3xl` cap so the block uses the section's `max-w-6xl`
(~1104px of usable width). One line on desktop, still wrapping naturally on
narrower screens. Both wrap utilities were dropped — unnecessary once the
container is wide enough.

**Lesson for next time:** when text wraps somewhere awkward, check the
container width before reaching for `text-wrap` utilities. No wrap algorithm
can fit a 950px sentence into a 768px box.

---

## 2026-08-09 — Map Pins Re-Geocoded, Hero Top Padding Balanced

### Four of seven map pins were in the wrong place

Every pin in `locations.ts` was re-derived by geocoding its address. The
Wildewood Park correction earlier today turned out not to be isolated — the
whole Ralston cluster was systematically about 1.3 km northwest of where it
belonged:

| Location | Was off by |
| --- | --- |
| Baright Public Library | 1,324 m |
| Venues at the Granary | 1,417 m |
| Dundee Creative District | ~530 m |
| Castle & Cathedral Creative District | 393 m |
| Benson Creative District | 39 m (fine) |
| Wildewood Park | 73 m (fine — fixed earlier today) |

Ralston's true centre is about `41.2017, -96.0324`; the stored pins sat around
`41.209, -96.044`. Corrected coordinates are now geocoded values, not
estimates.

### Addresses made exact where a real address exists

- Castle & Cathedral had `"Joslyn Castle & St. Cecilia's Cathedral, Omaha, NE"`
  — two landmark names, not an address, and not geocodable. Now
  `"40th & Davenport St., Omaha, NE"`, which sits between the two.
- `"60th & Maple"` → `"60th & Maple St."`, `"50th & Underwood"` →
  `"50th & Underwood Ave."`.
- The three Creative Districts keep cross-street addresses on purpose: they are
  areas, not venues. The individual paint spots inside them already carry exact
  street addresses in `schedule.ts` (Ted & Wally's, Joslyn Castle, Gallagher
  Park, and so on).

**`schedule.ts` keeps its own copies of these addresses**, which had drifted out
of sync and were even inconsistent internally — both `"77th & Main St."` and
`"Main St. & 77th St."` were in use for the same corner. All normalised. Worth
knowing: the map pins come from `locations.ts` but the schedule listings and
Event schema come from `schedule.ts`, so a location edit needs both.

### Hero top padding

Measured rather than eyeballed. The fixed nav plus countdown ribbon is 157px
tall on desktop, and the headers used `pt-44` (176px) — leaving just **19px** of
visible space above the eyebrow against 64px of padding below it. That is what
made the heroes look cramped under the ribbon.

Now `pt-52 md:pt-56` (208px / 224px). The logo is `h-16 md:h-20`, so the nav is
141px on mobile and 157px on desktop — the responsive pair yields **67px** of
visible top space at both breakpoints, matching `pb-16`. Applied to all nine
interior page headers plus `InquirySuccess` and the 404. `Advertising.tsx` was
already an outlier at `pt-52` with no responsive step and is now in line too.

---

## Known follow-ups (not code — need your action)

1. **Finish hardening the Google Maps API key.** Website restrictions were
   added 2026-08-09: `https://heartlandpleinair.org/*`,
   `https://www.heartlandpleinair.org/*`, and `https://*.vercel.app/*`. Two
   things still worth doing:
   - `https://*.vercel.app/*` authorises **every** site hosted on vercel.app,
     not just this project — it's the usual workaround for rotating preview
     URLs, but it means a leaked key could be used by anyone on that domain.
     Compensate by setting an **API restriction** (limit the key to *Maps
     JavaScript API* only) and a **billing quota cap**. Consider removing the
     wildcard once the custom domain is the only thing that matters.
   - Add `http://localhost:8080/*` if you want the map to render during local
     development. Without it the map shows its "couldn't load" fallback on
     localhost — which is exactly what happened during the 2026-08-09 QA and
     briefly looked like a code bug.
2. **One Silver sponsor logo still missing** — Pivot at the Hinge renders as a
   plain name until artwork arrives. (Debra Joy Groesser Fine Art's logo was
   added 2026-08-09.) To add one: drop the WebP in
   `public/assets/sponsors/` and add `logo` + `alt` to that sponsor's entry in
   `src/data/sponsors.ts`. (The rest of the tier work shipped 2026-08-08.)
3. **Wiebe Ralston Foundation logo is the one file short of retina-crisp** on
   the enlarged Grant Partners row — its content is 863×402, and the slot wants
   ~984×458 at 2× DPI, so it renders at 0.88 of ideal density (a 1.14× upscale).
   Effectively invisible on a line-art mark, but it's the only one under 1.0. A
   larger source file from the foundation would close it.
4. **Nebraska Arts Council / Cultural Endowment logo is a broken composite.**
   In `public/assets/nebraska-arts-council-logo.png`, the script "Endless"
   wordmark is superimposed directly over the word "ENDOWMENT" — both are
   unreadable. The defect is baked into the source file, so it cannot be fixed
   with CSS or a re-export. This logo shows in the /sponsors grid, the footer of
   every page, and the homepage row. Ask them for a clean horizontal lockup.
5. **One small question for Deb, still unanswered.** In the 8-9-26 schedule
   doc, "The Antique Street Lights with hanging Flower Baskets" sits on its own
   line under Thursday's Dundee paintout, with no address. It was folded in as a
   `note` on the Dundee Business District Streetscape spot, on the reading that
   it describes what to paint there rather than naming a separate location. If
   it is meant to be its own stop, it needs an address in
   `schedule.ts`. Low stakes either way — the location is listed, just nested.
   (This was briefly lost when the Wildewood Park address question it was
   bundled with got resolved; re-added 2026-08-09.)
6. **Two names for the Judge's Lecture — pick one.** The same ticketed event is
   called two different things across the site:
   - "Introduction to Impressionism" — `schema.tsx` ticket offer and the
     Tickets page (×2)
   - "Judge's Lecture — Impressionism & Plein Air" — `schedule.ts`,
     `locations.ts`, and `faq.ts`
   Someone comparing the Tickets page to the Schedule page sees what reads as
   two different lectures. Not changed here because renaming an event is a
   content decision, and the offer title is also what appears on the Passage
   ticketing page. Tell me which is right and it's a quick sweep.
