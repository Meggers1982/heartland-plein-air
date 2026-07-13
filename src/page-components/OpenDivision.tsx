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
import SiteFooter from "@/components/SiteFooter";
import NewsletterCTA from "@/components/NewsletterCTA";
import BackToTop from "@/components/BackToTop";
import InquiryForm from "@/components/InquiryForm";
import PayPalButton from "@/components/PayPalButton";
import { setPageMeta } from "@/lib/meta";
import { renderRichText } from "@/lib/richText";
import { quickFacts } from "@/data/openDivisionQuickFacts";

const paintingRequirements = [
  "Two-dimensional work only: oils, acrylics, watercolor, gouache, casein, pastel, or oil sticks.",
  "Maximum finished size is 28\" x 28\", including the frame.",
  "Paintings must be in quality frames, wired on the back for hanging. No unframed gallery-wrap canvases and no sawtooth hangers — no exceptions.",
  "All work must be created outdoors, on location (en plein air). No painting from photographs or indoors.",
  "You may have an unlimited number of canvases or substrates stamped, but only one or two finished pieces may be submitted for exhibition and awards.",
];

const paintingConduct = [
  "Paint any or all days of the festival, anywhere across the metro.",
  "Suggested painting locations and maps are available on the [Schedule page](/schedule) and in your information packet.",
  "Be mindful of other artists — don't block their view when setting up near them.",
  "Always ask permission before painting on private property.",
];

const salesInfo = [
  "All paintings must be for sale — no presales directly off your easel during the festival.",
  "Direct potential buyers to the Public Exhibition and Sale: Friday evening (ticketed) or Saturday (free and open to the public).",
  "The Ralston Hinge Creative District retains a 40% commission on all sales, supporting future programming in the creative district.",
];

const OpenDivision = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Register to Paint Plein Air With the Pros: Omaha 2026";
    return setPageMeta(
      "Register to paint alongside 25 national artists during festival week. Limited to 30 spots at $30. All mediums welcome. Sept. 13–19, 2026, Omaha metro.",
    );
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <header className="bg-foreground pt-44 pb-16">
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
            {quickFacts.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 100}>
                <div className="group rounded-lg bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
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
                Registration is $30 and limited to 30 artists, first come, first served. Once registration fills, a waiting list will open. We highly recommend some prior plein air painting experience.
              </p>
              <p>
                Check-in runs from 11am to 5pm on Monday, September 14th, at the Ralston Baright Public Library (5500 S. 77th St, Ralston). You'll receive your information packet and lanyard, and can have your canvases stamped.
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
                Fill out the form below to reserve your spot. Registration is $30 and limited to 30 artists, first come, first served.
              </p>
              <p className="mt-4 font-body text-base leading-relaxed text-muted-foreground">
                Please click the PayPal button after submitting the form to pay your fee. Any registration without payment will not be accepted.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-8 md:p-12">
              <InquiryForm
                formspreeEndpoint="https://formspree.io/f/xbdvpkdb"
                levelLabel="Primary Medium"
                levelOptions={["Oils", "Acrylics", "Watercolor", "Gouache", "Casein", "Pastel", "Oil Sticks"]}
                addressFields
                submitLabel="Submit Registration"
                successHref="/open-division/success"
              />
            </div>
            <div className="mx-auto mt-6 max-w-xs rounded-lg border border-border bg-card p-6 text-center shadow-sm">
              <p className="mb-4 font-body text-xs font-semibold uppercase tracking-wide text-foreground">
                Already Registered? Pay Your $30 Fee
              </p>
              <PayPalButton
                amount="30.00"
                description="Heartland Plein Air Festival — Open Division Registration"
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

export default OpenDivision;
