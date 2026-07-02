'use client';
import { useEffect } from "react";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import BrushStrokeDivider from "@/components/BrushStrokeDivider";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import NewsletterCTA from "@/components/NewsletterCTA";
import BackToTop from "@/components/BackToTop";
import { setPageMeta } from "@/lib/meta";

const sponsors = [
  {
    name: "Plein Air Magazine",
    logo: "/assets/plein-air-magazine-logo.png",
    alt: "PleinAir Magazine logo",
  },
  {
    name: "Art of the West",
    logo: "/assets/art-of-the-west-logo.png",
    alt: "Art of the West magazine logo",
  },
  {
    name: "Visit Nebraska",
    logo: "/assets/visit-nebraska-logo.png",
    alt: "Visit Nebraska logo with state outline",
  },
  {
    name: "Wiebe Ralston Foundation",
    logo: "/assets/wiebe-ralston-foundation-logo.png",
    alt: "Wiebe Ralston Foundation logo with state outline",
  },
  {
    name: "Ralston Archives Museum",
    logo: "/assets/ralston-archives-museum-logo.png",
    alt: "Frank & Velma Johnson Ralston Archives Museum logo",
  },
  {
    name: "Nebraska Arts Council / Nebraska Cultural Endowment",
    logo: "/assets/nebraska-arts-council-logo.png",
    alt: "Nebraska Arts Council and Nebraska Cultural Endowment logos",
  },
  { name: "Sherwood Foundation" },
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
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection>
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Get Involved
            </p>
            <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground">
              Become a Sponsor
            </h2>
            <p className="mb-8 font-body text-lg leading-relaxed text-foreground/85">
              Sponsoring the Heartland Plein Air Festival puts your organization alongside nationally recognized artists and a growing collector community. For sponsorship inquiries, contact us at{" "}
              <a
                href="mailto:ralstoncreativedistrict@gmail.com"
                className="font-semibold text-primary hover:underline"
              >
                ralstoncreativedistrict@gmail.com
              </a>
              .
            </p>
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <p className="font-body text-base italic text-muted-foreground">
                Sponsor form coming soon
              </p>
            </div>
          </AnimatedSection>
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
