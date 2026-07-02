'use client';
import { useEffect } from "react";
import Link from "next/link";
import { Crown, Gem, Award, Medal, Star, Heart, Check } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import BrushStrokeDivider from "@/components/BrushStrokeDivider";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import NewsletterCTA from "@/components/NewsletterCTA";
import BackToTop from "@/components/BackToTop";
import { setPageMeta } from "@/lib/meta";
import { sponsors } from "@/data/sponsors";

const sponsorTiers = [
  {
    name: "Titanium",
    price: "$5,000 and over",
    icon: Crown,
    benefits: [
      "Full-page ad in the festival catalog",
      "Logo on banners, ads, and website",
      "Three Collector's VIP Packages",
    ],
  },
  {
    name: "Platinum",
    price: "$2,500 to $4,999",
    icon: Gem,
    benefits: [
      "Full-page ad in the festival catalog",
      "Logo on banners, ads, and website",
      "Two Collector's VIP Packages",
    ],
  },
  {
    name: "Gold",
    price: "$1,000 to $2,499",
    icon: Award,
    benefits: [
      "Half-page ad in the festival catalog",
      "Logo on banners, ads, and website",
      "One Collector's VIP Package",
    ],
  },
  {
    name: "Silver",
    price: "$500 to $999",
    icon: Medal,
    benefits: [
      "Quarter-page ad in the festival catalog",
      "Logo on website",
      "Name on banner",
    ],
  },
  {
    name: "Bronze",
    price: "$250 to $499",
    icon: Star,
    benefits: [
      "Name listed in the festival catalog",
      "Name listed on website",
    ],
  },
  {
    name: "Friend of the District",
    price: "$100 to $249",
    icon: Heart,
    benefits: ["Name listed on website"],
  },
];

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
              <p className="mb-14 font-body text-lg leading-relaxed text-foreground/85">
                Sponsoring the Heartland Plein Air Festival puts your organization alongside nationally recognized artists and a growing collector community. Choose the level that fits — you'll be recognized in signage, social media, advertising, and the show catalog as noted below.
              </p>
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
            <div className="mx-auto mt-12 max-w-3xl rounded-lg border border-border bg-card p-8 text-center">
              <p className="mb-2 font-body text-lg font-semibold text-foreground">
                Ready to sponsor the festival?
              </p>
              <p className="font-body text-base leading-relaxed text-muted-foreground">
                Contact the Ralston Hinge Creative District at{" "}
                <a
                  href="mailto:ralstoncreativedistrict@gmail.com"
                  className="font-semibold text-primary hover:underline"
                >
                  ralstoncreativedistrict@gmail.com
                </a>{" "}
                to choose a level and become a sponsor. The Ralston Hinge Creative District is a 501(c)(3) nonprofit organization.
              </p>
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

      {/* Advertise in the Catalog */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection>
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Catalog Advertising
            </p>
            <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground">
              Advertise in the Catalog
            </h2>
            <p className="mb-8 font-body text-lg leading-relaxed text-foreground/85">
              The festival catalog is distributed to collectors, attendees, and art enthusiasts throughout the Omaha metro and beyond. Reach your audience by placing an ad alongside the work of 25 nationally recognized plein air artists.
            </p>
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <p className="font-body text-base italic text-muted-foreground">
                Advertising form coming soon
              </p>
            </div>
          </AnimatedSection>
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
              The Heartland Plein Air Festival is made possible through the generous support of the following sponsors and partners.
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              {sponsors.map((sponsor) =>
                sponsor.logo ? (
                  <div
                    key={sponsor.name}
                    className="flex items-center justify-center px-6 py-4"
                  >
                    <img
                      src={sponsor.logo}
                      alt={sponsor.alt}
                      className="max-h-28 w-auto max-w-full object-contain"
                    />
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
        </div>
      </section>

      <NewsletterCTA />
      <SiteFooter />
      <BackToTop />
    </div>
  );
};

export default Sponsors;
