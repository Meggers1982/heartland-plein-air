import { useEffect } from "react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { addJsonLd, organizationSchema, breadcrumbSchema } from "@/lib/schema";
import { setPageMeta } from "@/lib/meta";
import BrushStrokeDivider from "@/components/BrushStrokeDivider";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import CountdownBanner from "@/components/CountdownBanner";
import BackToTop from "@/components/BackToTop";

const About = () => {
  useEffect(() => {
    return addJsonLd("about-jsonld", {
      "@context": "https://schema.org",
      "@graph": [
        {
          ...organizationSchema,
          description:
            "A 501(c)(3) nonprofit founded in 2021 that uses arts and culture to drive economic growth in Ralston, Nebraska. Presents the annual Heartland Plein Air Arts Festival.",
        },
        breadcrumbSchema("About", "/about"),
      ],
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "About the Festival | Heartland Plein Air Arts Festival";
    return setPageMeta(
      "Learn how nationally acclaimed artists, a Nebraska Arts Council grant, and Ralston's HINGE Creative District come together for a week of outdoor painting across the Omaha metro, September 13–19, 2026.",
    );
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <header id="main-content" tabIndex={-1} className="bg-foreground pt-44 pb-16">
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
                Every September, nationally recognized artists spend a week painting the greater Omaha metro — outdoors, in public, in real time. <em className="font-display text-primary">Plein air</em> is French for "open air": no studio, no reference photos, just an artist standing in a place and responding to the light as it actually is. The inaugural Heartland Plein Air Arts Festival runs <strong>September 13–19, 2026</strong>, with painters working across more than 20 locations in Douglas and Sarpy Counties.
              </p>
              <p>
                Every painting is created on-site during festival week. Every one is one of a kind.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stat strip */}
      <section className="border-y border-border bg-muted py-10">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedSection>
            <div className="grid grid-cols-3 gap-8 text-center">
              {[
                { value: "20", label: "States Represented" },
                { value: "20+", label: "Painting Locations" },
                { value: "$10,000+", label: "in Awards" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-display text-4xl font-bold text-primary">{value}</p>
                  <p className="mt-1 font-body text-sm font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <BrushStrokeDivider />

      {/* The Mission */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection>
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              The Mission
            </p>
            <h2 className="mb-6 font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
              Putting Ralston on the Map
            </h2>
            <div className="space-y-5 font-body text-lg leading-relaxed text-foreground/85">
              <p>
                The Heartland Plein Air Arts Festival is more than an art event. It's part of a deliberate effort to put Ralston on the national map as an arts destination — and to demonstrate that culture is a genuine driver of economic growth.
              </p>
              <p>
                Ralston was one of just 13 communities in Nebraska selected to receive a Creative District Development Grant from the Nebraska Arts Council — a program built on the idea that arts and culture can attract visitors, create jobs, retain young people, and revitalize communities. The festival is the flagship event of Ralston's HINGE Creative District and is built around that mission.
              </p>
              <p>
                Throughout the week, invited artists don't just paint — they lead educational workshops for students and foster children, bringing the discipline of plein air directly into the lives of young people across the community.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Festival Week */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection>
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              The Experience
            </p>
            <h2 className="mb-6 font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
              A Week in the Open Air
            </h2>
            <div className="space-y-5 font-body text-lg leading-relaxed text-foreground/85">
              <p>
                Artists spread out across the metro each day to paint wherever the landscape moves them. The public is free to follow along, watch them work, and ask questions — that's part of the point. Lunchtime and evening Quick Paint competitions bring the full invited roster to a single location, racing the clock to finish a painting in front of a live audience. It's one of the most electric things to witness at any plein air festival.
              </p>
              <p>
                The festival also includes an Open Division, giving additional artists the opportunity to compete alongside the invited roster. Over $10,000 in awards will be presented by Judge Rick J. Delanty — AIS, OPA, LPAPA, ASMA, and ARC Salon Living Master.
              </p>
              <p>
                The week closes with two signature events: the ticketed <strong>Collector's Soirée on September 18</strong>, offering collectors early access to the full collection with live music, food, and the awards ceremony — followed by the free <strong>Public Exhibition and Auction on September 19</strong>, where every painting created during festival week goes on display and is available for purchase by anyone.
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
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Behind the Festival
            </p>
            <h2 className="mb-6 font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
              The Ralston HINGE Creative District
            </h2>
            <div className="space-y-5 font-body text-lg leading-relaxed text-foreground/85">
              <p>
                The festival is presented by the{" "}
                <a href="https://ralstonarts.org/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
                  Ralston HINGE Creative District
                </a>
                , a 501(c)(3) nonprofit founded in 2021 that uses arts and culture to drive economic growth in Ralston. The district is chaired by Deb Groesser, owner of{" "}
                <a href="https://www.debrajoygroesserfineart.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
                  Debra Joy Groesser Fine Art
                </a>
                , who has worked to bring this festival to life for years.
              </p>
              <p>
                The festival is supported by the Benson Creative District, Historic Dundee Creative District, Castle &amp; Cathedral Creative District, Visit Nebraska, the Wiebe Ralston Foundation, the Nebraska Arts Council, and the Nebraska Cultural Endowment.
              </p>
            </div>

            <blockquote className="mt-10 border-l-4 border-primary pl-6">
              <p className="font-display text-xl font-semibold leading-relaxed text-foreground">
                "This event will place Ralston on the national map for art destinations, bringing in plein air art enthusiasts from across the country. It is a tremendous honor to host such an event."
              </p>
              <footer className="mt-3 font-body text-sm font-semibold uppercase tracking-widest text-primary">
                — Mayor Donald Groesser, City of Ralston
              </footer>
            </blockquote>
          </AnimatedSection>
        </div>
      </section>

      {/* CTAs */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <AnimatedSection>
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
              Ready to Explore?
            </h2>
            <p className="mb-8 font-body text-lg text-muted-foreground">
              Browse the full roster of invited artists or view the complete schedule of events.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                to="/artists"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-widest text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90"
              >
                Meet the Artists
              </Link>
              <Link
                to="/schedule"
                className="inline-flex items-center justify-center rounded-full border-2 border-primary/40 px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-widest text-primary transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                View the Schedule
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CountdownBanner />
      <SiteFooter />
      <BackToTop />
    </div>
  );
};

export default About;
