'use client';
import { useEffect, type ReactNode } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import SiteNav from "@/components/SiteNav";
import BackToTop from "@/components/BackToTop";

/**
 * Shared chrome for the Privacy Policy and Terms pages. Same header treatment
 * as every other interior page; the body is narrower (max-w-3xl) because these
 * are long-form reading rather than card grids.
 *
 * SiteFooter is NOT rendered here — the (site) route group's layout supplies it.
 */

/** Body copy class, shared so the two legal pages can't drift apart. */
export const legalBody = "font-body text-base leading-relaxed text-foreground/85";

export const LegalSection = ({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) => (
  <section>
    <h2 className="mb-3 font-display text-2xl font-semibold text-foreground">{heading}</h2>
    <div className={`space-y-4 ${legalBody}`}>{children}</div>
  </section>
);

export const LegalList = ({ children }: { children: ReactNode }) => (
  <ul className="list-disc space-y-2 pl-6">{children}</ul>
);

const LegalPage = ({
  title,
  lastUpdated,
  intro,
  children,
}: {
  title: string;
  lastUpdated: string;
  intro?: ReactNode;
  children: ReactNode;
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <header className="bg-foreground pt-52 pb-16 md:pt-56">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
            Legal
          </p>
          <h1 className="font-display text-5xl font-bold leading-tight text-secondary md:text-6xl">
            {title}
          </h1>
        </div>
      </header>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection>
            <p className="mb-8 font-body text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Last updated {lastUpdated}
            </p>
            {intro && <div className={`mb-12 ${legalBody}`}>{intro}</div>}
            <div className="space-y-10">{children}</div>
          </AnimatedSection>
        </div>
      </section>

      <BackToTop />
    </div>
  );
};

export default LegalPage;
