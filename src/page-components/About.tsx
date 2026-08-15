'use client';
import { useEffect } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import BrushStrokeDivider from "@/components/BrushStrokeDivider";
import SiteNav from "@/components/SiteNav";
import NewsletterCTA from "@/components/NewsletterCTA";
import CountdownBanner from "@/components/CountdownBanner";
import BackToTop from "@/components/BackToTop";
import RichText from "@/components/RichText";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import type { AboutPage } from "@/sanity/queries/pages";

const About = ({ page }: { page: AboutPage }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [breadcrumbSchema([{ name: "About", path: "/about" }])],
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
        </div>
      </header>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection>
            <div className="space-y-5 font-body text-lg leading-relaxed text-foreground/85">
              {/* One <p> per block: RichText renders `normal` blocks as bare
                  fragments, so the paragraphs must be wrapped here or they run
                  together. Same pattern as Faq.tsx. */}
              {page.intro.map((b) => (
                <p key={b._key}>
                  <RichText value={[b]} />
                </p>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Sections alternate a tinted band with the page ground, and a brush
          stroke introduces each tinted one — the rhythm the page had when these
          were three hardcoded blocks. Adding a fourth section in Studio simply
          continues the pattern. */}
      {page.sections.map((section, i) => {
        const tinted = i % 2 === 0;
        return (
          <div key={section._key}>
            {tinted && <BrushStrokeDivider />}
            <section className={tinted ? "bg-secondary/40 py-20" : "py-20"}>
              <div className="mx-auto max-w-3xl px-6">
                <AnimatedSection>
                  <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {section.eyebrow}
                  </p>
                  <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground">
                    {section.heading}
                  </h2>
                  <div className="space-y-5 font-body text-lg leading-relaxed text-foreground/85">
                    {section.body.map((b) => (
                      <p key={b._key}>
                        <RichText value={[b]} />
                      </p>
                    ))}
                  </div>
                </AnimatedSection>
              </div>
            </section>
          </div>
        );
      })}

      <CountdownBanner />
      <NewsletterCTA />
      <BackToTop />
    </div>
  );
};

export default About;
