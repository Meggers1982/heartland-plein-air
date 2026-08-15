'use client';
import Link from "next/link";
import LegalPage, { LegalSection, LegalList } from "@/components/LegalPage";

// ---------------------------------------------------------------------------
// NEEDS CONFIRMATION BY THE FESTIVAL — these clauses state a policy that could
// not be read off the site or the code. They were written conservatively (point
// the visitor at a human rather than promise or deny anything), but they are
// business decisions, not facts, and should be replaced with the real policy:
//
//   1. "Refunds and cancellations" — there is no stated refund window,
//      cancellation policy, or rain policy anywhere in the codebase or the FAQ.
//   2. "Photography at festival events" — the Youth Paintout form has an
//      explicit, separate photo release, but nothing covers general attendees.
//   3. "Governing law" — Nebraska is the obvious assumption for a Ralston
//      nonprofit, but it is an assumption.
//
// Everything else here describes something verifiable: PayPal handles payment,
// artists retain copyright, the schedule is weather-dependent, etc.
// ---------------------------------------------------------------------------

const OFFICE_EMAIL = "info@ralstonarts.org";

const Terms = () => (
  <LegalPage
    title="Terms of Use"
    lastUpdated="August 14, 2026"
    intro={
      <p>
        These terms cover your use of heartlandpleinair.org and your
        participation in Heartland Plein Air Festival events. By using this site
        or registering for an event, you agree to them.
      </p>
    }
  >
    <LegalSection heading="Who these terms are with">
      <p>
        The Heartland Plein Air Festival is presented by the Ralston HINGE
        Creative District, a registered 501(c)(3) nonprofit organization
        (EIN 41-5038534), 5615 S. 77th St, Ralston, NE 68127.
      </p>
    </LegalSection>

    <LegalSection heading="Using this website">
      <p>
        You may browse this site, and share or print its pages for your own
        non-commercial use. Please don&rsquo;t copy it wholesale, scrape it, or
        republish it as your own.
      </p>
      <p>
        <strong>Artwork shown on this site remains the property of the artist
        who made it.</strong> Paintings, photographs of paintings, and artist
        images are used here with permission and are not licensed for reuse.
        Festival names, logos, and branding belong to the Ralston HINGE Creative
        District.
      </p>
    </LegalSection>

    <LegalSection heading="Tickets, registration, and payment">
      <p>
        Tickets and entry fees are sold through PayPal. Your order is confirmed
        when payment completes and you receive a confirmation; until then, a
        space is not reserved. Prices are in U.S. dollars.
      </p>
      <p>
        Registration information must be accurate — particularly emergency
        contact details for events involving minors, where we rely on it.
      </p>
    </LegalSection>

    <LegalSection heading="Refunds and cancellations">
      <p>
        If the festival cancels a ticketed event outright, we will contact
        everyone who registered to arrange a refund or a transfer.
      </p>
      <p>
        For any other refund or transfer request, contact the festival office at{" "}
        <a href={`mailto:${OFFICE_EMAIL}`} className="underline hover:text-primary">
          {OFFICE_EMAIL}
        </a>{" "}
        or (402) 592-6552 and we will work it out with you directly.
      </p>
    </LegalSection>

    <LegalSection heading="Sponsorships and advertising">
      <p>
        Sponsorship levels, benefits, and advertising specifications are
        described on the{" "}
        <Link href="/sponsors" className="underline hover:text-primary">
          Sponsors
        </Link>{" "}
        and{" "}
        <Link href="/advertising" className="underline hover:text-primary">
          Advertising
        </Link>{" "}
        pages. Placement of logos and ads depends on materials arriving by the
        stated deadlines and in the stated formats. Where a signed sponsorship
        agreement exists, that agreement governs.
      </p>
    </LegalSection>

    <LegalSection heading="Artwork and sales">
      <p>
        Paintings are created during the festival week and shown at the public
        exhibition. Work displayed in the online gallery is the artists&rsquo;
        existing portfolio work, shown to introduce them — it is not the festival
        collection and is not for sale here.
      </p>
      <p>
        Copyright in every painting stays with the artist, including after a sale
        — buying a painting does not transfer the right to reproduce it. For how
        purchasing works, see the{" "}
        <Link href="/faq" className="underline hover:text-primary">
          FAQ
        </Link>
        .
      </p>
    </LegalSection>

    <LegalSection heading="Attending festival events">
      <p>
        Artists paint at public and host-provided locations across the Omaha
        metro. When you visit:
      </p>
      <LegalList>
        <li>
          Follow the rules of the location you are on — parks, businesses, and
          private hosts each have their own.
        </li>
        <li>
          Give artists room to work. The{" "}
          <Link href="/faq" className="underline hover:text-primary">
            FAQ
          </Link>{" "}
          explains what to expect when approaching one.
        </li>
        <li>Supervise children in your care.</li>
        <li>
          You take part at your own risk. These are outdoor events in ordinary
          public spaces.
        </li>
      </LegalList>
    </LegalSection>

    <LegalSection heading="Photography at festival events">
      <p>
        Festival events are public, and photographs and video may be taken at
        them for news coverage and festival promotion. If you would prefer not to
        appear, tell a photographer or a festival volunteer at the event, or
        contact the office afterward and we will do our best to accommodate you.
      </p>
      <p>
        Youth Paintout participants are covered separately: that registration
        includes its own optional photo release, which a parent or guardian can
        decline without affecting registration. See the{" "}
        <Link href="/privacy" className="underline hover:text-primary">
          Privacy Policy
        </Link>
        .
      </p>
    </LegalSection>

    <LegalSection heading="Weather and schedule changes">
      <p>
        This is an outdoor festival. Painting locations, times, and events may
        change or be cancelled for weather, safety, or venue reasons. The{" "}
        <Link href="/schedule" className="underline hover:text-primary">
          Schedule
        </Link>{" "}
        page carries the current plan; check it before setting out.
      </p>
    </LegalSection>

    <LegalSection heading="Other sites and services">
      <p>
        This site links to and relies on services we don&rsquo;t control —
        PayPal, Google Maps, sponsor and artist websites, and social media. Their
        own terms and privacy policies apply when you use them.
      </p>
    </LegalSection>

    <LegalSection heading="Accuracy and liability">
      <p>
        We work to keep this site accurate, but details change — especially
        schedules and locations. The site is provided as-is, without warranties.
        To the fullest extent allowed by law, the Ralston HINGE Creative
        District is not liable for indirect or consequential losses arising from
        use of this site or attendance at a free public event.
      </p>
      <p>Nothing here limits any liability that cannot be limited by law.</p>
    </LegalSection>

    <LegalSection heading="Governing law">
      <p>These terms are governed by the laws of the State of Nebraska.</p>
    </LegalSection>

    <LegalSection heading="Changes to these terms">
      <p>
        We may update these terms. The revised version will be posted here with a
        new &ldquo;last updated&rdquo; date.
      </p>
    </LegalSection>

    <LegalSection heading="Contact us">
      <p>
        Questions about these terms? Email{" "}
        <a href={`mailto:${OFFICE_EMAIL}`} className="underline hover:text-primary">
          {OFFICE_EMAIL}
        </a>
        , call (402) 592-6552, or use the{" "}
        <Link href="/contact" className="underline hover:text-primary">
          contact form
        </Link>
        .
      </p>
    </LegalSection>
  </LegalPage>
);

export default Terms;
