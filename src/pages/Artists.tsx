import { useEffect } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import artist1 from "@/assets/artist-1.jpg";
import artist2 from "@/assets/artist-2.jpg";
import artist3 from "@/assets/artist-3.jpg";
import artist4 from "@/assets/artist-4.jpg";
import artist5 from "@/assets/artist-5.jpg";
import artist6 from "@/assets/artist-6.jpg";

const artists = [
  { name: "Hector Acuna", src: artist1, location: "Wisconsin" },
  { name: "Jason Bailey", src: artist2, location: "Kentucky" },
  { name: "Jacalyn Beam", src: artist3, location: "Delaware" },
  { name: "Bob Beck", src: artist4, location: "Wisconsin" },
  { name: "Michele Byrne", src: artist5, location: "New Mexico" },
  { name: "Robin Cheers", src: artist6, location: "Texas" },
  { name: "Larry DeGraff", src: artist1, location: "Kansas" },
  { name: "John Evans", src: artist2, location: "Iowa" },
  { name: "Debra Joy Groesser", src: artist3, location: "Nebraska" },
  { name: "Kristin Hosbein", src: artist4, location: "Michigan" },
  { name: "Ann Larsen", src: artist5, location: "New York" },
  { name: "John Lasater", src: artist6, location: "Arkansas" },
  { name: "Dan Marshall", src: artist1, location: "Colorado" },
  { name: "Fernando Micheli", src: artist2, location: "California" },
  { name: "Brenda Pinnick", src: artist3, location: "Arkansas" },
  { name: "Radhika Srinivas", src: artist4, location: "Pennsylvania" },
  { name: "Steve Stauffer", src: artist5, location: "Utah" },
  { name: "Jill Stefani Wagner", src: artist6, location: "Michigan" },
  { name: "Durre Waseem", src: artist1, location: "California" },
  { name: "Ann Watcher", src: artist2, location: "North Carolina" },
  { name: "Robin Weiss", src: artist3, location: "Washington" },
  { name: "Chris Willey", src: artist4, location: "Missouri" },
  { name: "Jeff Williams", src: artist5, location: "Oklahoma" },
  { name: "Stephen Wysocki", src: artist6, location: "Wisconsin" },
];

const awardsJudge = { name: "Rick J. Delanty", location: "California" };

const Artists = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Artists | Heartland Plein Air Arts Festival";

    const desc =
      "Meet the 25 nationally recognized artists invited to paint the Omaha metro during the Heartland Plein Air Arts Festival, September 13–19, 2026.";

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
    canonical.setAttribute("href", "https://ralston-plein-air.lovable.app/artists");

    return () => {
      canonical?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="pt-24">
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <AnimatedSection>
              <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                The 2026 Roster
              </p>
              <h1 className="font-display text-5xl font-bold text-foreground md:text-6xl">
                Meet the Artists
              </h1>
              <p className="mx-auto mt-6 font-body text-lg leading-relaxed text-muted-foreground">
                Every painter at the Heartland Plein Air Arts Festival is here by invitation. This year, 25 nationally recognized artists travel to the Omaha metro to spend a week painting it — outdoors, on location, in real time. Browse the full roster below, then come find them in the field.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="pb-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {artists.map((artist, i) => (
                <AnimatedSection key={artist.name} delay={i * 80}>
                  <div className="group overflow-hidden rounded-lg bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={artist.src}
                        alt={artist.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <h2 className="font-display text-xl font-semibold text-foreground">
                        {artist.name}
                      </h2>
                      <p className="font-body text-xs font-semibold uppercase tracking-widest text-primary">
                        {artist.location}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <AnimatedSection>
              <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Awards
              </p>
              <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">
                Awards Judge
              </h2>
              <p className="mx-auto mt-6 font-body text-lg leading-relaxed text-muted-foreground">
                <span className="font-display text-xl font-semibold text-foreground">{awardsJudge.name}</span>
                <span className="block font-body text-xs font-semibold uppercase tracking-widest text-primary">
                  {awardsJudge.location}
                </span>
              </p>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Artists;