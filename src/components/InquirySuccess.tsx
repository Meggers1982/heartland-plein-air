import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import Link from "next/link";
import { Check, ArrowLeft } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import BrushStrokeDivider from "@/components/BrushStrokeDivider";
import SiteNav from "@/components/SiteNav";
import NewsletterCTA from "@/components/NewsletterCTA";
import BackToTop from "@/components/BackToTop";
import FestivalContactInfo from "@/components/FestivalContactInfo";
import type { ContactInfo, SiteChrome } from "@/sanity/queries/pages";

type RecapItem = {
  name: string;
  price?: string;
  icon: LucideIcon;
  detail: string;
  // Pulls the item out of the uniform grid: spans the full row with an accent
  // treatment. For the one card that deserves more weight than its neighbours.
  featured?: boolean;
};

type InquirySuccessProps = {
  contactInfo: ContactInfo;
  chrome: SiteChrome;
  eyebrow: string;
  title: string;
  intro: string;
  recapTitle?: string;
  recapItems?: RecapItem[];
  backHref: string;
  backLabel: string;
  children?: ReactNode;
};

const InquirySuccess = ({
  eyebrow,
  title,
  intro,
  recapTitle,
  recapItems,
  backHref,
  backLabel,
  contactInfo,
  chrome,
  children,
}: InquirySuccessProps) => {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <header className="bg-foreground pt-52 pb-16 md:pt-56">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15">
              <Check className="h-8 w-8 text-primary" aria-hidden="true" />
            </div>
          </div>
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
            {eyebrow}
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight text-secondary md:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-body text-lg leading-relaxed text-secondary/80">
            {intro}
          </p>
          {children && <div className="mt-8">{children}</div>}
        </div>
      </header>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          {recapItems && recapItems.length > 0 && (
            <>
              <AnimatedSection className="mb-12 text-center">
                <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {chrome.successRecapHeading}
                </p>
                <h2 className="font-display text-4xl font-bold leading-tight text-foreground">
                  {recapTitle}
                </h2>
              </AnimatedSection>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {recapItems.map((item, i) =>
                  item.featured ? (
                    <AnimatedSection
                      key={item.name}
                      delay={i * 80}
                      className="h-full sm:col-span-2 lg:col-span-3"
                    >
                      <div className="relative flex h-full flex-col items-center overflow-hidden rounded-lg border border-primary/25 bg-gradient-to-br from-primary/10 via-card to-secondary/50 p-8 text-center shadow-md md:p-10">
                        <span
                          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary/70 to-transparent"
                          aria-hidden="true"
                        />
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 ring-4 ring-primary/10">
                          <item.icon className="h-7 w-7 text-primary" aria-hidden="true" />
                        </div>
                        <h3 className="mb-3 font-display text-2xl font-bold text-foreground md:text-3xl">
                          {item.name}
                        </h3>
                        {item.price && (
                          <p className="mb-2 font-body text-sm font-semibold uppercase tracking-wide text-primary">
                            {item.price}
                          </p>
                        )}
                        <p className="max-w-2xl font-body text-base leading-relaxed text-foreground/85 md:text-lg">
                          {item.detail}
                        </p>
                      </div>
                    </AnimatedSection>
                  ) : (
                    <AnimatedSection key={item.name} delay={i * 80} className="h-full">
                      <div className="flex h-full flex-col rounded-lg bg-card p-6 shadow-sm">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                        </div>
                        <h3 className="mb-1 font-display text-lg font-semibold text-foreground">
                          {item.name}
                        </h3>
                        {item.price && (
                          <p className="mb-2 font-body text-sm font-semibold uppercase tracking-wide text-primary">
                            {item.price}
                          </p>
                        )}
                        <p className="font-body text-sm leading-relaxed text-foreground/85">
                          {item.detail}
                        </p>
                      </div>
                    </AnimatedSection>
                  ),
                )}
              </div>
              <div className="mt-10 text-center">
                <Link
                  href={backHref}
                  className="inline-flex items-center gap-2 font-body text-sm font-semibold text-primary transition-colors hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  {backLabel}
                </Link>
              </div>
            </>
          )}
          {(!recapItems || recapItems.length === 0) && (
            <div className="text-center">
              <Link
                href={backHref}
                className="inline-flex items-center gap-2 font-body text-sm font-semibold text-primary transition-colors hover:underline"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                {backLabel}
              </Link>
            </div>
          )}
        </div>
      </section>

      <BrushStrokeDivider />

      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection className="mb-10 text-center">
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {chrome.successContactEyebrow}
            </p>
            <h2 className="font-display text-4xl font-bold leading-tight text-foreground">
              {chrome.successContactHeading}
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <div className="rounded-lg bg-card p-8 shadow-sm md:p-10">
              <FestivalContactInfo info={contactInfo} followAlongLabel={chrome.followAlongLabel} />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <NewsletterCTA />
      <BackToTop />
    </div>
  );
};

export default InquirySuccess;
