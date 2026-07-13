'use client';
import { useEffect } from "react";
import { Check } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import BrushStrokeDivider from "@/components/BrushStrokeDivider";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import NewsletterCTA from "@/components/NewsletterCTA";
import BackToTop from "@/components/BackToTop";
import { setPageMeta } from "@/lib/meta";

const passBenefits = [
  {
    day: "Sunday, September 13",
    title: "Private Meet & Greet",
    description: "Meet the participating artists before the week begins.",
  },
  {
    day: "Thursday, September 17",
    title: "Judge's Lecture with Priority Seating",
    description:
      "“Introduction to Impressionism,” presented by Judge of Awards and Master Artist Rick J. Delanty.",
  },
  {
    day: "Friday, September 18",
    title: "Collectors Preview Reception and Awards Presentation",
    description:
      "First access to purchase paintings created throughout the week, plus the Awards Presentation with the Judge of Awards. Beverages and hors d'oeuvres included.",
  },
  {
    day: "Saturday, September 19",
    title: "Live Auction Priority Seating",
    description:
      "The auction begins at noon following the Quick Paint in downtown Ralston and runs approximately one hour. The public reception runs 11 AM–5 PM.",
  },
];

const Tickets = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Buy Plein Air Festival Tickets: Get Closer to the Art";
    return setPageMeta(
      "Most festival events are free. Get the $125 Collector VIP Pass for private artist access and early art buying, or snag a $25 lecture-only ticket.",
    );
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <header className="bg-foreground pt-44 pb-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
            Get Closer to the Art
          </p>
          <h1 className="font-display text-5xl font-bold leading-tight text-secondary md:text-6xl">
            Tickets
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-secondary/80">
            While most Heartland Plein Air Festival events are free and open to the public, the Collector VIP Pass gets you closer to the art — and the artists.
          </p>
        </div>
      </header>

      {/* Collector VIP Pass */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Full Access
              </p>
              <h2 className="mb-2 font-display text-4xl font-bold leading-tight text-foreground">
                Collector VIP Pass
              </h2>
              <p className="mb-6 font-body text-lg font-semibold uppercase tracking-wide text-primary">
                $125
              </p>
              <a
                href="https://app.gopassage.com/events/heartland-plein-air-festival-vip"
                target="_blank"
                rel="noopener noreferrer"
                className="mb-10 inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 font-body text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl"
              >
                Buy the Collector VIP Pass — $125
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
                Your pass also supports the Ralston HINGE Creative District, community arts programming across all disciplines, and a festival that's on track to become the creative district's signature annual event.
              </p>
              <a
                href="https://app.gopassage.com/events/heartland-plein-air-festival-vip"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 font-body text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl"
              >
                Buy the Collector VIP Pass — $125
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <BrushStrokeDivider />

      {/* Lecture only */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <AnimatedSection>
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Just the Lecture
            </p>
            <h2 className="mb-4 font-display text-4xl font-bold leading-tight text-foreground">
              Judge's Lecture Only
            </h2>
            <p className="mb-2 font-body text-lg leading-relaxed text-foreground/85">
              Prefer just the lecture? "Introduction to Impressionism," presented by Judge of Awards and Master Artist Rick J. Delanty, Thursday, September 17 at the Baright Public Library.
            </p>
            <p className="mb-8 font-body text-lg font-semibold uppercase tracking-wide text-primary">
              $25
            </p>
            <a
              href="https://app.gopassage.com/events/heartland-plein-air-festival-lecture-with-delanty"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border-2 border-primary bg-transparent px-10 py-4 font-body text-xs font-bold uppercase tracking-[0.2em] text-primary transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
            >
              Buy Lecture Tickets — $25
            </a>
          </AnimatedSection>
        </div>
      </section>

      <BrushStrokeDivider />

      {/* Public Exhibition & Sale RSVP */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <AnimatedSection>
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Free & Open to the Public
            </p>
            <h2 className="mb-4 font-display text-4xl font-bold leading-tight text-foreground">
              Public Exhibition & Sale
            </h2>
            <p className="mb-2 font-body text-lg leading-relaxed text-foreground/85">
              Browse and purchase paintings made during festival week, Saturday, September 19, 11 AM–5 PM at{" "}
              <a href="https://atthegranary.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
                the Granary
              </a>{" "}
              in Ralston. Free to attend — RSVP so we know to expect you.
            </p>
            <p className="mb-8 font-body text-lg font-semibold uppercase tracking-wide text-primary">
              Free
            </p>
            <a
              href="https://app.gopassage.com/events/heartland-plein-air-festival-exhibition-sale"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border-2 border-primary bg-transparent px-10 py-4 font-body text-xs font-bold uppercase tracking-[0.2em] text-primary transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
            >
              RSVP — Free
            </a>
          </AnimatedSection>
        </div>
      </section>

      <NewsletterCTA />
      <SiteFooter />
      <BackToTop />
    </div>
  );
};

export default Tickets;
