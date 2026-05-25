import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import CountdownBanner from "@/components/CountdownBanner";
import BackToTop from "@/components/BackToTop";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Globe, Facebook, Instagram, ChevronLeft, ChevronRight } from "lucide-react";
import { artists, awardsJudge, placeholderHeadshot } from "@/data/artists";
import { cn } from "@/lib/utils";

const MEDIUMS = ["All", "Oil", "Watercolor", "Pastel", "Oil & Pastel", "Mixed"] as const;

function matchesMedium(artistMedium: string, filter: string): boolean {
  if (filter === "All") return true;
  return artistMedium === filter;
}

const Artists = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mediumFilter, setMediumFilter] = useState("All");

  const filteredArtists = useMemo(() => {
    let result = artists;
    if (!matchesMedium("All", mediumFilter)) {
      result = result.filter((a) => matchesMedium(a.medium, mediumFilter));
    }
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.location.toLowerCase().includes(q) ||
          a.medium.toLowerCase().includes(q) ||
          a.style.toLowerCase().includes(q),
      );
    }
    return result;
  }, [searchQuery, mediumFilter]);

  // openIndex refers to position in filteredArtists
  const active = openIndex !== null ? filteredArtists[openIndex] : null;

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
      <main id="main-content" tabIndex={-1} className="pt-36">
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
              <a href="#awards-judge" className="mt-4 inline-block font-body text-sm font-semibold uppercase tracking-widest text-primary hover:underline">
                Meet This Year's Judge →
              </a>
            </AnimatedSection>
          </div>
        </section>

        {/* Search + filter bar */}
        <section className="pb-8">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Search */}
              <div className="relative w-full sm:max-w-xs">
                <label htmlFor="artist-search" className="sr-only">Search artists</label>
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  id="artist-search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, state, or style…"
                  className="w-full rounded-full border border-border bg-card py-2 pl-9 pr-4 font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
                />
              </div>
              {/* Medium filter */}
              <div className="flex flex-wrap gap-2">
                {MEDIUMS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMediumFilter(m)}
                    className={cn(
                      "rounded-full border px-3 py-1 font-body text-xs font-semibold transition-colors",
                      mediumFilter === m
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            {filteredArtists.length === 0 && (
              <p className="mt-8 text-center font-body text-sm text-muted-foreground">
                No artists match your search. Try a different keyword or filter.
              </p>
            )}
          </div>
        </section>

        <section className="pb-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredArtists.map((artist, i) => (
                <AnimatedSection key={artist.name} delay={i * 60}>
                  <button
                    type="button"
                    aria-label={`View bio for ${artist.name}`}
                    onClick={() => setOpenIndex(i)}
                    className="group block w-full text-left overflow-hidden rounded-lg bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <div className="aspect-square overflow-hidden relative">
                      <img
                        src={artist.src}
                        alt={artist.alt ?? artist.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ objectPosition: artist.objectPosition ?? "center" }}
                        loading="lazy"
                        onError={(e) => { (e.target as HTMLImageElement).src = placeholderHeadshot; }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                        <span className="font-body text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-wide">
                          View Bio
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h2 className="font-display text-xl font-semibold text-foreground">
                        {artist.name}
                      </h2>
                      <p className="font-body text-xs font-semibold uppercase tracking-widest text-primary">
                        {artist.location}
                      </p>
                      <p className="mt-1.5 font-body text-xs text-muted-foreground">
                        {artist.medium} · {artist.style}
                      </p>
                    </div>
                  </button>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section id="awards-judge" className="scroll-mt-24 pb-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center">
              <AnimatedSection>
                <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Awards
                </p>
                <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">
                  Awards Judge
                </h2>
              </AnimatedSection>
            </div>
            <AnimatedSection>
              <div className="overflow-hidden rounded-lg bg-card shadow-sm">
                <div className="grid md:grid-cols-2">
                  <div className="aspect-square md:aspect-auto overflow-hidden bg-muted">
                    <img
                      src={awardsJudge.src}
                      alt={awardsJudge.alt ?? awardsJudge.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-10">
                    <h3 className="font-display text-2xl font-semibold text-foreground">
                      {awardsJudge.name}
                    </h3>
                    <p className="mt-1 font-body text-xs font-semibold uppercase tracking-widest text-primary">
                      {awardsJudge.location}
                    </p>
                    <p className="mt-1 font-body text-xs text-muted-foreground">
                      {awardsJudge.medium} · {awardsJudge.style}
                    </p>
                    <div className="mt-4 space-y-3">
                      {awardsJudge.bio?.split("\n\n").map((paragraph, idx) => (
                        <p key={idx} className="font-body text-sm leading-relaxed text-muted-foreground">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    <div className="mt-6 flex gap-3">
                      {awardsJudge.website && (
                        <a href={awardsJudge.website} target="_blank" rel="noopener noreferrer" aria-label="Website" className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20">
                          <Globe className="h-5 w-5" />
                        </a>
                      )}
                      {awardsJudge.instagram && (
                        <a href={awardsJudge.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20">
                          <Instagram className="h-5 w-5" />
                        </a>
                      )}
                      {awardsJudge.facebook && (
                        <a href={awardsJudge.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20">
                          <Facebook className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <CountdownBanner />
      <SiteFooter />
      <BackToTop />
      <Dialog open={openIndex !== null} onOpenChange={(o) => !o && setOpenIndex(null)}>
        <DialogContent className="max-w-2xl border-none bg-transparent p-0 shadow-none">
          {active && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenIndex((idx) => idx === null ? idx : (idx - 1 + filteredArtists.length) % filteredArtists.length)}
                aria-label="Previous artist"
                className="absolute -left-14 top-1/2 z-10 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-background text-foreground shadow-lg ring-1 ring-border transition-colors hover:bg-muted"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={() => setOpenIndex((idx) => idx === null ? idx : (idx + 1) % filteredArtists.length)}
                aria-label="Next artist"
                className="absolute -right-14 top-1/2 z-10 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-background text-foreground shadow-lg ring-1 ring-border transition-colors hover:bg-muted"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <div className="overflow-hidden rounded-lg bg-background shadow-lg">
                <div className="grid md:grid-cols-2">
                  <div className="aspect-square md:aspect-auto overflow-hidden bg-muted">
                    <img src={active.src} alt={active.alt ?? active.name} className="h-full w-full object-cover" style={{ objectPosition: active.objectPosition ?? "center" }} />
                  </div>
                  <div className="p-6 md:p-8">
                    <DialogHeader>
                      <DialogTitle className="font-display text-2xl font-semibold text-foreground">
                        {active.name}
                      </DialogTitle>
                      <DialogDescription asChild>
                        <div>
                          <p className="font-body text-xs font-semibold uppercase tracking-widest text-primary">
                            {active.location}
                          </p>
                          <p className="mt-0.5 font-body text-xs text-muted-foreground">
                            {active.medium} · {active.style}
                          </p>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                    {active.bio ? (
                      <div className="mt-4 space-y-3">
                        {active.bio.split("\n\n").map((paragraph, idx) => (
                          <p key={idx} className="font-body text-sm leading-relaxed text-muted-foreground">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-4 font-body text-sm italic leading-relaxed text-muted-foreground">
                        Bio coming soon.
                      </p>
                    )}
                    {(active.website || active.instagram || active.facebook) && (
                      <div className="mt-6 flex gap-3">
                        {active.website && (
                          <a href={active.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20" aria-label="Website">
                            <Globe className="h-5 w-5" />
                          </a>
                        )}
                        {active.instagram && (
                          <a href={active.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20" aria-label="Instagram">
                            <Instagram className="h-5 w-5" />
                          </a>
                        )}
                        {active.facebook && (
                          <a href={active.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20" aria-label="Facebook">
                            <Facebook className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Artists;
