'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SiteNav from "@/components/SiteNav";
import NewsletterCTA from "@/components/NewsletterCTA";
import CountdownBanner from "@/components/CountdownBanner";
import BackToTop from "@/components/BackToTop";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { stegaClean } from "@sanity/client/stega";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { urlFor } from "@/sanity/lib/image";
import type { Artist } from "@/sanity/queries/artists";

type MediumFilter = "all" | "oil-and-pastel" | "watercolor";

const mediumTabs: { value: MediumFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "oil-and-pastel", label: "Oil & Pastel" },
  { value: "watercolor", label: "Watercolor" },
];

type FlatPainting = {
  _key: string;
  image: NonNullable<Artist["paintings"]>[number]["image"];
  title: string;
  alt: string;
  artistName: string;
  artistSlug: string;
};

const Gallery = ({ galleryArtists }: { galleryArtists: Artist[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mediumFilter, setMediumFilter] = useState<MediumFilter>("all");

  const allPaintings: FlatPainting[] = galleryArtists.flatMap((a) =>
    (a.paintings ?? []).map((p) => ({
      ...p,
      artistName: a.name,
      artistSlug: a.slug,
    })),
  );
  const active = openIndex !== null ? allPaintings[openIndex] : null;

  const filteredArtists = mediumFilter === "all"
    ? galleryArtists
    : galleryArtists.filter((a) => stegaClean(a.medium) === mediumFilter);

  useEffect(() => {
    window.scrollTo(0, 0);
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
  }, [openIndex, allPaintings.length]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = openIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [openIndex]);

  const GALLERY_STICKY_BAR_TOP = 72;

  const scrollToArtist = (slug: string) => {
    const section = document.getElementById(slug);
    if (!section) return;
    const heading = section.querySelector("h2") ?? section;
    const stickyBar = document.getElementById("gallery-jump-bar");
    // Use offsetHeight (layout height, stable whether or not the bar is
    // currently "stuck") rather than getBoundingClientRect(), which
    // reflects the bar's natural in-flow position until scroll passes it.
    const barHeight = stickyBar?.offsetHeight ?? 40;
    const offset = GALLERY_STICKY_BAR_TOP + barHeight + 20;
    const top = heading.getBoundingClientRect().top + window.scrollY - offset;
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
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [breadcrumbSchema([{ name: "Gallery", path: "/gallery" }])],
        }}
      />
      <SiteNav />

      <header className="bg-foreground pt-52 pb-16 md:pt-56">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
            2026 Festival Art
          </p>
          <h1 className="font-display text-5xl font-bold leading-tight text-secondary md:text-6xl">
            The Gallery
          </h1>
        </div>
      </header>

      <main>
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <AnimatedSection>
              <p className="mx-auto font-body text-lg leading-relaxed text-muted-foreground">
                Get a glimpse of the art created by the artists you'll see across the Omaha metro this September.
              </p>
              <p className="mx-auto mt-4 font-body text-lg leading-relaxed text-muted-foreground">
                Want to know more about each artist? Visit our{" "}
                <Link href="/artists" className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                  Artists page
                </Link>
                {" "}to read bios and see their full profiles.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Medium filter tabs + artist jump links — sticky below nav */}
        <div id="gallery-jump-bar" className="sticky top-[72px] z-40 border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="mx-auto max-w-6xl px-6 pt-3 pb-2">
            {/* Medium tabs */}
            <div className="mb-2 flex gap-2">
              {mediumTabs.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setMediumFilter(tab.value)}
                  className={`rounded-full px-4 py-1 font-body text-xs font-semibold transition-colors ${
                    mediumFilter === tab.value
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-card text-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {/* Artist jump links */}
            <div className="flex flex-wrap gap-2 pb-1">
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

        {/* Artist sections */}
        {filteredArtists.map((artist) => {
          const originalArtistIndex = galleryArtists.indexOf(artist);
          return (
            <section
              key={artist.slug}
              id={artist.slug}
              className="scroll-mt-32 border-t border-border py-16"
            >
              <div className="mx-auto max-w-6xl px-6">
                <AnimatedSection>
                  <h2 className="mb-8 font-display text-4xl font-bold leading-tight text-foreground">
                    {artist.name}
                  </h2>
                </AnimatedSection>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {(artist.paintings ?? []).map((painting, pi) => {
                    const globalIndex =
                      galleryArtists
                        .slice(0, originalArtistIndex)
                        .reduce((sum, a) => sum + (a.paintings?.length ?? 0), 0) + pi;
                    return (
                      <AnimatedSection key={painting._key} delay={pi * 80}>
                        <button
                          type="button"
                          onClick={() => setOpenIndex(globalIndex)}
                          className="group block w-full overflow-hidden rounded-lg bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <img
                              src={urlFor(painting.image).width(600).auto("format").url()}
                              alt={painting.alt}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 flex items-end bg-black/0 transition-colors duration-300 group-hover:bg-black/40 group-focus-visible:bg-black/40">
                              <div className="w-full translate-y-full px-4 pb-3 transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0">
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
          );
        })}
      </main>

      <CountdownBanner />
      <NewsletterCTA />
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
                      src={urlFor(active.image).width(1200).auto("format").url()}
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
