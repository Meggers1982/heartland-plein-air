import { useEffect } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import NewsletterCTA from "@/components/NewsletterCTA";
import BackToTop from "@/components/BackToTop";
import { setPageMeta } from "@/lib/meta";

const OpenDivision = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Open Division Artist Information | Heartland Plein Air Festival";
    return setPageMeta(
      "Open Division artist information for the Heartland Plein Air Festival, September 13–19, 2026.",
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
        </div>
      </header>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection>
            <div className="rounded-lg border border-border bg-card p-12 text-center">
              <p className="font-body text-base italic text-muted-foreground">
                Open Division Artist Information coming soon
              </p>
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
