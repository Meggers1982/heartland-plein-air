import { useEffect, useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import artist1 from "@/assets/artist-1.jpg";
import artist2 from "@/assets/artist-2.jpg";
import artist3 from "@/assets/artist-3.jpg";
import artist4 from "@/assets/artist-4.jpg";
import artist5 from "@/assets/artist-5.jpg";
import artist6 from "@/assets/artist-6.jpg";
import jacalynBeam from "@/assets/artists/jacalyn-beam.webp";
import hectorAcuna from "@/assets/artists/hector-acuna.webp";
import jasonBailey from "@/assets/artists/jason-bailey.webp";
import bobBeck from "@/assets/artists/bob-beck.webp";
import micheleByrne from "@/assets/artists/michele-byrne.webp";
import robinCheers from "@/assets/artists/robin-cheers.webp";
import larryDeGraff from "@/assets/artists/larry-degraff.webp";
import johnEvans from "@/assets/artists/john-evans.webp";
import debraJoyGroesser from "@/assets/artists/debra-joy-groesser.webp";
import kristinHosbein from "@/assets/artists/kristin-hosbein.webp";
import annLarsen from "@/assets/artists/ann-larsen.webp";
import johnLasater from "@/assets/artists/john-lasater.webp";
import danMarshall from "@/assets/artists/dan-marshall.webp";
import fernandoMicheli from "@/assets/artists/fernando-micheli.webp";
import brendaPinnick from "@/assets/artists/brenda-pinnick.webp";
import radhikaSrinivas from "@/assets/artists/radhika-srinivas.webp";
import steveStauffer from "@/assets/artists/steve-stauffer.webp";
import jillStefaniWagner from "@/assets/artists/jill-stefani-wagner.webp";
import durreWaseem from "@/assets/artists/durre-waseem.webp";
import annWatcher from "@/assets/artists/ann-watcher.webp";
import robinWeiss from "@/assets/artists/robin-weiss.webp";
import chrisWilley from "@/assets/artists/chris-willey.webp";
import jeffWilliams from "@/assets/artists/jeff-williams.webp";
import stephenWysocki from "@/assets/artists/stephen-wysocki.webp";

const artists = [
  { name: "Hector Acuna", src: artist1, location: "Wisconsin" },
  { name: "Jason Bailey", src: artist2, location: "Kentucky" },
  { name: "Jacalyn Beam", src: jacalynBeam, location: "Delaware" },
  { name: "Bob Beck", src: artist4, location: "Wisconsin" },
  { name: "Michele Byrne", src: artist5, location: "New Mexico" },
  { name: "Robin Cheers", src: artist6, location: "Texas" },
  { name: "Larry DeGraff", src: artist1, location: "Kansas" },
  { name: "John Evans", src: artist2, location: "Iowa" },
  { name: "Debra Joy Groesser", src: artist3, location: "Nebraska" },
  { name: "Kristin K. Hosbein", src: artist4, location: "Michigan", bio: "Kristin K. Hosbein is an award-winning contemporary impressionist painter based in St. Joseph, Michigan. Painting en plein air since 2009, she's known for capturing fleeting light and atmosphere through expressive brushwork and luminous color — whether she's painting a quiet marina, vibrant blooms, or sunlit woodland scenes.\n\nA member of the American Impressionist Society and Oil Painters of America, Kristin has participated in plein air events across the U.S. and internationally. As a member of the United States Coast Guard Artist Program, her work is held in the national collection in Washington, D.C." },
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const active = openIndex !== null ? artists[openIndex] : null;
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
                  <button
                    type="button"
                    onClick={() => setOpenIndex(i)}
                    className="group block w-full text-left overflow-hidden rounded-lg bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
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
                  </button>
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
      <Dialog open={openIndex !== null} onOpenChange={(o) => !o && setOpenIndex(null)}>
        <DialogContent className="max-w-2xl overflow-hidden p-0">
          {active && (
            <div className="grid md:grid-cols-2">
              <div className="aspect-square md:aspect-auto overflow-hidden bg-muted">
                <img src={active.src} alt={active.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-6 md:p-8">
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl font-semibold text-foreground">
                    {active.name}
                  </DialogTitle>
                  <DialogDescription className="font-body text-xs font-semibold uppercase tracking-widest text-primary">
                    {active.location}
                  </DialogDescription>
                </DialogHeader>
                {active.bio ? (
                  <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground">
                    {active.bio}
                  </p>
                ) : (
                  <p className="mt-4 font-body text-sm italic leading-relaxed text-muted-foreground">
                    Bio coming soon.
                  </p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Artists;