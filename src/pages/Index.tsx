import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-pleinair.jpg";
import artistImage from "@/assets/artist-painting.jpg";
import { MapPin, Users, Eye, ShoppingBag } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AnimatedSection from "@/components/AnimatedSection";
import { Link } from "react-router-dom";
import CountdownBanner from "@/components/CountdownBanner";
import GallerySection from "@/components/GallerySection";
import BrushStrokeDivider from "@/components/BrushStrokeDivider";
import ScheduleSection from "@/components/ScheduleSection";
import ArtistSpotlight from "@/components/ArtistSpotlight";
import LocationsMap from "@/components/LocationsMap";
import SponsorsSection from "@/components/SponsorsSection";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import NewsletterCTA from "@/components/NewsletterCTA";

const highlights = [
  {
    icon: Users,
    title: "25 National Artists",
    description:
      "25 nationally recognized painters, working outdoors across the metro for a full week.",
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

const faqs = [
  {
    q: "What is plein air painting?",
    a: '"Plein air" is a French term meaning "open air." Unlike studio painting, plein air artists create their work outdoors, capturing the light, atmosphere, architecture, and natural beauty of a place in real time.',
  },
  {
    q: "Where will the artists be painting?",
    a: "Artists will paint at more than 20 scenic locations across Douglas County and Sarpy County, including historic neighborhoods, tourist attractions, scenic vistas, and more.",
  },
  {
    q: "Can I watch the artists paint?",
    a: "Absolutely! Visitors are encouraged to explore painting sites, observe the artists at work, and experience the creative process up close throughout the week.",
  },
  {
    q: "How can I purchase a painting?",
    a: "The festival culminates in a public exhibition and auction where attendees can view the complete collection and purchase original works. Each painting is created on-site during the festival.",
  },
  {
    q: "Is there an admission fee?",
    a: "Many events during the festival are free and open to the public. Details about ticketed events will be announced as the festival approaches.",
  },
];

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
      <section className="relative flex min-h-screen items-end overflow-hidden">
        <img
          src={heroImage}
          alt="Plein air painting of the heartland landscape at golden hour"
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
            Heartland Plein Air Arts Festival
          </h1>
          <p
            className={`mb-8 max-w-xl font-body text-lg font-light leading-relaxed text-secondary/85 transition-all duration-700 ${heroLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            style={{ transitionDelay: "600ms" }}
          >
            Art, out in the open. Twenty-five nationally recognized artists,
            painting Douglas and Sarpy County exactly as it looks in September.
          </p>
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
            <div className="space-y-4 font-body text-base leading-relaxed text-muted-foreground">
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
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <div className="overflow-hidden rounded-lg shadow-xl transition-transform duration-500 hover:scale-[1.02]">
              <img
                src={artistImage}
                alt="An artist painting outdoors at an easel on a charming street"
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

      {/* Schedule */}
      <ScheduleSection />

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
            <p className="mx-auto mt-4 max-w-2xl font-body text-base leading-relaxed text-muted-foreground">
              More than 20 scenic spots across Douglas & Sarpy County — historic neighborhoods, parks, overlooks, and everyday places worth a second look.
            </p>
            <p className="mx-auto mt-3 max-w-2xl font-body text-sm leading-relaxed text-muted-foreground/80">
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

      {/* Gallery */}
      <GallerySection />

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
                  <AccordionContent className="font-body text-base leading-relaxed text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact / Newsletter */}
      <div id="contact">
        <NewsletterCTA />
      </div>

      <SiteFooter />
    </div>
  );
};

export default Index;
