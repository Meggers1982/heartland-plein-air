import { useEffect } from "react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import BrushStrokeDivider from "@/components/BrushStrokeDivider";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "About | Heartland Plein Air Arts Festival";

    const desc =
      "Learn about the Heartland Plein Air Arts Festival — a week of outdoor painting across Douglas and Sarpy County, September 13–19, 2026.";

    const ensureMeta = (name: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      return el;
    };
    ensureMeta("description").setAttribute("content", desc);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://ralston-plein-air.lovable.app/about");

    return () => {
      canonical?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <header className="bg-foreground pt-32 pb-16">
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
                Every September, 25 nationally recognized artists spend a week painting the greater Omaha metro area — outdoors, in public, in real time. That's the Heartland Plein Air Arts Festival. No gallery required. Just artists, easels, and the landscape in front of them.
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
              What Is Plein Air
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
                The week closes with a <strong>public exhibition and auction on September 19</strong>, where every painting created during the festival goes on display and is available for purchase. A separate <strong>Collector's Soirée</strong> on the same day gives collectors early access to the full collection.
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
                The festival is presented by the <strong>Ralston HINGE Creative District</strong>, a 501(c)(3) nonprofit that uses arts and culture to drive economic growth in Ralston. The district was founded in 2021 and is led by <strong>Deb Groesser</strong>, owner of Debra Joy Groesser Fine Art.
              </p>
              <p>
                It's also grant-supported: Ralston was selected as one of just 13 recipients of a <strong>Nebraska Arts Council Creative District Development Grant</strong> — funding designed for projects that attract visitors, create jobs, and strengthen Nebraska communities.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default About;
