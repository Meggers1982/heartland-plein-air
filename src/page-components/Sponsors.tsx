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
import { setPageMeta } from "@/lib/meta";
import { sponsors } from "@/data/sponsors";
import { sponsorTiers } from "@/data/sponsorTiers";

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
    document.title = "Sponsors | Heartland Plein Air Festival";
    return setPageMeta(
      "Support the Heartland Plein Air Festival — sponsor the event or advertise in the catalog.",
    );
  }, []);

  return (
    <div className="min-h-screen bg-background">
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
                href="#grant-partners"
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
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection>
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Thank You
            </p>
            <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground">
              Our Sponsors
            </h2>
            <p className="mb-10 font-body text-lg leading-relaxed text-foreground/85">
              The 2026 Heartland Plein Air Festival is made possible through the generous support of our generous sponsors and partners.
            </p>
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

            <h3 className="mb-6 mt-14 font-display text-2xl font-semibold text-foreground">
              Our Gold Sponsors
            </h3>

            <h3 className="mb-6 mt-14 font-display text-2xl font-semibold text-foreground">
              Our Silver Partners
            </h3>
          </AnimatedSection>
        </div>
      </section>

      <NewsletterCTA />
      <SiteFooter />
      <BackToTop />
    </div>
  );
};

export default Sponsors;
