'use client';
import { useEffect, useState } from "react";
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
import NewsletterCTA from "@/components/NewsletterCTA";
import BackToTop from "@/components/BackToTop";
import CountdownBanner from "@/components/CountdownBanner";
import InquiryForm from "@/components/InquiryForm";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { getIcon } from "@/sanity/lib/iconMap";
import { renderRichText } from "@/lib/richText";
import type { AdSize } from "@/sanity/queries/advertising";
import type { FormConfig } from "@/sanity/queries/formConfig";
import type { AdvertisingPage } from "@/sanity/queries/pages";
import { AD_DEADLINE, AD_DEADLINE_LABEL } from "@/lib/adDeadline";


const Advertising = ({
  adSizes,
  inquiryFormConfig,
  page,
}: {
  adSizes: AdSize[];
  inquiryFormConfig: FormConfig;
  page: AdvertisingPage;
}) => {
  const { fileSpecs } = page;
  const [deadlinePassed, setDeadlinePassed] = useState(false);

  useEffect(() => {
    const check = () => setDeadlinePassed(Date.now() >= AD_DEADLINE);
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [breadcrumbSchema([{ name: "Advertising", path: "/advertising" }])],
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
          <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-secondary/80">
            {page.intro}
          </p>
        </div>
      </header>

      {/* Festival Catalog */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {page.catalogEyebrow}
              </p>
              <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground">
                {page.catalogTitle}
              </h2>
              <p className="mb-14 font-body text-lg leading-relaxed text-foreground/85">
                The festival catalog is printed in a run of 3,000 copies, plus an online version, and is distributed to collectors, attendees, and art enthusiasts throughout the Omaha metro and beyond. Reach your audience by placing an ad alongside the work of 25 nationally recognized plein air artists.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {adSizes.map((size, i) => {
              const Icon = getIcon(size.icon);
              return (
              <AnimatedSection key={size._id} delay={i * 80} className="h-full">
                <div className="flex h-full flex-col rounded-lg bg-card p-8 shadow-sm">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
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
              );
            })}
          </div>
        </div>
      </section>

      <BrushStrokeDivider />

      {/* File Specifications */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedSection>
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {page.specsEyebrow}
            </p>
            <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground">
              {page.specsTitle}
            </h2>
            <p className="mb-10 font-body text-lg leading-relaxed text-foreground/85">
              {page.specsIntro}
            </p>
          </AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-2">
            {fileSpecs.map((spec, i) => {
              const Icon = getIcon(spec.icon);
              return (
              <AnimatedSection key={spec._key} delay={i * 80}>
                <div className="flex items-center gap-4 rounded-lg bg-card p-6 shadow-sm">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <p className="font-body text-sm leading-relaxed text-foreground/85">
                    {spec.text}
                  </p>
                </div>
              </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <BrushStrokeDivider />

      {/* Deadline & How to Reserve */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection>
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {page.reserveEyebrow}
            </p>
            <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground">
              {page.reserveTitle}
            </h2>
            <p className="mb-10 font-body text-lg leading-relaxed text-foreground/85">
              {page.reserveIntro}
            </p>
          </AnimatedSection>
          <div className="space-y-4">
            <AnimatedSection delay={0}>
              <div className="flex items-start gap-4 rounded-lg bg-card p-6 shadow-sm">
                <Calendar className="mt-1 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <h3 className="mb-1 font-display text-lg font-semibold text-foreground">
                    {page.deadlineTitle}
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-foreground/85">
                    {page.deadlineBody}
                  </p>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={80}>
              <div className="flex items-start gap-4 rounded-lg bg-card p-6 shadow-sm">
                <Mail className="mt-1 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <h3 className="mb-1 font-display text-lg font-semibold text-foreground">
                    {page.submitTitle}
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-foreground/85">
                    {renderRichText(page.submitBody ?? "")}
                  </p>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={160}>
              <div className="flex items-start gap-4 rounded-lg bg-card p-6 shadow-sm">
                <CreditCard className="mt-1 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <h3 className="mb-1 font-display text-lg font-semibold text-foreground">
                    {page.paymentTitle}
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-foreground/85">
                    {page.paymentBody}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={240}>
            <div className="mx-auto mt-10 max-w-3xl rounded-lg border border-border bg-card p-8 md:p-12">
              {deadlinePassed ? (
                <div className="text-center">
                  <p className="mb-2 font-body text-lg font-semibold text-foreground">
                    {page.closedNote}
                  </p>
                  <p className="font-body text-base leading-relaxed text-muted-foreground">
                    The {AD_DEADLINE_LABEL} deadline has passed and we're no longer accepting new ad reservations for this year's catalog. Questions? Email{" "}
                    <a
                      href="mailto:info@ralstonarts.org"
                      className="font-semibold text-primary hover:underline"
                    >
                      info@ralstonarts.org
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <>
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
                    formspreeEndpoint="https://formspree.io/f/xeebpkrr"
                    successHref="/advertising/success"
                    levelPayloadKey="Ad Size"
                    levelOptions={adSizes.map((size) => `${size.name} (${size.price})`)}
                  />
                </>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CountdownBanner />
      <NewsletterCTA />
      <BackToTop />
    </div>
  );
};

export default Advertising;
