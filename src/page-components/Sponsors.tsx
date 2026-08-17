'use client';
import { useEffect } from "react";
import { Check } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import BrushStrokeDivider from "@/components/BrushStrokeDivider";
import SiteNav from "@/components/SiteNav";
import NewsletterCTA from "@/components/NewsletterCTA";
import BackToTop from "@/components/BackToTop";
import InquiryForm from "@/components/InquiryForm";
import SponsorPaymentForm from "@/components/SponsorPaymentForm";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { getIcon } from "@/sanity/lib/iconMap";
import { urlFor } from "@/sanity/lib/image";
import type { SponsorTierWithSponsors, Sponsor } from "@/sanity/queries/sponsors";
import type { FormConfig } from "@/sanity/queries/formConfig";
import type { ContactInfo, SponsorsPage } from "@/sanity/queries/pages";

// Logo size steps down by level — Platinum reads largest, Bronze is name-only.
// Column count matters as much as cell height: several logos are very wide
// (United Seeds is ~13:1), so a narrow column caps their width and shrinks them
// well below the cell height. Keeping columns few keeps every mark readable.
// `name` sizes the text used for sponsors who have no logo file — it has to
// hold its own next to the logos in the same grid, so it steps down by level
// alongside the artwork rather than sitting at body size.
const levelLayout: Record<string, { grid: string; cell: string; name: string }> = {
  Platinum: {
    grid: "sm:grid-cols-2",
    cell: "h-44 md:h-56",
    name: "text-2xl md:text-3xl",
  },
  Gold: {
    grid: "sm:grid-cols-2",
    cell: "h-36 md:h-44",
    name: "text-xl md:text-2xl",
  },
  Silver: {
    grid: "sm:grid-cols-2 lg:grid-cols-3",
    cell: "h-32 md:h-40",
    name: "text-lg md:text-2xl",
  },
  Bronze: {
    grid: "sm:grid-cols-2 lg:grid-cols-3",
    cell: "h-16",
    name: "text-lg md:text-xl",
  },
};


