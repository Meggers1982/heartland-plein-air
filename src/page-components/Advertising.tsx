'use client';
import { useEffect } from "react";
import {
  FileText,
  Palette,
  Ruler,
  Layers,
  Calendar,
  CreditCard,
  Mail,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import BrushStrokeDivider from "@/components/BrushStrokeDivider";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import NewsletterCTA from "@/components/NewsletterCTA";
import BackToTop from "@/components/BackToTop";
import InquiryForm from "@/components/InquiryForm";
import { setPageMeta } from "@/lib/meta";
import { adSizes } from "@/data/adSizes";

const fileSpecs = [
  { icon: FileText, text: "PDF format preferred, with no crop marks" },
  { icon: Ruler, text: "300 dpi resolution" },
  { icon: Palette, text: "CMYK color" },
  { icon: Layers, text: "All fonts and images embedded" },
];

const Advertising = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Advertising | Heartland Plein Air Festival";
    return setPageMeta(
      "Advertise in the Heartland Plein Air Festival catalog — full, half, and quarter page ad options, specs, and deadlines.",
    );
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <header className="bg-foreground pt-44 pb-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
            Reach Collectors & Attendees
          </p>
          <h1 className="font-display text-5xl font-bold leading-tight text-secondary md:text-6xl">
            Advertising Opportunities
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-secondary/80">
            Put your business in front of thousands of art lovers during the Heartland Plein Air Festival, September 13–19, 2026.
          </p>
        </div>
      </header>

      {/* Festival Catalog */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                6x6&quot; Festival Catalog
              </p>
              <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground">
                Advertise in the Catalog
              </h2>
              <p className="mb-14 font-body text-lg leading-relaxed text-foreground/85">
                The festival catalog is printed in a run of 3,000 copies, plus an online version, and is distributed to collectors, attendees, and art enthusiasts throughout the Omaha metro and beyond. Reach your audience by placing an ad alongside the work of 25 nationally recognized plein air artists.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {adSizes.map((size, i) => (
              <AnimatedSection key={size.name} delay={i * 80} className="h-full">
                <div className="flex h-full flex-col rounded-lg bg-card p-8 shadow-sm">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <size.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="mb-1 font-display text-xl font-semibold text-foreground">
                    {size.name}
                  </h3>
                  <p className="mb-4 font-body text-sm font-semibold uppercase tracking-wide text-primary">
                    {size.price}
                  </p>
                  <p className="font-body text-sm leading-relaxed text-foreground/85">
                    {size.dimensions}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <BrushStrokeDivider />

      {/* File Specifications */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedSection>
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Artwork Requirements
            </p>
            <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground">
              File Specifications
            </h2>
            <p className="mb-10 font-body text-lg leading-relaxed text-foreground/85">
              To ensure your ad prints correctly, please submit finished artwork according to the following specs.
            </p>
          </AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-2">
            {fileSpecs.map((spec, i) => (
              <AnimatedSection key={spec.text} delay={i * 80}>
                <div className="flex items-center gap-4 rounded-lg bg-card p-6 shadow-sm">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <spec.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <p className="font-body text-sm leading-relaxed text-foreground/85">
                    {spec.text}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <BrushStrokeDivider />

      {/* Deadline & How to Reserve */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection>
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Deadline & Payment
            </p>
            <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground">
              How to Reserve Your Ad
            </h2>
            <p className="mb-10 font-body text-lg leading-relaxed text-foreground/85">
              Space is limited and reserved on a first-come, first-served basis. Here's what to know before you submit.
            </p>
          </AnimatedSection>
          <div className="space-y-4">
            <AnimatedSection delay={0}>
              <div className="flex items-start gap-4 rounded-lg bg-card p-6 shadow-sm">
                <Calendar className="mt-1 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <h3 className="mb-1 font-display text-lg font-semibold text-foreground">
                    Deadline
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-foreground/85">
                    All print-ready ads are due no later than July 15th, ahead of the September 13–19, 2026 festival.
                  </p>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={80}>
              <div className="flex items-start gap-4 rounded-lg bg-card p-6 shadow-sm">
                <Mail className="mt-1 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <h3 className="mb-1 font-display text-lg font-semibold text-foreground">
                    Submit Your Artwork
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-foreground/85">
                    Email your print-ready ad to{" "}
                    <a
                      href="mailto:ralstoncreativedistrict@gmail.com"
                      className="font-semibold text-primary hover:underline"
                    >
                      ralstoncreativedistrict@gmail.com
                    </a>
                    .
                  </p>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={160}>
              <div className="flex items-start gap-4 rounded-lg bg-card p-6 shadow-sm">
                <CreditCard className="mt-1 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <h3 className="mb-1 font-display text-lg font-semibold text-foreground">
                    Payment
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-foreground/85">
                    Enclose a check payable to the Ralston Hinge Creative District along with your reservation.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={240}>
            <div className="mx-auto mt-10 max-w-3xl rounded-lg border border-border bg-card p-8 md:p-12">
              <div className="mb-8 text-center">
                <p className="mb-2 font-body text-lg font-semibold text-foreground">
                  Ready to reserve your ad space?
                </p>
                <p className="font-body text-base leading-relaxed text-muted-foreground">
                  Fill out the form below to reserve your ad. The Ralston Hinge Creative District is a 501(c)(3) nonprofit organization.
                </p>
              </div>
              <InquiryForm
                formspreeEndpoint="https://formspree.io/f/xeebpkrr"
                successHref="/advertising/success"
                levelLabel="Ad Size"
                levelOptions={adSizes.map((size) => `${size.name} (${size.price})`)}
                submitLabel="Submit Ad Reservation"
                successTitle="Reservation sent"
                successMessage="Thanks for reserving your ad space — we'll follow up with next steps."
              />
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

export default Advertising;
