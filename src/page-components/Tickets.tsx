'use client';
import { useEffect } from "react";
import { Check } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import BrushStrokeDivider from "@/components/BrushStrokeDivider";
import SiteNav from "@/components/SiteNav";
import NewsletterCTA from "@/components/NewsletterCTA";
import BackToTop from "@/components/BackToTop";
import YouthPaintoutForm from "@/components/YouthPaintoutForm";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import type { FormConfig } from "@/sanity/queries/formConfig";
import type { TicketsPage, TicketSection } from "@/sanity/queries/pages";
import { renderRichText } from "@/lib/richText";




const Tickets = ({
  youthPaintoutFormConfig,
  page,
}: {
  youthPaintoutFormConfig: FormConfig;
  page: TicketsPage;
}) => {
  const { ticketOptions, passBenefits, youthPaintoutGoodToKnow } = page;
  // Each block below keeps its bespoke layout; only the wording is looked up.
  // Falling back to an empty object means a section missing from Sanity renders
  // blank text rather than crashing the page.
  const copy = (id: string): Partial<TicketSection> =>
    page.sections?.find((sec) => sec.id === id) ?? {};
  const vip = copy("collector-vip-pass");
  const lecture = copy("judges-lecture");
  const reception = copy("collectors-preview-reception");
  const exhibition = copy("public-exhibition-sale");
  const youth = copy("youth-paintout");
  const youthReception = copy("youth-art-show-reception");
  const handleJump = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    // Clears the fixed nav + countdown ribbon.
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 150, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [breadcrumbSchema([{ name: "Tickets", path: "/tickets" }])],
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

      {/* Jump links to each ticket type */}
      <nav aria-label="Ticket options" className="border-b border-border bg-card/60 py-8">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {ticketOptions.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                onClick={(e) => handleJump(e, t.id)}
                className="group flex h-full flex-col items-center justify-center gap-1 rounded-md border border-border bg-card px-4 py-4 text-center transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:shadow-md"
              >
                <span className="font-display text-sm font-semibold leading-tight text-foreground group-hover:text-primary-foreground">
                  {t.name}
                </span>
                <span className="font-body text-xs font-bold uppercase tracking-widest text-primary group-hover:text-primary-foreground/90">
                  {t.price}
                </span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Collector VIP Pass */}
      <section id="collector-vip-pass" className="scroll-mt-40 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {vip.eyebrow}
              </p>
              <h2 className="mb-2 font-display text-4xl font-bold leading-tight text-foreground">
                {vip.heading}
              </h2>
              <p className="mb-6 font-body text-lg font-semibold uppercase tracking-wide text-primary">
                {vip.price}
              </p>
              <a
                href={vip.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-10 inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 font-body text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl"
              >
                {vip.ctaLabel}
              </a>
            </div>
          </AnimatedSection>

          <div className="space-y-4">
            {passBenefits.map((b, i) => (
              <AnimatedSection key={b.title} delay={i * 80}>
                <div className="flex items-start gap-4 rounded-lg bg-card p-6 shadow-sm">
                  <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <p className="mb-1 font-body text-xs font-semibold uppercase tracking-wide text-primary">
                      {b.day}
                    </p>
                    <h3 className="mb-1 font-display text-lg font-semibold text-foreground">
                      {b.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed text-foreground/85">
                      {b.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={340}>
            <div className="mx-auto mt-10 max-w-3xl rounded-lg border border-border bg-card p-8 text-center md:p-12">
              <p className="mb-6 font-body text-lg leading-relaxed text-muted-foreground">
                {renderRichText(vip.description ?? "")}
              </p>
              <a
                href={vip.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 font-body text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl"
              >
                {vip.ctaLabel}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <BrushStrokeDivider />

      {/* Lecture only */}
      <section id="judges-lecture" className="scroll-mt-40 bg-secondary/40 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <AnimatedSection>
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {lecture.eyebrow}
            </p>
            <h2 className="mb-4 font-display text-4xl font-bold leading-tight text-foreground">
              {lecture.heading}
            </h2>
            <p className="mb-2 font-body text-lg leading-relaxed text-foreground/85">
              {renderRichText(lecture.description ?? "")}
            </p>
            <p className="mb-8 font-body text-lg font-semibold uppercase tracking-wide text-primary">
              {lecture.price}
            </p>
            <a
              href={lecture.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border-2 border-primary bg-transparent px-10 py-4 font-body text-xs font-bold uppercase tracking-[0.2em] text-primary transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
            >
              {lecture.ctaLabel}
            </a>
          </AnimatedSection>
        </div>
      </section>

      <BrushStrokeDivider />

      {/* Collectors Preview Reception only */}
      <section id="collectors-preview-reception" className="scroll-mt-40 bg-secondary/40 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <AnimatedSection>
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {reception.eyebrow}
            </p>
            <h2 className="mb-4 font-display text-4xl font-bold leading-tight text-foreground">
              {reception.heading}
            </h2>
            <p className="mb-2 font-body text-lg leading-relaxed text-foreground/85">
              {renderRichText(reception.description ?? "")}
            </p>
            <p className="mb-8 font-body text-lg font-semibold uppercase tracking-wide text-primary">
              {reception.price}
            </p>
            <a
              href={reception.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border-2 border-primary bg-transparent px-10 py-4 font-body text-xs font-bold uppercase tracking-[0.2em] text-primary transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
            >
              {reception.ctaLabel}
            </a>
          </AnimatedSection>
        </div>
      </section>

      <BrushStrokeDivider />

      {/* Public Exhibition & Sale RSVP */}
      <section id="public-exhibition-sale" className="scroll-mt-40 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <AnimatedSection>
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {exhibition.eyebrow}
            </p>
            <h2 className="mb-4 font-display text-4xl font-bold leading-tight text-foreground">
              {exhibition.heading}
            </h2>
            <p className="mb-2 font-body text-lg leading-relaxed text-foreground/85">
              {renderRichText(exhibition.description ?? "")}
            </p>
            <p className="mb-8 font-body text-lg font-semibold uppercase tracking-wide text-primary">
              {exhibition.price}
            </p>
            <a
              href={exhibition.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border-2 border-primary bg-transparent px-10 py-4 font-body text-xs font-bold uppercase tracking-[0.2em] text-primary transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
            >
              {exhibition.ctaLabel}
            </a>
          </AnimatedSection>
        </div>
      </section>

      <BrushStrokeDivider />

      {/* Youth Paintout registration */}
      <section id="youth-paintout" className="scroll-mt-40 bg-secondary/40 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection>
            <div className="text-center">
              <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {youth.eyebrow}
              </p>
              <h2 className="mb-4 font-display text-4xl font-bold leading-tight text-foreground">
                {youth.heading}
              </h2>
              <p className="mb-2 font-body text-lg leading-relaxed text-foreground/85">
                {renderRichText(youth.description ?? "")}
              </p>
              <p className="mb-8 font-body text-lg font-semibold uppercase tracking-wide text-primary">
                {youth.price}
              </p>
            </div>
            <div className="mx-auto mb-10 max-w-xl rounded-lg border border-border bg-card p-6 md:p-8">
              <p className="mb-4 font-display text-lg font-semibold text-foreground">
                {page.youthGoodToKnowHeading}
              </p>
              <ul className="space-y-3">
                {youthPaintoutGoodToKnow.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                    <span className="font-body text-sm leading-relaxed text-foreground/85">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-card p-8 md:p-12">
              <p className="mb-6 text-center font-body text-base font-semibold uppercase tracking-wide text-foreground">
                {page.youthRegisterHeading}
              </p>
              <YouthPaintoutForm config={youthPaintoutFormConfig} />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <BrushStrokeDivider />

      {/* Youth Art Show Reception — no RSVP or ticket of any kind, just an
          open house. Not in `ticketOptions` above since there is nothing to
          jump here to buy or register for; the section stays so the event is
          still listed and described. */}
      <section id="youth-art-show-reception" className="scroll-mt-40 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <AnimatedSection>
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {youthReception.eyebrow}
            </p>
            <h2 className="mb-4 font-display text-4xl font-bold leading-tight text-foreground">
              {youthReception.heading}
            </h2>
            <p className="mb-2 font-body text-lg leading-relaxed text-foreground/85">
              {renderRichText(youthReception.description ?? "")}
            </p>
            <p className="mb-8 font-body text-lg font-semibold uppercase tracking-wide text-primary">
              {youthReception.price}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 font-body text-sm text-muted-foreground">
              <span>{page.youthReceptionCredit}</span>
              <a
                href="https://www.hy-vee.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Applewood Hy-Vee"
                className="inline-flex transition-opacity hover:opacity-80"
              >
                <img
                  src="/assets/sponsors/hy-vee.webp"
                  alt="hy-vee logo"
                  className="h-8 w-auto max-w-[130px] object-contain"
                />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <NewsletterCTA />
      <BackToTop />
    </div>
  );
};

export default Tickets;
