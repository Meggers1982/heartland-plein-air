'use client';
import { useEffect } from "react";
import {
  ShieldCheck,
  Clock,
  MapPin,
  Check,
  Percent,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import BrushStrokeDivider from "@/components/BrushStrokeDivider";
import SiteNav from "@/components/SiteNav";
import NewsletterCTA from "@/components/NewsletterCTA";
import BackToTop from "@/components/BackToTop";
import InquiryForm from "@/components/InquiryForm";
import PayPalButton from "@/components/PayPalButton";
import MailCheckOption from "@/components/MailCheckOption";
import { renderRichText } from "@/lib/richText";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { getIcon } from "@/sanity/lib/iconMap";
import type { OpenDivisionQuickFact } from "@/sanity/queries/openDivision";
import type { FormConfig } from "@/sanity/queries/formConfig";
import type { ContactInfo, OpenDivisionPage } from "@/sanity/queries/pages";




const OpenDivision = ({
  quickFacts,
  inquiryFormConfig,
  page,
  contactInfo,
}: {
  quickFacts: OpenDivisionQuickFact[];
  inquiryFormConfig: FormConfig;
  page: OpenDivisionPage;
  contactInfo: ContactInfo;
}) => {
  const { paintingRequirements, paintingConduct, salesInfo, capacity } = page;
  // One source for the fee: the same number drives this copy and the PayPal
  // amount below, so a change in Studio can't leave them disagreeing.
  const fee = page.registrationFee;
  const feeLabel = `$${fee}`;
  // Lets any editable string quote the price without hardcoding it, so the
  // wording can never contradict what PayPal actually charges.
  const fill = (t?: string) =>
    (t ?? "").replaceAll("{fee}", feeLabel).replaceAll("{capacity}", String(capacity));
  const payPalAmount = fee.toFixed(2);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [breadcrumbSchema([{ name: "Open Division", path: "/open-division" }])],
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
            {fill(page.intro)}
          </p>
        </div>
      </header>

      {/* Quick Facts */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <AnimatedSection>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {page.quickFactsEyebrow}
              </p>
              <h2 className="font-display text-4xl font-bold leading-tight text-foreground">
                {page.quickFactsTitle}
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {quickFacts.map((item, i) => {
              const Icon = getIcon(item.icon);
              return (
                <AnimatedSection key={item._id} delay={i * 100} className="h-full">
                  <div className="group flex h-full flex-col rounded-lg bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    {/* Quick facts quote the fee and the capacity, so they get
                        the same {fee}/{capacity} substitution as the prose
                        below. Without this they silently drift: the capacity
                        card still read "40 artists" after the page itself was
                        changed to 30. */}
                    <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                      {fill(item.title)}
                    </h3>
                    <p className="font-body text-sm leading-relaxed text-muted-foreground">
                      {fill(item.description)}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <BrushStrokeDivider />

      {/* Registration & Check-In */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection>
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {page.checkInEyebrow}
            </p>
            <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground">
              {page.checkInTitle}
            </h2>
            <div className="space-y-5 font-body text-lg leading-relaxed text-foreground/85">
              <p>
                Registration is {feeLabel} and limited to {capacity} artists, first come, first served. Once registration fills, a waiting list will open. We highly recommend some prior plein air painting experience.
              </p>
              <p>
                {fill(page.checkInBody)}
              </p>
              <p>
                All canvases and painting substrates must be stamped before you paint on them — no painting will be accepted without a prior stamp. You may have an unlimited number of surfaces stamped, but only one or two finished pieces may be submitted for exhibition and awards.
              </p>
            </div>
            <div className="mt-8 flex items-start gap-3 rounded-lg border border-border bg-card p-6">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                {fill(page.liabilityNote)}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <BrushStrokeDivider />

      {/* Painting Requirements */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection>
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {page.requirementsEyebrow}
            </p>
            <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground">
              {page.requirementsTitle}
            </h2>
            <ul className="space-y-4">
              {paintingRequirements.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                  <span className="font-body text-sm leading-relaxed text-foreground/85">
                    {renderRichText(item)}
                  </span>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </section>

      <BrushStrokeDivider />

      {/* Where & How to Paint */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection>
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {page.conductEyebrow}
            </p>
            <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground">
              {page.conductTitle}
            </h2>
            <ul className="space-y-4">
              {paintingConduct.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                  <span className="font-body text-sm leading-relaxed text-foreground/85">
                    {renderRichText(item)}
                  </span>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </section>

      <BrushStrokeDivider />

      {/* Sales & Exhibition */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection>
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {page.salesEyebrow}
            </p>
            <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground">
              {page.salesTitle}
            </h2>
            <ul className="space-y-4">
              {salesInfo.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Percent className="mt-1 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                  <span className="font-body text-sm leading-relaxed text-foreground/85">
                    {renderRichText(item)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-lg border border-border bg-card p-8">
              <div className="mb-4 flex items-center gap-3">
                <Clock className="h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {page.turnInTitle}
                </h3>
              </div>
              <p className="font-body text-sm leading-relaxed text-foreground/85">
                {renderRichText(fill(page.turnInBody))}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Festival week: editor-managed sections (awards night, Quick Paint,
          payment timing, contacts). Backgrounds alternate from this point,
          picking up where Sales & Exhibition left off so the striping stays
          unbroken however many sections are added. */}
      {(page.festivalWeek ?? []).map((section, i) => {
        const Icon = getIcon(section.icon);
        return (
          <div key={section._key}>
            <BrushStrokeDivider />
            <section className={i % 2 === 0 ? "bg-secondary/40 py-20" : "py-20"}>
              <div className="mx-auto max-w-3xl px-6">
                <AnimatedSection>
                  {section.eyebrow && (
                    <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      {section.eyebrow}
                    </p>
                  )}
                  <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground">
                    {section.title}
                  </h2>
                  <ul className="space-y-4">
                    {section.body.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Icon
                          className="mt-1 h-5 w-5 flex-shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span className="font-body text-sm leading-relaxed text-foreground/85">
                          {renderRichText(fill(item))}
                        </span>
                      </li>
                    ))}
                  </ul>
                </AnimatedSection>
              </div>
            </section>
          </div>
        );
      })}

      <BrushStrokeDivider />

      {/* Registration CTA */}
      <section
        className={
          (page.festivalWeek?.length ?? 0) % 2 === 0
            ? "bg-secondary/40 py-20"
            : "py-20"
        }
      >
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection>
            <div className="mb-8 text-center">
              <p className="mb-2 font-body text-lg font-semibold text-foreground">
                {page.registerTitle}
              </p>
              <p className="font-body text-base leading-relaxed text-muted-foreground">
                {fill(page.registerBody)}
              </p>
              <p className="mt-4 font-body text-base leading-relaxed text-muted-foreground">
                {fill(page.registerPaymentNote)}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-8 md:p-12">
              <InquiryForm
                config={inquiryFormConfig}
                formspreeEndpoint="https://formspree.io/f/xbdvpkdb"
                levelPayloadKey="Primary Medium"
                levelOptions={["Oils", "Acrylics", "Watercolor", "Gouache", "Casein", "Pastel", "Oil Sticks"]}
                addressFields
                successHref="/open-division/success"
              />
            </div>
            <div className="mx-auto mt-6 max-w-2xl rounded-lg border border-border bg-card p-6 shadow-sm md:p-8">
              <p className="mb-6 text-center font-body text-base font-semibold uppercase tracking-wide text-foreground">
                Already Registered? Pay Your {feeLabel} Fee
              </p>
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="text-center">
                  <p className="mb-3 font-body text-sm font-semibold text-foreground">
                    Pay Online
                  </p>
                  <PayPalButton
                    amount={payPalAmount}
                    description="Heartland Plein Air Festival — Open Division Registration"
                  />
                </div>
                <div className="border-t border-border pt-6 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
                  <MailCheckOption info={contactInfo} amount="30" />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <NewsletterCTA />
      <BackToTop />
    </div>
  );
};

export default OpenDivision;