const Sponsors = ({
  funders,
  sponsorTiers,
  inquiryFormConfig,
  page,
  contactInfo,
}: {
  funders: Sponsor[];
  sponsorTiers: SponsorTierWithSponsors[];
  inquiryFormConfig: FormConfig;
  page: SponsorsPage;
  contactInfo: ContactInfo;
}) => {
  const { namedOpportunities } = page;
  // The shared `funders` list also feeds the footer strip and the homepage.
  // Only this page's grid honours `hideFromPartnersGrid`.
  const partnersGrid = funders.filter((s) => !s.hideFromPartnersGrid);
  // Only tiers with at least one paid sponsor get a section, matching the
  // original sponsorLevels data (Titanium and Friend of the District
  // currently have no paid sponsors, so no section renders for them).
  const populatedTiers = sponsorTiers.filter((tier) => tier.sponsors.length > 0);

  useEffect(() => {
    window.scrollTo(0, 0);
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

      <header className="bg-foreground pt-52 pb-16 md:pt-56">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
            {page.eyebrow}
          </p>
          <h1 className="font-display text-5xl font-bold leading-tight text-secondary md:text-6xl">
            {page.title}
          </h1>
        </div>
      </header>

      {/* Become a Sponsor */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {page.becomeEyebrow}
              </p>
              <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground">
                {page.becomeTitle}
              </h2>
              <p className="mb-4 font-body text-lg leading-relaxed text-foreground/85">
                {page.becomeIntro}
              </p>
              <a
                href="#our-sponsors"
                className="mb-14 inline-block font-body text-sm font-semibold uppercase tracking-widest text-primary hover:underline"
              >
                {page.becomeLinkLabel}
              </a>
            </div>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sponsorTiers.map((tier, i) => {
              const Icon = getIcon(tier.icon);
              return (
              <AnimatedSection key={tier._id} delay={i * 80} className="h-full">
                <div className="flex h-full flex-col rounded-lg bg-card p-8 shadow-sm">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
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
              );
            })}
          </div>

          <AnimatedSection delay={200}>
            <div className="mx-auto mt-12 max-w-3xl rounded-lg border border-border bg-card p-8 md:p-12">
              <div className="mb-8 text-center">
                <p className="mb-2 font-body text-lg font-semibold text-foreground">
                  {page.ctaTitle}
                </p>
                <p className="font-body text-base leading-relaxed text-muted-foreground">
                  {page.ctaBody}
                </p>
              </div>
              <InquiryForm
                config={inquiryFormConfig}
                formspreeEndpoint="https://formspree.io/f/xykqbjnp"
                successHref="/sponsors/success"
                levelPayloadKey="Sponsorship Level"
                levelOptions={[
                  ...sponsorTiers.map((tier) => `${tier.name} (${tier.price})`),
                  "Award / Event Sponsorship",
                  "Not sure yet — general inquiry",
                ]}
              />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={280}>
            <div className="mx-auto mt-6 max-w-2xl rounded-lg border border-border bg-card p-6 shadow-sm md:p-8">
              <p className="mb-6 text-center font-body text-base font-semibold uppercase tracking-wide text-foreground">
                {page.payTitle}
              </p>
              <SponsorPaymentForm sponsorTiers={sponsorTiers} contactInfo={contactInfo} page={page} />
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
              {page.givingEyebrow}
            </p>
            <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground">
              {page.givingTitle}
            </h2>
            <p className="mb-10 font-body text-lg leading-relaxed text-foreground/85">
              {page.givingIntro}
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
            <div id="our-sponsors" className="scroll-mt-48">
              <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {page.thankYouEyebrow}
              </p>
              <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground">
                {page.thankYouTitle}
              </h2>
              {/* No max-w here on purpose. This block used to be capped at
                  max-w-3xl (768px), but the sentence needs ~950px at text-lg,
                  so it always broke — and no amount of text-wrap tuning fixes
                  a container that's too narrow. Letting it use the section's
                  max-w-6xl puts it on one line on desktop; it still wraps
                  naturally on narrower screens, which is correct. */}
              <p className="mb-10 font-body text-lg leading-relaxed text-foreground/85">
                {page.thankYouBody}
              </p>
            </div>
            <h3
              id="grant-partners"
              className="mb-6 scroll-mt-32 font-display text-2xl font-semibold text-foreground"
            >
              {page.partnersTitle}
            </h3>
            {/* These partners sit above the paid tiers, so their cell is taller
                than Platinum's (h-44/h-56). None of the five marks shown here
                is especially wide (all roughly 1:1 to 2:1), so two columns is
                just a generous, balanced size for this tier rather than a fix
                for an outlier aspect ratio.
                `hideFromPartnersGrid` entries are filtered out here only — they
                still appear in the footer strip and on the homepage. */}
            <div className="grid gap-6 sm:grid-cols-2">
              {partnersGrid.map((sponsor) =>
                sponsor.logo ? (
                  <div
                    key={sponsor._id}
                    className="flex h-56 items-center justify-center px-4 py-4 sm:px-6 md:h-72"
                  >
                    {sponsor.url ? (
                      <a
                        href={sponsor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={sponsor.name}
                        className="flex h-full w-full items-center justify-center transition-opacity hover:opacity-80"
                      >
                        <img
                          src={urlFor(sponsor.logo).width(600).auto("format").url()}
                          alt={sponsor.alt ?? sponsor.name}
                          className="max-h-full w-auto max-w-full object-contain"
                        />
                      </a>
                    ) : (
                      <img
                        src={urlFor(sponsor.logo).width(600).auto("format").url()}
                        alt={sponsor.alt ?? sponsor.name}
                        className="max-h-full w-auto max-w-full object-contain"
                      />
                    )}
                  </div>
                ) : (
                  <div
                    key={sponsor._id}
                    className="flex h-56 items-center justify-center px-4 py-4 text-center sm:px-6 md:h-72"
                  >
                    <p className="font-display text-2xl font-semibold text-foreground md:text-3xl">
                      {sponsor.name}
                    </p>
                  </div>
                ),
              )}
            </div>
          </AnimatedSection>

          {populatedTiers.map((tier) => {
            const layout = levelLayout[tier.name] ?? levelLayout.Silver;
            return (
              <AnimatedSection key={tier._id}>
                <h3
                  id={`${tier.name.toLowerCase()}-sponsors`}
                  className="mb-6 mt-14 scroll-mt-32 font-display text-2xl font-semibold text-foreground"
                >
                  Our {tier.name} Sponsors
                </h3>
                <div className={`grid gap-6 ${layout.grid}`}>
                  {tier.sponsors.map((sponsor) => {
                    const showLogo = !tier.nameOnly && sponsor.logo;
                    const content = showLogo ? (
                      <img
                        src={urlFor(sponsor.logo!).width(600).auto("format").url()}
                        alt={sponsor.alt ?? sponsor.name}
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
                        key={sponsor._id}
                        href={sponsor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={sponsor.name}
                        className={`${cardClass} transition-opacity hover:opacity-80`}
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={sponsor._id} className={cardClass}>
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
      <BackToTop />
    </div>
  );
};

export default Sponsors;
