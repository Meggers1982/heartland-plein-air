import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import NewsletterCTA from "@/components/NewsletterCTA";
import CountdownBanner from "@/components/CountdownBanner";
import BackToTop from "@/components/BackToTop";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { setPageMeta } from "@/lib/meta";
import { galleryArtists, allPaintings } from "@/data/gallery";

const Gallery = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const active = openIndex !== null ? allPaintings[openIndex] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Gallery | Heartland Plein Air Arts Festival";
    return setPageMeta(
      "Browse paintings by all 23 artists in the Heartland Plein Air Arts Festival, September 13–19, 2026.",
    );
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (openIndex === null) return;
      if (e.key === "ArrowRight")
        setOpenIndex((i) => (i === null ? i : (i + 1) % allPaintings.length));
      if (e.key === "ArrowLeft")
        setOpenIndex((i) =>
          i === null ? i : (i - 1 + allPaintings.length) % allPaintings.length,
        );
      if (e.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [openIndex]);

  // Prevent body scroll when lightbox is open
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
      i === null ? i : (i - 1 + allPaintings.length) % allPaintings.length,
    );
  const next = () =>
    setOpenIndex((i) => (i === null ? i : (i + 1) % allPaintings.length));

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <main className="pt-24">
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
                A glimpse of the artists you'll find painting across the Omaha metro this September. Click any painting to get a closer look.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Artist jump links — sticky below nav */}
        <div className="sticky top-[72px] z-40 border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="mx-auto max-w-6xl px-6 py-3">
            <div className="flex flex-wrap gap-2">
              {galleryArtists.map((artist) => (
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

        {/* Artist sections */}
        {galleryArtists.map((artist, ai) => (
          <section
            key={artist.slug}
            id={artist.slug}
            className="scroll-mt-32 border-t border-border py-16"
          >
            <div className="mx-auto max-w-6xl px-6">
              <AnimatedSection>
                <h2 className="mb-8 font-display text-3xl font-bold text-foreground">
                  {artist.name}
                </h2>
              </AnimatedSection>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {artist.paintings.map((painting, pi) => {
                  const globalIndex =
                    galleryArtists
                      .slice(0, ai)
                      .reduce((sum, a) => sum + a.paintings.length, 0) + pi;
                  return (
                    <AnimatedSection key={painting.filename} delay={pi * 80}>
                      <button
                        type="button"
                        onClick={() => setOpenIndex(globalIndex)}
                        className="group block w-full overflow-hidden rounded-lg bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <img
                            src={`/artwork/${painting.filename}`}
                            alt={painting.alt}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 flex items-end bg-black/0 transition-colors duration-300 group-hover:bg-black/40">
                            <div className="w-full translate-y-full px-4 pb-3 transition-transform duration-300 group-hover:translate-y-0">
                              <p className="font-display text-sm font-semibold text-white drop-shadow">
                                {painting.title}
                              </p>
                            </div>
                          </div>
                        </div>
                      </button>
                    </AnimatedSection>
                  );
                })}
              </div>
            </div>
          </section>
        ))}
      </main>

      <CountdownBanner />
      <NewsletterCTA />
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
                className="absolute -left-14 top-1/2 z-10 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-background text-foreground shadow-lg ring-1 ring-border transition-colors hover:bg-muted"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next painting"
                className="absolute -right-14 top-1/2 z-10 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-background text-foreground shadow-lg ring-1 ring-border transition-colors hover:bg-muted"
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
                      <DialogDescription className="font-body text-xs font-semibold uppercase tracking-widest text-primary">
                        {active.artistName}
                      </DialogDescription>
                    </DialogHeader>
                    <p className="mt-6 font-body text-xs text-muted-foreground">
                      {openIndex !== null ? openIndex + 1 : 0} / {allPaintings.length}
                    </p>
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
