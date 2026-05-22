import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import CountdownBanner from "@/components/CountdownBanner";
import GallerySection from "@/components/GallerySection";
import BrushStrokeDivider from "@/components/BrushStrokeDivider";
import ScheduleSection from "@/components/ScheduleSection";
import ArtistsSection from "@/components/ArtistsSection";
import SponsorsSection from "@/components/SponsorsSection";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

const highlights = [
  {
    icon: Users,
    title: "25 National Artists",
    description:
      "Approximately 25 nationally recognized painters will converge on the greater metro area for a week of outdoor painting.",
  },
  {
    icon: MapPin,
    title: "20+ Scenic Locations",
    description:
      "From historic neighborhoods to scenic vistas, artists will paint at more than 20 locations across Douglas and Sarpy County.",
  },
  {
    icon: Eye,
    title: "Watch Artists Create",
    description:
      "Visitors are encouraged to explore painting sites, observe artists at work, and experience the creative process up close.",
  },
  {
    icon: ShoppingBag,
    title: "Exhibition & Auction",
    description:
      "The festival culminates in a public exhibition and auction where attendees can purchase original works created during the week.",
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

  const scrollToHash = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

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
            Art, out in the open. Experience nationally recognized artists
            painting the beauty of Douglas & Sarpy County.
          </p>
          <div
            className={`flex flex-wrap gap-4 transition-all duration-700 ${heroLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            style={{ transitionDelay: "800ms" }}
          >
            <a
              href="#about"
              onClick={(e) => scrollToHash(e, "#about")}
              className="inline-flex items-center rounded bg-primary px-6 py-3 font-body text-sm font-semibold tracking-wide text-primary-foreground transition-all hover:opacity-90 hover:scale-105"
            >
              Learn More
            </a>
            <a
              href="#highlights"
              onClick={(e) => scrollToHash(e, "#highlights")}
              className="inline-flex items-center rounded border border-secondary/40 px-6 py-3 font-body text-sm font-semibold tracking-wide text-secondary transition-all hover:bg-secondary/10 hover:scale-105"
            >
              Festival Highlights
            </a>
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
              Painting the Spirit of a Community
            </h2>
            <div className="space-y-4 font-body text-base leading-relaxed text-muted-foreground">
              <p>
                "Plein air" is a French term meaning "open air." Unlike studio
                painting, plein air artists create their work outdoors,
                capturing the light, atmosphere, architecture, and natural
                beauty of a place in real time. This immersive approach results
                in vibrant, one-of-a-kind pieces that reflect the true spirit
                of a community.
              </p>
              <p>
                Throughout the week, approximately 25 nationally recognized
                artists will paint at more than 20 scenic locations across
                Douglas County and Sarpy County. These will include historic
                neighborhoods, tourist attractions, scenic vistas, and more.
                Visitors are encouraged to explore these sites, observe the
                artists at work, and experience the creative process up close.
              </p>
              <p>
                The festival culminates in a public exhibition and auction,
                where attendees can view the complete collection and purchase
                original works that showcase the beauty and character of the
                greater metro area. Each painting is created on-site during the
                festival, making every piece a unique and lasting tribute to the
                region.
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
      <section id="highlights" className="bg-secondary/50 py-24">
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
      <div className="bg-secondary/50 pb-16 text-center">
        <Link
          to="/schedule"
          className="inline-flex items-center rounded bg-primary px-6 py-3 font-body text-sm font-semibold tracking-wide text-primary-foreground transition-all hover:opacity-90 hover:scale-105"
        >
          View Full Schedule
        </Link>
      </div>

      <BrushStrokeDivider className="py-4" />

      {/* Artists */}
      <ArtistsSection />

      <BrushStrokeDivider className="py-4" />

      {/* Gallery */}
      <GallerySection />

      <BrushStrokeDivider className="py-4" />

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
      <section id="contact" className="bg-foreground py-20">
        <AnimatedSection className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-background">
            Stay in the Loop
          </h2>
          <p className="mb-8 font-body text-base text-background/70">
            Sign up for updates about the Heartland Plein Air Arts Festival,
            including artist announcements, event schedules, and more.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 rounded border border-background/20 bg-background/10 px-4 py-3 font-body text-sm text-background placeholder:text-background/40 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="rounded bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 hover:scale-105"
            >
              Subscribe
            </button>
          </form>
        </AnimatedSection>
      </section>
      {/* Sponsors */}
      <SponsorsSection />

      <SiteFooter />
    </div>
  );
};

export default Index;
