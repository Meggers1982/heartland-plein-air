'use client';
import { useEffect } from "react";
import { Check } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import BrushStrokeDivider from "@/components/BrushStrokeDivider";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import NewsletterCTA from "@/components/NewsletterCTA";
import BackToTop from "@/components/BackToTop";
import YouthPaintoutForm from "@/components/YouthPaintoutForm";
import { setPageMeta } from "@/lib/meta";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

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
      "The auction begins at noon following the Quick Paint in downtown Ralston and runs approximately one hour. The public reception runs 11 AM–4 PM.",
  },
];

// From the paper backup registration form Deb provides on-site — logistics a
// registrant needs to know but that aren't a field to fill in.
const youthPaintoutGoodToKnow = [
  "Open to ages 5 to 18 (kindergarten through high school).",
  "Please arrive no later than 9:45 AM to check in — painting runs 10 AM–Noon.",
  "A parent or guardian must stay in the park for the full session.",
  "So we can welcome as many families as possible, participation is limited to 2 youth per family.",
  "Each young artist receives an art kit to keep.",
  "Finished paintings are framed and displayed at the Baright Public Library, then celebrated at the Youth Art Show Reception that evening.",
];

// Jump links shown under the hero — one per ticket type on the page, in the
// order the sections appear. Keep `id` in sync with each section's id.
const ticketOptions = [
  { id: "collector-vip-pass", name: "Collector VIP Pass", price: "$125" },
  { id: "judges-lecture", name: "Judge's Lecture Only", price: "$25" },
  { id: "collectors-preview-reception", name: "Collectors Preview Reception", price: "$95" },
  { id: "public-exhibition-sale", name: "Public Exhibition & Sale", price: "Free" },
  { id: "youth-paintout", name: "Youth Paintout", price: "Free" },
];

const Tickets = () => {
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
    document.title = "Buy Plein Air Festival Tickets: Get Closer to the Art";
    return setPageMeta(
      "Most festival events are free. Get the $125 Collector VIP Pass, or buy standalone tickets: $25 lecture, $95 Collectors Preview Reception.",
    );
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
      <section id="judges-lecture" className="scroll-mt-40 bg-secondary/40 py-20">
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

      {/* Collectors Preview Reception only */}
      <section id="collectors-preview-reception" className="scroll-mt-40 bg-secondary/40 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <AnimatedSection>
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Just the Reception
            </p>
            <h2 className="mb-4 font-display text-4xl font-bold leading-tight text-foreground">
              Collectors Preview Reception Only
            </h2>
            <p className="mb-2 font-body text-lg leading-relaxed text-foreground/85">
              First access to purchase paintings created throughout the week, plus the Awards Presentation with the Judge of Awards. Beverages and hors d'oeuvres included. Friday, September 18 at{" "}
              <a href="https://atthegranary.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
                the Granary
              </a>
              .
            </p>
            <p className="mb-8 font-body text-lg font-semibold uppercase tracking-wide text-primary">
              $95
            </p>
            <a
              href="https://app.gopassage.com/events/heartland-plein-air-festival-collectors-reception-and-awards-presentation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border-2 border-primary bg-transparent px-10 py-4 font-body text-xs font-bold uppercase tracking-[0.2em] text-primary transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
            >
              Buy Reception Tickets — $95
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
              Free & Open to the Public
            </p>
            <h2 className="mb-4 font-display text-4xl font-bold leading-tight text-foreground">
              Public Exhibition & Sale
            </h2>
            <p className="mb-2 font-body text-lg leading-relaxed text-foreground/85">
              Browse and purchase paintings made during festival week, Saturday, September 19, 11 AM–4 PM at{" "}
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

      <BrushStrokeDivider />

      {/* Youth Paintout registration */}
      <section id="youth-paintout" className="scroll-mt-40 bg-secondary/40 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection>
            <div className="text-center">
              <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Free · Pre-Registration Required
              </p>
              <h2 className="mb-4 font-display text-4xl font-bold leading-tight text-foreground">
                Youth Paintout
              </h2>
              <p className="mb-2 font-body text-lg leading-relaxed text-foreground/85">
                Young artists take their easels outdoors for a morning of open-air painting, Saturday, September 12, 10 AM–Noon at Wildewood Park (8000 Ralston Ave., Ralston). Work created that morning is celebrated at the Youth Art Show Reception that evening.
              </p>
              <p className="mb-8 font-body text-lg font-semibold uppercase tracking-wide text-primary">
                Free
              </p>
            </div>
            <div className="mx-auto mb-10 max-w-xl rounded-lg border border-border bg-card p-6 md:p-8">
              <p className="mb-4 font-display text-lg font-semibold text-foreground">
                Good to Know Before You Arrive
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
                Register for the Youth Paintout
              </p>
              <YouthPaintoutForm />
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
              Free &amp; Open to the Public
            </p>
            <h2 className="mb-4 font-display text-4xl font-bold leading-tight text-foreground">
              Youth Art Show Reception
            </h2>
            <p className="mb-2 font-body text-lg leading-relaxed text-foreground/85">
              The paintings made at the Youth Paintout that morning go on show the same evening. Saturday, September 12, 5–6:30 PM at the Baright Public Library, 5555 S. 77th St., Ralston. No ticket and no registration — just come.
            </p>
            <p className="mb-8 font-body text-lg font-semibold uppercase tracking-wide text-primary">
              Free
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 font-body text-sm text-muted-foreground">
              <span>Sponsored by Applewood Hy-Vee</span>
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
      <SiteFooter />
      <BackToTop />
    </div>
  );
};

export default Tickets;
