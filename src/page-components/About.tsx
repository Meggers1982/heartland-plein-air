'use client';
import { useEffect } from "react";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import BrushStrokeDivider from "@/components/BrushStrokeDivider";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import NewsletterCTA from "@/components/NewsletterCTA";
import CountdownBanner from "@/components/CountdownBanner";
import BackToTop from "@/components/BackToTop";
import { setPageMeta } from "@/lib/meta";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Learn About the Plein Air Festival: Omaha, NE 2026";
    return setPageMeta(
      "Learn what plein air painting is, how festival week works, and who organizes it. 25 national artists paint the Omaha metro live, Sept. 13–19, 2026.",
    );
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <header className="bg-foreground pt-44 pb-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
            September 13–19, 2026
          </p>
          <h1 className="font-display text-5xl font-bold leading-tight text-secondary md:text-6xl">
            About the Festival
          </h1>
        </div>
      </header>

      {/* Intro */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection>
            <div className="space-y-5 font-body text-lg leading-relaxed text-foreground/85">
              <p>
                Every September, 25 nationally recognized artists spend a week painting the greater Omaha metro area — outdoors, in public, in real time. That's the Heartland Plein Air Festival. No gallery required. Just artists, easels, and the landscape in front of them.
              </p>
              <p>
                The inaugural festival runs <strong>September 13–19, 2026</strong>, with painters working across more than 20 locations in Douglas and Sarpy Counties. You're welcome to follow along.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <BrushStrokeDivider />

      {/* What Is Plein Air */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection>
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              The Art Form
            </p>
            <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground">
              What Is Plein Air?
            </h2>
            <div className="space-y-5 font-body text-lg leading-relaxed text-foreground/85">
              <p>
                <em className="font-display text-primary">Plein air</em> is French for "open air." It's the practice of painting outside, on location, responding to whatever the light, weather, and surroundings are doing right now. The technique goes back to the Impressionists — Monet, Pissarro — artists who believed you couldn't really paint a place from memory. You had to stand in it.
              </p>
              <p>
                Plein air painters typically work fast, capturing a scene in an hour or two before conditions change. The results are loose, alive, and specific to a moment that won't happen again.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Festival Week */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection>
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              The Experience
            </p>
            <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground">
              Festival Week
            </h2>
            <div className="space-y-5 font-body text-lg leading-relaxed text-foreground/85">
              <p>
                Artists spread out across the metro each day to paint. The public is free to follow along, watch them work, and ask questions — that's part of the point. Throughout the week, artists also give lectures at Ralston Public Schools and lead workshops for children in foster care.
              </p>
              <p>
                The week closes with a public exhibition and auction on September 19, where paintings created during the festival go on display and are available for purchase. A separate Collectors Preview Reception and Awards Presentation on September 18 gives collectors early access to the collection.
              </p>
              <p>
                Every piece is painted on-site during festival week, so every piece is one of a kind.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <BrushStrokeDivider />

      {/* About the Organizers */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection>
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Behind the Scenes
            </p>
            <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground">
              About the Organizers
            </h2>
            <div className="space-y-5 font-body text-lg leading-relaxed text-foreground/85">
              <p>
                The festival is presented by the <a href="https://ralstonarts.org/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">Ralston HINGE Creative District</a>, a 501(c)(3) nonprofit that uses arts and culture to drive economic growth in Ralston. The district was founded in 2021 and is led by Debra Joy Groesser, owner of <a href="https://www.debrajoygroesserfineart.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">Debra Joy Groesser Fine Art</a>, and the Ralston HINGE Creative District Board. The board consists of local business and civic leaders and volunteers.
              </p>
              <p>
                In addition to the{" "}
                <a href="https://www.artscouncil.nebraska.gov/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
                  Nebraska Arts Council
                </a>
                , the festival is{" "}
                <Link href="/sponsors" className="font-semibold text-primary hover:underline">
                  supported by funding
                </Link>{" "}
                from the{" "}
                <a href="https://nebraskaculturalendowment.org/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
                  Nebraska Cultural Endowment
                </a>
                , The Wiebe Ralston Foundation,{" "}
                <a href="https://visitnebraska.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
                  Visit Nebraska
                </a>
                , and the Sherwood Foundation.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CountdownBanner />
      <NewsletterCTA />
      <SiteFooter />
      <BackToTop />
    </div>
  );
};

export default About;
