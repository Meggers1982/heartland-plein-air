# Heartland Plein Air Festival Website — Update Summary

Over this work session, we made a substantial round of improvements to the
festival website — new pages, working forms, sponsor visibility, and a
thorough pass to make sure the site works well for every visitor and shows up
properly in search results. Here's what changed and what's still needed from
your end.

## New pages for sponsors, advertisers, and Open Division artists

The site now has a complete **Advertising** page laying out your catalog ad
options — full, half, and quarter-page pricing, exact sizing, file specs, the
July 15th submission deadline, and where to mail payment. It's reachable from
a dropdown under "About" in the main menu, so it doesn't clutter the primary
navigation but is easy to find.

The **Sponsors** page got a full rebuild: real sponsorship levels (Titanium
down to Friend of the District) with actual pricing and benefits pulled from
your sponsorship materials, plus a separate section for named opportunities
like the Artist Awards and the Collectors Gala. All seven current sponsor and
partner logos — PleinAir Magazine, Art of the West, Visit Nebraska, Wiebe
Ralston Foundation, Ralston Archives Museum, Nebraska Arts Council, and the
Sherwood Foundation — are displayed properly (no more placeholder boxes), and
each one links out to the sponsor's own website.

The **Open Division** page, which previously just said "registration coming
soon," now has a real registration form artists can actually fill out.

## Every form on the site now actually works

This is the big one: before this session, **every form on the site was
decorative.** The contact form, the newsletter signup, the sponsorship
inquiry — they all showed a friendly "thanks!" message when someone clicked
submit, but nothing was ever actually sent anywhere. No one was getting these
messages.

That's now fixed. Five forms across the site are wired up and will deliver
real submissions once you complete one quick activation step (see below):

- The general **Contact form**, now with a dropdown so people can flag
  whether they're asking about Sponsorship, Advertising, Tickets, or a
  General Question — makes it easier to route inquiries to the right person.
- The **Sponsorship inquiry form** on the Sponsors page.
- The **Ad reservation form** on the Advertising page.
- The **Open Division registration form**.
- The **newsletter signup**, both the big homepage version and the small one
  in the footer.

The three inquiry forms (Sponsorship, Advertising, Open Division) also now
send people to a proper "thank you" page after they submit, which reminds
them of the pricing they selected and gives them your contact info again in
case they have questions.

We used a service called Formspree to power all of this, rather than a
free option like Google Apps Script. Formspree was the easier build with a
generous free tier, but the real reason is reliability: a script-based
approach can quietly break — say, if Google changes something on their end —
and you'd have no way of knowing submissions had stopped coming in until a
sponsor or artist mentioned they never heard back. Formspree is a dedicated
service built for exactly this, so it's much less likely to fail silently.
The free tier we're on now is plenty to start, but if the festival's form
volume grows, it may be worth moving to a paid Formspree plan — the main
benefit being that submissions can then flow automatically into a Google
Sheet, rather than just landing in an inbox one at a time.

## Sponsors are visible everywhere they should be

Sponsor logos previously only appeared, inconsistently, in one or two spots.
Now the same set of real logos shows up consistently: on the dedicated
Sponsors page, in the homepage's "Made Possible By" section (which was
actually showing entirely made-up placeholder companies before — that's been
replaced with your real sponsors), and in the site footer. The Ralston HINGE
Creative District logo in the footer now links back to ralstonarts.org.

## Schedule accuracy

The homepage's condensed schedule and the full Schedule page were pulling
from two separate lists that could quietly drift out of sync if one got
updated and the other didn't. They now both read from the same source, so a
date or detail only ever needs to be corrected in one place. We also added
the district logos (Ralston Hinge, Castle & Cathedral, Benson, Dundee) to the
full schedule page's day-by-day cards to match the homepage.

## Made sure the site works well for everyone

We ran a full accessibility and design-consistency pass across every page.
In plain terms: we fixed several spots where text color didn't have enough
contrast against its background to be comfortably readable (including your
brand orange in a few places), made sure every image has a proper description
for visitors using screen readers, fixed dropdown menus that were missing
their little arrow icon, and corrected a bug where holding Ctrl or Cmd while
clicking a nav link wouldn't open it in a new tab like it's supposed to.

We also caught and fixed a stale leftover from the old website platform: a
few pages were still telling search engines their "official" address was the
old Lovable-hosted site instead of heartlandpleinair.org, which could have
hurt your search rankings.

## Behind-the-scenes search engine health

A few technical improvements that won't be visible on the page but matter for
how the site performs in Google and when links are shared on social media:

- Added a sitemap (a directory of every real page on the site) so search
  engines can find and index everything more reliably.
- Fixed the site's "rich preview" data — the structured information Google
  and Facebook read to show festival dates, location, and pricing directly in
  search results — which had a wrong phone number and address left over from
  an earlier draft.
- Fixed a bug where links to the site shared on Facebook or Twitter showed no
  preview image at all. They now show the festival hero photo.

## The Google Maps section on the homepage

The interactive map showing painting locations was failing silently — it
just showed a blank box with no explanation. We fixed the site so it now
shows a friendly fallback message and the list of locations if the map can't
load, instead of just being empty. The underlying cause is a setting in your
Google account (see below) that needs your attention to fully resolve.

---

## What we need from you

1. **Activate the forms.** Each form uses a service called Formspree to
   deliver submissions to your inbox. As a one-time security step, Formspree
   requires the account owner to confirm the *first* submission to each form
   by clicking a link in an email — this can't be done on our end. Please
   submit one test message through each of the five forms (Contact,
   Sponsorship, Advertising, Open Division, and the newsletter signup) and
   click the confirmation email for each so future submissions come through
   automatically.

2. **Google Maps settings.** In your Google Cloud account, the map's API key
   needs your website's domain added to its allowed list, and billing/the
   Maps service needs to be confirmed active. Happy to walk through this
   together if useful.

3. **Security housekeeping.** Your Google Maps key is currently stored in a
   file that's visible in the site's project history, which isn't ideal from
   a security standpoint. We'd recommend generating a fresh key and retiring
   the old one — again, happy to help with this whenever it's convenient.

Everything above is already live on the site. Let us know if you'd like a
walkthrough of any of it.
