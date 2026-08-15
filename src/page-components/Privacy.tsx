'use client';
import Link from "next/link";
import LegalPage, { LegalSection, LegalList } from "@/components/LegalPage";

// Every factual claim here was checked against the code rather than assumed:
// the form field lists come from the `formConfig` documents in Sanity, the
// analytics IDs from src/app/layout.tsx, and the org details from
// SiteFooter/FestivalContactInfo. If a form gains or loses a field, or a new
// third-party script is added, this page needs updating to match.

const OFFICE_EMAIL = "info@ralstonarts.org";

const Privacy = () => (
  <LegalPage
    title="Privacy Policy"
    lastUpdated="August 14, 2026"
    intro={
      <p>
        This policy explains what personal information heartlandpleinair.org
        collects, why, who it is shared with, and the choices you have. It covers
        this website only — not other sites we link to.
      </p>
    }
  >
    <LegalSection heading="Who we are">
      <p>
        The Heartland Plein Air Festival is presented by the Ralston HINGE
        Creative District, a registered 501(c)(3) nonprofit organization
        (EIN 41-5038534).
      </p>
      <p>
        5615 S. 77th St, Ralston, NE 68127
        <br />
        (402) 592-6552
        <br />
        <a href={`mailto:${OFFICE_EMAIL}`} className="underline hover:text-primary">
          {OFFICE_EMAIL}
        </a>
      </p>
    </LegalSection>

    <LegalSection heading="Information you give us">
      <p>
        We collect information only when you choose to send it through one of the
        forms on this site. Each form and what it asks for:
      </p>
      <LegalList>
        <li>
          <strong>Newsletter signup</strong> (site footer) — your email address.
        </li>
        <li>
          <strong>Contact form</strong> — name, email, topic, subject, and your
          message.
        </li>
        <li>
          <strong>Sponsorship inquiry</strong> — name, organization or business
          name, email, phone, sponsorship level, and message.
        </li>
        <li>
          <strong>Advertising inquiry</strong> — name, organization or business
          name, email, phone, ad size, and message.
        </li>
        <li>
          <strong>Open Division registration</strong> — name, street address,
          city, state, ZIP code, email, phone, primary medium, and message.
        </li>
        <li>
          <strong>Youth Paintout registration</strong> — the youth&rsquo;s first
          and last name and age; street address, city, state, and ZIP code;
          phone; email address; parent or guardian name; and an emergency
          contact&rsquo;s name, phone, and relationship to the student. See{" "}
          <a href="#childrens-information" className="underline hover:text-primary">
            Children&rsquo;s information
          </a>{" "}
          below.
        </li>
      </LegalList>
      <p>
        Form submissions are delivered to the festival office by Formspree, a
        third-party form processing service, and arrive as email.
      </p>
    </LegalSection>

    <LegalSection heading="Information collected automatically">
      <p>When you visit, some information is collected without you entering it:</p>
      <LegalList>
        <li>
          <strong>Google Analytics 4</strong> (measurement ID G-BQ1HV47WKM) —
          which pages you visit, approximate location, device and browser type,
          and how you arrived. It sets cookies.
        </li>
        <li>
          <strong>Meta Pixel</strong> (ID 1819681512327549) — records page views
          so we can measure our advertising. We have deliberately turned off
          Meta&rsquo;s automatic advanced matching, which means it does{" "}
          <strong>not</strong> read values you type into forms on this site.
        </li>
        <li>
          <strong>Standard web server logs</strong>, including IP address, kept
          by our host for security and reliability.
        </li>
      </LegalList>
      <p>
        This site does not currently display a cookie consent banner. You can
        control or block cookies through your browser settings, and use the
        opt-outs listed under{" "}
        <a href="#your-choices" className="underline hover:text-primary">
          Your choices
        </a>
        .
      </p>
    </LegalSection>

    <LegalSection heading="Maps">
      <p>
        Pages that show painting locations embed Google Maps. Google may collect
        information about your use of the map under its own privacy policy.
      </p>
    </LegalSection>

    <LegalSection heading="Payments">
      <p>
        Ticket purchases, sponsorship payments, and Open Division entry fees are
        processed by PayPal. Payment happens on PayPal&rsquo;s systems — we never
        receive or store your card number. PayPal provides us the transaction
        details needed to confirm and fulfill your order.
      </p>
    </LegalSection>

    <section id="childrens-information" className="scroll-mt-32">
      <LegalSection heading="Children's information">
        <p>
          The Youth Paintout registration form collects personal information
          about a minor. It is intended to be completed by a parent or legal
          guardian, who must give permission for the youth to take part.
        </p>
        <p>
          We use this information only to run the Youth Paintout — confirming
          registration, planning staffing and supervision, and reaching a parent,
          guardian, or emergency contact if we need to during the event. We do
          not use it for advertising, and we do not sell it.
        </p>
        <p>
          <strong>The photo release is separate and optional.</strong>{" "}
          Registration does not depend on agreeing to it. If you do agree,
          photographs taken at the event that include your child may be used in
          festival promotion. You can withdraw that permission at any time by
          contacting us, and we will stop using those images going forward.
        </p>
        <p>
          A parent or guardian may ask us what information we hold about their
          child, correct it, or ask us to delete it. Email{" "}
          <a href={`mailto:${OFFICE_EMAIL}`} className="underline hover:text-primary">
            {OFFICE_EMAIL}
          </a>{" "}
          or call the festival office.
        </p>
      </LegalSection>
    </section>

    <LegalSection heading="How we use your information">
      <LegalList>
        <li>To answer your questions and respond to inquiries.</li>
        <li>
          To process registrations, sponsorships, advertising, and ticket orders.
        </li>
        <li>To run festival events safely, including emergency contact.</li>
        <li>
          To send festival news and updates, if you asked for them. Every email
          includes an unsubscribe link.
        </li>
        <li>
          To understand how the site is used and measure our advertising, in
          aggregate.
        </li>
      </LegalList>
    </LegalSection>

    <LegalSection heading="Who we share it with">
      <p>
        <strong>We do not sell your personal information.</strong> We share it
        only with service providers who help us operate, and only as needed:
      </p>
      <LegalList>
        <li>Formspree — delivers form submissions to us.</li>
        <li>Google — analytics and maps.</li>
        <li>Meta — advertising measurement.</li>
        <li>PayPal — payment processing.</li>
        <li>
          Festival staff and volunteers who need it to run an event you have
          registered for.
        </li>
      </LegalList>
      <p>
        We may also disclose information if required by law, or to protect the
        safety of participants.
      </p>
    </LegalSection>

    <LegalSection heading="How long we keep it">
      <p>
        Inquiry and registration information is kept as long as needed for the
        event and our nonprofit records, then deleted or archived. Newsletter
        subscriptions are kept until you unsubscribe. You can ask us to delete
        your information sooner.
      </p>
    </LegalSection>

    <section id="your-choices" className="scroll-mt-32">
      <LegalSection heading="Your choices">
        <LegalList>
          <li>
            <strong>Email:</strong> use the unsubscribe link in any newsletter,
            or email us and we will remove you.
          </li>
          <li>
            <strong>Analytics:</strong> install Google&rsquo;s{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              Analytics opt-out browser add-on
            </a>
            .
          </li>
          <li>
            <strong>Advertising:</strong> adjust your{" "}
            <a
              href="https://www.facebook.com/adpreferences"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              Meta ad preferences
            </a>
            .
          </li>
          <li>
            <strong>Cookies:</strong> block or clear them in your browser
            settings.
          </li>
          <li>
            <strong>Access, correction, or deletion:</strong> email{" "}
            <a href={`mailto:${OFFICE_EMAIL}`} className="underline hover:text-primary">
              {OFFICE_EMAIL}
            </a>
            .
          </li>
        </LegalList>
      </LegalSection>
    </section>

    <LegalSection heading="Changes to this policy">
      <p>
        If this policy changes, we will post the revised version here and update
        the &ldquo;last updated&rdquo; date at the top.
      </p>
    </LegalSection>

    <LegalSection heading="Contact us">
      <p>
        Questions about this policy, or about information we hold? Email{" "}
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

export default Privacy;
