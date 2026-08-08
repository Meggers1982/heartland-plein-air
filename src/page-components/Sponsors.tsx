'use client';
import { useEffect } from "react";
import { Check } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import BrushStrokeDivider from "@/components/BrushStrokeDivider";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import NewsletterCTA from "@/components/NewsletterCTA";
import BackToTop from "@/components/BackToTop";
import InquiryForm from "@/components/InquiryForm";
import SponsorPaymentForm from "@/components/SponsorPaymentForm";
import { setPageMeta } from "@/lib/meta";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { sponsors, sponsorLevels } from "@/data/sponsors";
import { sponsorTiers } from "@/data/sponsorTiers";

// Logo size steps down by level — Platinum reads largest, Bronze is name-only.
// Column count matters as much as cell height: several logos are very wide
// (United Seeds is ~13:1), so a narrow column caps their width and shrinks them
// well below the cell height. Keeping columns few keeps every mark readable.
// `name` sizes the text used for sponsors who have no logo file — it has to
// hold its own next to the logos in the same grid, so it steps down by level
// alongside the artwork rather than sitting at body size.
const levelLayout = {
  "platinum-sponsors": {
    grid: "sm:grid-cols-2",
    cell: "h-44 md:h-56",
    name: "text-2xl md:text-3xl",
  },
  "gold-sponsors": {
    grid: "sm:grid-cols-2",
    cell: "h-36 md:h-44",
    name: "text-xl md:text-2xl",
  },
  "silver-sponsors": {
    grid: "sm:grid-cols-2 lg:grid-cols-3",
    cell: "h-32 md:h-40",
    name: "text-lg md:text-2xl",
  },
  "bronze-sponsors": {
    grid: "sm:grid-cols-2 lg:grid-cols-3",
    cell: "h-16",
    name: "text-lg md:text-xl",
  },
};

const namedOpportunities = [
  {
    title: "Artist Awards — Professional Artists",
    description:
      "Best of Show $4,000 · 2nd Place $2,000 · 3rd Place $1,000. Best of the Creative Districts (Ralston, Dundee, Benson, Castle & Cathedral) — $500 each. Best Ralston Historical Building — $500 (sponsored by Ralston Archives Museum). Three Honorable Mentions at $250 each.",
  },
  {
    title: "Artist Awards — Open Category",
    description:
      "1st Place $500 · 2nd Place $300 · 3rd Place $200. Three Honorable Mentions at $100 each.",
  },
  {
    title: "Collectors Gala Reception",
    description:
      "Sponsor the festival's signature collector event, up to $10,000.",
  },
  {
    title: "Advertising",
    description: "Provide matching funds for the festival's advertising grant.",
  },
  {
    title: "General Support",
    description:
      "Support the 2026 or 2027 Plein Air Festival, or future Creative District events.",
  },
];

