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

## 2026-07-21 — Replaced Rick Delanty's Gallery Painting

Swapped the single placeholder painting under Rick Delanty (Awards Judge)
on the Gallery page for three real pieces supplied by the user.

- Converted 3 source JPEGs to WebP (`quality=90`) and added to
  `public/artwork/`: `rick-delanty-beach-trail.webp`,
  `rick-delanty-dusks-gentle-touch.webp`,
  `rick-delanty-a-quiet-halleluia.webp`. Removed the old placeholder
  `rick-delanty-coastal-cliffs.webp`.
- **`src/data/gallery.ts`**: Rick Delanty's `paintings` array now lists
  "Beach Trail," "Dusk's Gentle Touch," and "A Quiet Halleluia" with new
  alt text, replacing the single "Coastal Cliffs" placeholder entry.
- Verified in the browser at `/gallery`: all three thumbnails render under
  the Rick Delanty section and the lightbox shows correct title/image for
  each.
- `npm run lint` and `npm test` pass.

---

## Known follow-ups (not code — need your action)

1. **Activate Formspree forms** — submit one test through each of the 5 forms
   listed in §8 and confirm via the email Formspree sends.
2. **Google Maps referrer allowlist** — add production/preview domains in
   Google Cloud Console (see §9), and confirm the key is restricted to
   `heartlandpleinair.org/*`. This is the actual mitigation for the exposed
   key — see the 2026-07-12 entry above for why rewriting git history
   wouldn't help.
3. **Add sponsor logos** for the new "Our Gold Sponsors" and "Our Silver
   Partners" sections on `/sponsors` — headings exist, no logos yet.
4. One lower-priority item flagged during the QA sweep but intentionally
   left alone (a judgment call, not a bug): Artists/Gallery pages use a
   lighter page-header style than the other 5 interior pages (no dark
   `bg-foreground` band) — flagged as a possible site-wide inconsistency,
   but plausibly intentional for image-heavy pages, so left as a design
   decision rather than unilaterally changed.
