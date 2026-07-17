'use client';
import { useEffect, useState } from "react";
import { MapPin, Users, Eye, ShoppingBag } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import CountdownBanner from "@/components/CountdownBanner";
import BrushStrokeDivider from "@/components/BrushStrokeDivider";
import ScheduleSection from "@/components/ScheduleSection";
import ArtistSpotlight from "@/components/ArtistSpotlight";
import LocationsMap from "@/components/LocationsMap";
import SponsorsSection from "@/components/SponsorsSection";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import NewsletterCTA from "@/components/NewsletterCTA";
import BackToTop from "@/components/BackToTop";
import { renderRichText } from "@/lib/richText";
import { categories as faqCategories } from "@/data/faq";

const highlights = [
  {
    icon: Users,
    title: "25 National Artists",
    description:
      "Twenty-five nationally recognized painters, working outdoors across the metro for a full week.",
  },
  {
    icon: MapPin,
    title: "20+ Scenic Locations",
    description:
      "Parks, historic neighborhoods, scenic overlooks, and everyday places made interesting by the right set of eyes.",
  },
  {
    icon: Eye,
    title: "Watch Artists Create",
    description:
      "Follow artists across the metro, watch the work happen in real time, and talk to them as they paint.",
  },
  {
    icon: ShoppingBag,
    title: "Exhibition & Auction",
    description:
      "Every painting in the exhibition was made on-site that week — what you're buying is a record of this place in September 2026.",
  },
];

