'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import SiteNav from "@/components/SiteNav";
import NewsletterCTA from "@/components/NewsletterCTA";
import CountdownBanner from "@/components/CountdownBanner";
import BackToTop from "@/components/BackToTop";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Globe, Facebook, Instagram, ChevronLeft, ChevronRight } from "lucide-react";
import { JsonLd, breadcrumbSchema, SITE_URL } from "@/lib/schema";
import { urlFor } from "@/sanity/lib/image";
import type { Artist } from "@/sanity/queries/artists";

const PLACEHOLDER_HEADSHOT = "/assets/artists/placeholder-headshot.svg";

const headshotUrl = (artist: Artist) =>
  artist.headshot ? urlFor(artist.headshot).width(800).auto("format").url() : PLACEHOLDER_HEADSHOT;

const toPersonSchema = (artist: Artist) => {
  const sameAs = [artist.website, artist.instagram, artist.facebook].filter(
    (url): url is string => !!url,
  );
  return {
    "@type": "Person",
    name: artist.name,
    jobTitle: artist.isJudge ? "Judge of Awards" : "Plein Air Artist",
    image: artist.headshot ? headshotUrl(artist) : undefined,
    description: artist.bio?.split("\n\n").join(" "),
    homeLocation: { "@type": "Place", name: artist.location },
    ...(artist.website ? { url: artist.website } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
};

const Artists = ({ roster }: { roster: Artist[] }) => {
  // Rick J. Delanty judges the awards AND paints the festival, so he belongs
  // in the roster — without him the grid shows 24 cards while the copy says
  // 25. He's appended last in the fetched roster so indices into `artists`
  // (used by the lightbox and its prev/next controls) stay valid.
  const artists = roster.filter((a) => !a.isJudge);
  const awardsJudge = roster.find((a) => a.isJudge)!;
  const artistPersonSchema = roster.map(toPersonSchema);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const active = openIndex !== null ? artists[openIndex] : null;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbSchema([{ name: "Artists", path: "/artists" }]),
            ...artistPersonSchema,
          ],
        }}
      />
      <SiteNav />
      <header className="bg-foreground pt-52 pb-16 md:pt-56">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
            The 2026 Roster
          </p>
          <h1 className="font-display text-5xl font-bold leading-tight text-secondary md:text-6xl">
            Meet the Artists
          </h1>
        </div>
      </header>
      <main>
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <AnimatedSection>
              <p className="mx-auto font-body text-lg leading-relaxed text-muted-foreground">
                Every painter at the Heartland Plein Air Festival is here by invitation. This year, 25 nationally recognized artists travel to the Omaha metro to spend a week painting it — outdoors, on location, in real time. Browse the full roster below, then come find them in the field.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                <a href="#awards-judge" className="font-body text-sm font-semibold uppercase tracking-widest text-primary hover:underline">
                  Meet This Year's Judge →
                </a>
                <Link href="/gallery" className="font-body text-sm font-semibold uppercase tracking-widest text-primary hover:underline">
                  See Their Work in the Gallery →
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="pb-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center">
              <AnimatedSection>
                <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  The Roster
                </p>
                <h2 className="font-display text-4xl font-bold leading-tight text-foreground">
                  The 2026 Invited Artists
                </h2>
              </AnimatedSection>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {roster.map((artist, i) => {
                // The judge is appended last, so indices 0..artists.length-1
                // still line up with the `artists` array the lightbox reads.
                const isJudge = artist.isJudge;
                const cardClass =
                  "group block w-full text-left overflow-hidden rounded-lg bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary";
                const cardInner = (
                  <>
                    <div className="aspect-square overflow-hidden relative">
                      <img
                        src={headshotUrl(artist)}
                        alt={artist.headshotAlt ?? artist.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ objectPosition: artist.objectPosition ?? "center" }}
                        loading="lazy"
                        onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER_HEADSHOT; }}
                      />
                      {isJudge && (
                        <span className="absolute left-3 top-3 z-10 rounded-full bg-primary px-3 py-1 font-body text-[0.65rem] font-semibold uppercase tracking-widest text-primary-foreground shadow-sm">
                          Judge of Awards
                        </span>
                      )}
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 flex items-center justify-center group-hover:bg-black/30 group-focus-visible:bg-black/30">
                        <span className="font-body text-sm font-medium text-white opacity-0 transition-opacity duration-300 tracking-wide group-hover:opacity-100 group-focus-visible:opacity-100">
                          View Bio
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-semibold text-foreground">
                        {artist.name}
                      </h3>
                      <p className="font-body text-xs font-semibold uppercase tracking-widest text-primary">
                        {artist.location}
                      </p>
                      <p className="mt-2 font-body text-xs text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                        Click to see more
                      </p>
                    </div>
                  </>
                );
                return (
                  <AnimatedSection key={artist._id} delay={i * 80}>
                    {isJudge ? (
                      // Sends people to the featured Awards Judge section below
                      // rather than repeating his full bio in the lightbox.
                      <a href="#awards-judge" className={cardClass}>
                        {cardInner}
                      </a>
                    ) : (
                      <button type="button" onClick={() => setOpenIndex(i)} className={cardClass}>
                        {cardInner}
                      </button>
                    )}
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        <section id="awards-judge" className="scroll-mt-24 pb-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center">
              <AnimatedSection>
                <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Awards
                </p>
                <h2 className="font-display text-4xl font-bold leading-tight text-foreground">
                  Awards Judge
                </h2>
              </AnimatedSection>
            </div>
            <AnimatedSection>
              <div className="overflow-hidden rounded-lg bg-card shadow-sm">
                <div className="grid md:grid-cols-2">
                  <div className="aspect-square md:aspect-auto overflow-hidden bg-muted">
                    <img
                      src={headshotUrl(awardsJudge)}
                      alt={awardsJudge.headshotAlt ?? awardsJudge.name}
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
      <NewsletterCTA />
      <BackToTop />
      <Dialog open={openIndex !== null} onOpenChange={(o) => !o && setOpenIndex(null)}>
        <DialogContent className="max-w-2xl border-none bg-transparent p-0 shadow-none">
          {active && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenIndex((idx) => idx === null ? idx : (idx - 1 + artists.length) % artists.length)}
                aria-label="Previous artist"
                className="absolute -left-14 top-1/2 z-10 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-background text-foreground shadow-lg ring-1 ring-border transition-colors hover:bg-muted"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={() => setOpenIndex((idx) => idx === null ? idx : (idx + 1) % artists.length)}
                aria-label="Next artist"
                className="absolute -right-14 top-1/2 z-10 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-background text-foreground shadow-lg ring-1 ring-border transition-colors hover:bg-muted"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <div className="overflow-hidden rounded-lg bg-background shadow-lg">
                <div className="grid md:grid-cols-2">
                  <div className="aspect-square md:aspect-auto overflow-hidden bg-muted">
                <img src={headshotUrl(active)} alt={active.headshotAlt ?? active.name} className="h-full w-full object-cover" style={{ objectPosition: active.objectPosition ?? "center" }} />
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
                {active.bio && (
                  <div className="mt-4 space-y-3">
                    {active.bio.split("\n\n").map((paragraph, idx) => (
                      <p key={idx} className="font-body text-sm leading-relaxed text-muted-foreground">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
                {(active.website || active.instagram || active.facebook) && (
                  <div className="mt-6 flex gap-3">
                    {active.website && (
                      <a
                        href={active.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20"
                        aria-label="Website"
                      >
                        <Globe className="h-5 w-5" />
                      </a>
                    )}
                    {active.instagram && (
                      <a
                        href={active.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20"
                        aria-label="Instagram"
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                    )}
                    {active.facebook && (
                      <a
                        href={active.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20"
                        aria-label="Facebook"
                      >
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