const Sponsors = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Sponsor the Plein Air Festival: Put Your Name on It";
    return setPageMeta(
      "Support the Heartland Plein Air Festival. Sponsorship levels from $100 to $5,000+, with logo placement, catalog ads, and VIP passes. 501(c)(3) org.",
    );
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [breadcrumbSchema([{ name: "Sponsors", path: "/sponsors" }])],
        }}
      />
      <SiteNav />

      <header className="bg-foreground pt-44 pb-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
            Partners & Support
          </p>
          <h1 className="font-display text-5xl font-bold leading-tight text-secondary md:text-6xl">
            Sponsors
          </h1>
        </div>
      </header>

      {/* Become a Sponsor */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Get Involved
              </p>
              <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground">
                Become a Sponsor
              </h2>
              <p className="mb-4 font-body text-lg leading-relaxed text-foreground/85">
                Sponsoring the Heartland Plein Air Festival puts your organization alongside nationally recognized artists and a growing collector community. Choose the level that fits — you'll be recognized in signage, social media, advertising, and the show catalog as noted below.
              </p>
              <a
                href="#our-sponsors"
                className="mb-14 inline-block font-body text-sm font-semibold uppercase tracking-widest text-primary hover:underline"
              >
                See the 2026 Sponsors →
              </a>
            </div>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sponsorTiers.map((tier, i) => (
              <AnimatedSection key={tier.name} delay={i * 80} className="h-full">
                <div className="flex h-full flex-col rounded-lg bg-card p-8 shadow-sm">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <tier.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="mb-1 font-display text-xl font-semibold text-foreground">
                    {tier.name}
                  </h3>
                  <p className="mb-4 font-body text-sm font-semibold uppercase tracking-wide text-primary">
                    {tier.price}
                  </p>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2">
                        <Check
                          className="mt-1 h-4 w-4 flex-shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span className="font-body text-sm leading-relaxed text-foreground/85">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={200}>
            <div className="mx-auto mt-12 max-w-3xl rounded-lg border border-border bg-card p-8 md:p-12">
              <div className="mb-8 text-center">
                <p className="mb-2 font-body text-lg font-semibold text-foreground">
                  Ready to sponsor the festival?
                </p>
                <p className="font-body text-base leading-relaxed text-muted-foreground">
                  Fill out the form below to choose a level and become a sponsor. The Ralston Hinge Creative District is a 501(c)(3) nonprofit organization.
                </p>
              </div>
              <InquiryForm
                formspreeEndpoint="https://formspree.io/f/xykqbjnp"
                successHref="/sponsors/success"
                levelLabel="Sponsorship Level"
                levelOptions={[
                  ...sponsorTiers.map((tier) => `${tier.name} (${tier.price})`),
                  "Award / Event Sponsorship",
                  "Not sure yet — general inquiry",
                ]}
                submitLabel="Submit Sponsorship Inquiry"
                successTitle="Inquiry sent"
                successMessage="Thanks for your interest in sponsoring the festival — we'll follow up soon."
              />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={280}>
            <div className="mx-auto mt-6 max-w-2xl rounded-lg border border-border bg-card p-6 shadow-sm md:p-8">
              <p className="mb-6 text-center font-body text-base font-semibold uppercase tracking-wide text-foreground">
                Already Committed? Pay Your Sponsorship Online
              </p>
              <SponsorPaymentForm />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <BrushStrokeDivider />

      {/* Sponsorship Opportunities */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedSection>
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Designated Giving
            </p>
            <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground">
              Award & Event Sponsorships
            </h2>
            <p className="mb-10 font-body text-lg leading-relaxed text-foreground/85">
              Prefer to support something specific? These named sponsorships fund a particular award, event, or initiative.
            </p>
          </AnimatedSection>
          <div className="space-y-4">
            {namedOpportunities.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 80}>
                <div className="rounded-lg bg-card p-6 shadow-sm">
                  <h3 className="mb-1 font-display text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-foreground/85">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <BrushStrokeDivider />

      {/* Sponsors */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <AnimatedSection>
            {/* scroll-mt clears the fixed nav + countdown ribbon (~157px) so
                the "Thank You" eyebrow isn't tucked under them on jump. */}
            <div id="our-sponsors" className="max-w-3xl scroll-mt-48">
              <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Thank You
              </p>
              <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground">
                Our Sponsors
              </h2>
              <p className="mb-10 font-body text-lg leading-relaxed text-foreground/85">
                The 2026 Heartland Plein Air Festival is made possible through the generous support of our generous sponsors and partners.
              </p>
            </div>
            <h3
              id="grant-partners"
              className="mb-6 scroll-mt-32 font-display text-2xl font-semibold text-foreground"
            >
              Our Grant Partners
            </h3>
            <div className="grid gap-6 sm:grid-cols-2">
              {sponsors.map((sponsor) =>
                sponsor.logo ? (
                  <div
                    key={sponsor.name}
                    className="flex items-center justify-center px-6 py-4"
                  >
                    {sponsor.url ? (
                      <a
                        href={sponsor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={sponsor.name}
                        className="flex items-center justify-center transition-opacity hover:opacity-80"
                      >
                        <img
                          src={sponsor.logo}
                          alt={sponsor.alt}
                          className="max-h-28 w-auto max-w-full object-contain"
                        />
                      </a>
                    ) : (
                      <img
                        src={sponsor.logo}
                        alt={sponsor.alt}
                        className="max-h-28 w-auto max-w-full object-contain"
                      />
                    )}
                  </div>
                ) : (
                  <div
                    key={sponsor.name}
                    className="flex items-center justify-center rounded-lg border border-border bg-card px-6 py-8 text-center"
                  >
                    <p className="font-display text-base font-semibold text-foreground">
                      {sponsor.name}
                    </p>
                  </div>
                ),
              )}
            </div>
          </AnimatedSection>

          {sponsorLevels.map((level) => {
            const layout = levelLayout[level.id];
            return (
              <AnimatedSection key={level.id}>
                <h3
                  id={level.id}
                  className="mb-6 mt-14 scroll-mt-32 font-display text-2xl font-semibold text-foreground"
                >
                  Our {level.name}
                </h3>
                <div className={`grid gap-6 ${layout.grid}`}>
                  {level.sponsors.map((sponsor) => {
                    const showLogo = !level.nameOnly && sponsor.logo;
                    const content = showLogo ? (
                      <img
                        src={sponsor.logo}
                        alt={sponsor.alt}
                        loading="lazy"
                        className="max-h-full w-auto max-w-full object-contain"
                      />
                    ) : (
                      <p
                        className={`text-center font-display font-semibold leading-snug text-foreground ${layout.name}`}
                      >
                        {sponsor.name}
                      </p>
                    );
                    // Logos and names both sit directly on the page background,
                    // matching the Grant Partners grid above — no cards.
                    const cardClass = `flex ${layout.cell} items-center justify-center px-4 py-4 sm:px-6`;

                    return sponsor.url ? (
                      <a
                        key={sponsor.name}
                        href={sponsor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={sponsor.name}
                        className={`${cardClass} transition-opacity hover:opacity-80`}
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={sponsor.name} className={cardClass}>
                        {content}
                      </div>
                    );
                  })}
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      <NewsletterCTA />
      <SiteFooter />
      <BackToTop />
    </div>
  );
};

export default Sponsors;
