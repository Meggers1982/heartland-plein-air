import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import CountdownBanner from "@/components/CountdownBanner";
import BackToTop from "@/components/BackToTop";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { setPageMeta } from "@/lib/meta";
import { addJsonLd, SITE_URL, breadcrumbSchema } from "@/lib/schema";
import { galleryArtists } from "@/data/gallery";
import { cn } from "@/lib/utils";

const MEDIUMS = ["All", "Oil", "Watercolor", "Pastel", "Oil & Pastel", "Mixed"] as const;

const Gallery = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mediumFilter, setMediumFilter] = useState("All");

  const filteredArtists = useMemo(
    () =>
      mediumFilter === "All"
        ? galleryArtists
        : galleryArtists.filter((a) => a.medium === mediumFilter),
    [mediumFilter],
  );

  const filteredPaintings = useMemo(
    () =>
      filteredArtists.flatMap((a) =>
        a.paintings.map((p) => ({
          ...p,
          artistName: a.name,
          artistSlug: a.slug,
          medium: a.medium,
        })),
      ),
    [filteredArtists],
  );

  const active = openIndex !== null ? filteredPaintings[openIndex] : null;

  useEffect(() => {
    setOpenIndex(null);
  }, [mediumFilter]);

  useEffect(() => {
    return addJsonLd("gallery-jsonld", {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          name: "Artist Gallery — Heartland Plein Air Arts Festival",
          description:
            "Portfolio paintings from the invited artists of the Heartland Plein Air Arts Festival, coming to the Omaha metro September 13–19, 2026.",
          url: `${SITE_URL}/gallery`,
          creator: { "@id": `${SITE_URL}/#organization` },
          isPartOf: { "@type": "WebSite", url: SITE_URL, name: "Heartland Plein Air Arts Festival" },
        },
        breadcrumbSchema("Gallery", "/gallery"),
      ],
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Artist Gallery | Heartland Plein Air Arts Festival";
    return setPageMeta(
      "Browse portfolio paintings from the invited artists of the Heartland Plein Air Arts Festival — coming to the Omaha metro September 13–19, 2026.",
    );
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (openIndex === null) return;
      if (e.key === "ArrowRight")
        setOpenIndex((i) => (i === null ? i : (i + 1) % filteredPaintings.length));
      if (e.key === "ArrowLeft")
        setOpenIndex((i) =>
          i === null ? i : (i - 1 + filteredPaintings.length) % filteredPaintings.length,
        );
      if (e.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [openIndex, filteredPaintings.length]);

  useEffect(() => {
    document.body.style.overflow = openIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [openIndex]);

  const scrollToArtist = (slug: string) => {
    const el = document.getElementById(slug);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 112;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const prev = () =>
    setOpenIndex((i) =>
      i === null ? i : (i - 1 + filteredPaintings.length) % filteredPaintings.length,
    );
  const next = () =>
    setOpenIndex((i) => (i === null ? i : (i + 1) % filteredPaintings.length));

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <main id="main-content" tabIndex={-1} className="pt-36">
        {/* Header */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <AnimatedSection>
              <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                2026 Festival Art
              </p>
              <h1 className="font-display text-5xl font-bold text-foreground md:text-6xl">
                The Gallery
              </h1>
              <p className="mx-auto mt-6 font-body text-lg leading-relaxed text-muted-foreground">
                Get a glimpse of the art created by the artists you'll see across the Omaha metro this September.
              </p>
              <p className="mx-auto mt-4 font-body text-lg leading-relaxed text-muted-foreground">
                Want to know more about each artist? Visit our{" "}
                <Link to="/artists" className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                  Artists page
                </Link>
                {" "}to read bios and see their full profiles.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Sticky nav: medium filter + artist jump links */}
        <div className="sticky top-[72px] z-40 border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="mx-auto max-w-6xl space-y-2 px-6 py-3">
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
            {/* Artist jump links */}
            <div className="flex flex-wrap gap-2">
              {filteredArtists.map((artist) => (
                <button
                  key={artist.slug}
                  type="button"
                  onClick={() => scrollToArtist(artist.slug)}
                  className="rounded-full border border-border bg-card px-3 py-1 font-body text-xs font-semibold text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  {artist.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredArtists.length === 0 && (
          <p className="py-16 text-center font-body text-sm text-muted-foreground">
            No artists match this filter.
          </p>
        )}

        {/* Artist sections */}
        {filteredArtists.map((artist, ai) => (
          <section
            key={artist.slug}
            id={artist.slug}
            className="scroll-mt-32 border-t border-border py-16"
          >
            <div className="mx-auto max-w-6xl px-6">
              <AnimatedSection>
                <div className="mb-8 flex items-baseline gap-3">
                  <h2 className="font-display text-3xl font-bold text-foreground">
                    {artist.name}
                  </h2>
                  <span className="font-body text-xs font-semibold uppercase tracking-widest text-primary">
                    {artist.medium}
                  </span>
                </div>
              </AnimatedSection>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                {artist.paintings.map((painting, pi) => {
                  const globalIndex =
                    filteredArtists
                      .slice(0, ai)
                      .reduce((sum, a) => sum + a.paintings.length, 0) + pi;
                  return (
                    <AnimatedSection key={painting.filename} delay={pi * 80}>
                      <div className="overflow-hidden rounded-lg bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                        <button
                          type="button"
                          aria-label={`${painting.title} by ${artist.name} — view larger`}
                          onClick={() => setOpenIndex(globalIndex)}
                          className="group block w-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                        >
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <img
                              src={`/artwork/${painting.filename}`}
                              alt={painting.alt}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                              decoding="async"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
                              <span className="font-body text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                View larger
                              </span>
                            </div>
                          </div>
                        </button>
                        <h3 className="px-3 pb-3 pt-2 font-display text-base font-semibold text-foreground">
                          {painting.title}
                        </h3>
                      </div>
                    </AnimatedSection>
                  );
                })}
              </div>
            </div>
          </section>
        ))}
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
                onClick={prev}
                aria-label="Previous painting"
                className="absolute -left-14 top-1/2 z-10 -translate-y-1/2 hidden md:inline-flex h-12 w-12 items-center justify-center rounded-full bg-background text-foreground shadow-lg ring-1 ring-border transition-colors hover:bg-muted"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next painting"
                className="absolute -right-14 top-1/2 z-10 -translate-y-1/2 hidden md:inline-flex h-12 w-12 items-center justify-center rounded-full bg-background text-foreground shadow-lg ring-1 ring-border transition-colors hover:bg-muted"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <div className="overflow-hidden rounded-lg bg-background shadow-lg">
                <div className="grid md:grid-cols-2">
                  <div className="aspect-square md:aspect-auto overflow-hidden bg-muted">
                    <img
                      src={`/artwork/${active.filename}`}
                      alt={active.alt}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <DialogHeader>
                      <DialogTitle className="font-display text-2xl font-semibold text-foreground">
                        {active.title}
                      </DialogTitle>
                      <DialogDescription asChild>
                        <div>
                          <p className="font-body text-xs font-semibold uppercase tracking-widest text-primary">
                            {active.artistName}
                          </p>
                          <p className="mt-0.5 font-body text-xs text-muted-foreground">
                            {active.medium}
                          </p>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                      <button
                        type="button"
                        onClick={prev}
                        aria-label="Previous painting"
                        className="inline-flex items-center gap-1 font-body text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground md:hidden"
                      >
                        <ChevronLeft className="h-4 w-4" /> Prev
                      </button>
                      <p className="font-body text-xs text-muted-foreground">
                        {openIndex !== null ? openIndex + 1 : 0} / {filteredPaintings.length}
                      </p>
                      <button
                        type="button"
                        onClick={next}
                        aria-label="Next painting"
                        className="inline-flex items-center gap-1 font-body text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground md:hidden"
                      >
                        Next <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
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

export default Gallery;
