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
import type { OpenDivisionPage } from "@/sanity/queries/pages";




const OpenDivision = ({
  quickFacts,
  inquiryFormConfig,
  page,
}: {
  quickFacts: OpenDivisionQuickFact[];
  inquiryFormConfig: FormConfig;
  page: OpenDivisionPage;
}) => {
  const { paintingRequirements, paintingConduct, salesInfo, capacity } = page;
  // One source for the fee: the same number drives this copy and the PayPal
  // amount below, so a change in Studio can't leave them disagreeing.
  const fee = page.registrationFee;
  const feeLabel = `$${fee}`;
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
            For Artists
          </p>
          <h1 className="font-display text-5xl font-bold leading-tight text-secondary md:text-6xl">
            Open Division
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-secondary/80">
            Register to paint alongside the festival's invited artists. We recommend some prior plein air experience — spots are limited and go quickly.
          </p>
        </div>
      </header>

      {/* Quick Facts */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <AnimatedSection>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                At a Glance
              </p>
              <h2 className="font-display text-4xl font-bold leading-tight text-foreground">
                Quick Facts
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
                    <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed text-muted-foreground">
                      {item.description}
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
              Getting Started
            </p>
            <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground">
              Registration & Check-In
            </h2>
            <div className="space-y-5 font-body text-lg leading-relaxed text-foreground/85">
              <p>
                Registration is {feeLabel} and limited to {capacity} artists, first come, first served. Once registration fills, a waiting list will open. We highly recommend some prior plein air painting experience.
              </p>
              <p>
                Check-in runs from 11am to 5pm on Monday, September 14th, at the Ralston Baright Public Library (5555 S. 77th St, Ralston). You'll receive your information packet and lanyard, and can have your canvases stamped.
              </p>
              <p>
                All canvases and painting substrates must be stamped before you paint on them — no painting will be accepted without a prior stamp. You may have an unlimited number of surfaces stamped, but only one or two finished pieces may be submitted for exhibition and awards.
              </p>
            </div>
            <div className="mt-8 flex items-start gap-3 rounded-lg border border-border bg-card p-6">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                A liability release form is required from every Open Division artist at check-in.
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
              The Work
            </p>
            <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground">
              Painting Requirements
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
              Out in the Field
            </p>
            <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground">
              Where & How to Paint
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
              Selling Your Work
            </p>
            <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground">
              Sales, Commission & Exhibition
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
                  Turn-In & Pickup
                </h3>
              </div>
              <p className="font-body text-sm leading-relaxed text-foreground/85">
                Turn in your finished paintings on Friday, September 18th, between 9am and noon at the Venues at{" "}
                <a href="https://atthegranary.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
                  the Granary
                </a>{" "}
                (74th & Main St, Ralston). Unsold works must be picked up by 5pm on Saturday, September 19th.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <BrushStrokeDivider />

      {/* Registration CTA */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection>
            <div className="mb-8 text-center">
              <p className="mb-2 font-body text-lg font-semibold text-foreground">
                Ready to Register?
              </p>
              <p className="font-body text-base leading-relaxed text-muted-foreground">
                Fill out the form below to reserve your spot. Registration is {feeLabel} and limited to {capacity} artists, first come, first served.
              </p>
              <p className="mt-4 font-body text-base leading-relaxed text-muted-foreground">
                After submitting the form, pay your fee via PayPal or by mailing a check. Any registration without payment will not be accepted.
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
                  <MailCheckOption amount="30" />
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