const faqs = faqCategories.flatMap((c) => c.items).filter((i) => i.featured);

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      {/* Hero with parallax */}
      <section className="relative flex min-h-[100dvh] items-end overflow-hidden">
        <img
          src="/assets/spring-greens-djgroesser.webp"
          alt="oil painting of lush spring green landscape"
          className="absolute inset-0 h-[120%] w-full object-cover will-change-transform"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--hero-overlay)" }}
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-40">
          <p
            className={`mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-secondary transition-all duration-700 ${heroLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            style={{ transitionDelay: "200ms" }}
          >
            September 13–19, 2026
          </p>
          <h1
            className={`hero-title mb-6 max-w-3xl font-display text-5xl font-bold leading-tight text-secondary md:text-7xl transition-all duration-700 ${heroLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            style={{ transitionDelay: "400ms" }}
          >
            Heartland Plein Air Festival
          </h1>
          <p
            className={`mb-8 max-w-xl font-body text-lg font-medium leading-relaxed text-secondary/95 transition-all duration-700 ${heroLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            style={{ transitionDelay: "600ms" }}
          >
            Art, out in the open. Twenty-five nationally recognized artists,
            painting Douglas and Sarpy County exactly as it looks in September.
          </p>
          <div
            className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4 transition-all duration-700 ${heroLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            style={{ transitionDelay: "800ms" }}
          >
            <Link
              href="/schedule"
              className="inline-flex w-full items-center justify-center rounded-full bg-primary px-7 py-3 font-body text-sm font-semibold uppercase tracking-[0.15em] text-primary-foreground shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
            >
              View Schedule
            </Link>
            <Link
              href="/tickets"
              className="inline-flex w-full items-center justify-center rounded-full border-2 border-secondary/80 bg-transparent px-7 py-3 font-body text-sm font-semibold uppercase tracking-[0.15em] text-secondary transition-all hover:-translate-y-0.5 hover:bg-secondary hover:text-secondary-foreground sm:w-auto"
            >
              Buy Tickets
            </Link>
            <Link
              href="/artists"
              className="inline-flex w-full items-center justify-center rounded-full border-2 border-secondary/80 bg-transparent px-7 py-3 font-body text-sm font-semibold uppercase tracking-[0.15em] text-secondary transition-all hover:-translate-y-0.5 hover:bg-secondary hover:text-secondary-foreground sm:w-auto"
            >
              Meet the Artists
            </Link>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <CountdownBanner />

      {/* About */}
      <section id="about" className="py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-2">
          <AnimatedSection>
            <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              About the Festival
            </p>
            <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground">
              Art Made Here
            </h2>
            <div className="space-y-4 font-body text-lg leading-relaxed text-muted-foreground">
              <p>
                Plein air is French for "open air" — painting done outside, on location, in direct response to the light and landscape in front of you. No studio, no reference photos. Just the artist and the scene as it actually is.
              </p>
              <p>
                During festival week, 25 nationally recognized artists spread out across more than 20 locations in Douglas and Sarpy Counties — historic neighborhoods, scenic overlooks, landmarks, and everyday places made interesting by the right set of eyes. The public is welcome to follow along, watch the work happen, and talk to the artists as they paint.
              </p>
              <p>
                Every piece in the final exhibition was made that week, on-site. What you're seeing — and buying — is a record of a specific place at a specific moment in September 2026. That's not something you can replicate.
              </p>
            </div>
            <Link
              href="/about"
              className="mt-6 inline-block font-body text-sm font-semibold uppercase tracking-widest text-primary hover:underline"
            >
              Read Our Full Story →
            </Link>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <div className="overflow-hidden rounded-lg shadow-xl transition-transform duration-500 hover:scale-[1.02]">
              <img
                src="/assets/plein-air-painter-niobrara-river.webp"
                alt="Artist painting riverside landscape at an outdoor easel"
                className="h-full w-full object-cover"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <BrushStrokeDivider />

      {/* Highlights */}
      <section id="highlights" className="bg-secondary/50 pt-24 pb-12">
        <div className="mx-auto max-w-6xl px-6">
          <AnimatedSection className="mb-16 text-center">
            <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              What to Expect
            </p>
            <h2 className="font-display text-4xl font-bold text-foreground">
              Festival Highlights
            </h2>
          </AnimatedSection>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 100} className="h-full">
                <div className="group flex h-full flex-col rounded-lg bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
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

      {/* Schedule */}
      <ScheduleSection />

      <BrushStrokeDivider className="py-4" />

      {/* Tickets */}
      <section id="tickets" className="py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <AnimatedSection>
            <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Get Closer to the Art
            </p>
            <h2 className="mb-6 font-display text-4xl font-bold text-foreground">
              Collector VIP Pass
            </h2>
            <p className="mx-auto mb-8 max-w-2xl font-body text-lg leading-relaxed text-muted-foreground">
              Most festival events are free and open to the public. For $125, the Collector VIP Pass gets you a private artist Meet & Greet, priority seating at the Judge's Lecture, the Collectors Preview Reception and Awards Presentation, and priority seating at the live auction. Prefer a standalone ticket? The lecture is $25 and the Collectors Preview Reception is $95.
            </p>
            <Link
              href="/tickets"
              className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 font-body text-sm font-semibold uppercase tracking-[0.15em] text-primary-foreground shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              View Tickets
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <BrushStrokeDivider className="py-4" />

      {/* Painting Locations */}
      <section id="locations" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <AnimatedSection className="mb-12 text-center">
            <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Where the Art Happens
            </p>
            <h2 className="font-display text-4xl font-bold text-foreground">
              Painting Locations
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-primary/60" />
            <p className="mx-auto mt-4 max-w-2xl font-body text-lg leading-relaxed text-muted-foreground">
              More than 20 scenic spots across Douglas & Sarpy County — historic neighborhoods, parks, overlooks, and everyday places worth a second look.
            </p>
            <p className="mx-auto mt-3 max-w-2xl font-body text-sm leading-relaxed text-muted-foreground">
              Filter by day to see where artists will be painting, then click a pin on the map for location details and directions.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <LocationsMap />
          </AnimatedSection>
        </div>
      </section>

      <BrushStrokeDivider className="py-4" />

      {/* Artist Spotlight */}
      <ArtistSpotlight />

      <BrushStrokeDivider className="py-4" />

      {/* Sponsors */}
      <SponsorsSection />

      {/* FAQ */}
      <section id="faq" className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection className="mb-12 text-center">
            <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Questions?
            </p>
            <h2 className="font-display text-4xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="font-display text-lg font-semibold text-foreground">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-base leading-relaxed text-muted-foreground space-y-4">
                    {faq.a.map((paragraph, pi) => (
                      <p key={pi}>{renderRichText(paragraph)}</p>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-8 text-center">
              <Link
                href="/faq"
                className="inline-flex items-center justify-center rounded-full border-2 border-primary bg-transparent px-7 py-3 font-body text-sm font-semibold uppercase tracking-[0.15em] text-primary transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
              >
                View All FAQs
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact / Newsletter */}
      <div id="contact">
        <NewsletterCTA />
      </div>

      <SiteFooter />
      <BackToTop />
    </div>
  );
};

export default Index;
