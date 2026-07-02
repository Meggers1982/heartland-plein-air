import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Check, ArrowLeft } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import BrushStrokeDivider from "@/components/BrushStrokeDivider";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import NewsletterCTA from "@/components/NewsletterCTA";
import BackToTop from "@/components/BackToTop";
import FestivalContactInfo from "@/components/FestivalContactInfo";

type RecapItem = {
  name: string;
  price?: string;
  icon: LucideIcon;
  detail: string;
};

type InquirySuccessProps = {
  eyebrow: string;
  title: string;
  intro: string;
  recapTitle?: string;
  recapItems?: RecapItem[];
  backHref: string;
  backLabel: string;
};

const InquirySuccess = ({
  eyebrow,
  title,
  intro,
  recapTitle,
  recapItems,
  backHref,
  backLabel,
}: InquirySuccessProps) => {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <header className="bg-foreground pt-44 pb-16">
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
        </div>
      </header>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          {recapItems && recapItems.length > 0 && (
            <>
              <AnimatedSection className="mb-12 text-center">
                <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  For Your Reference
                </p>
                <h2 className="font-display text-3xl font-bold leading-tight text-foreground">
                  {recapTitle}
                </h2>
              </AnimatedSection>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {recapItems.map((item, i) => (
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
                ))}
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
              Questions in the Meantime?
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight text-foreground">
              Get in Touch
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <div className="rounded-lg bg-card p-8 shadow-sm md:p-10">
              <FestivalContactInfo />
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

export default InquirySuccess;
