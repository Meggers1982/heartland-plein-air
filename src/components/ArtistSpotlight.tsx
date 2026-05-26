import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { artists, placeholderHeadshot } from "@/data/artists";

const ROTATION_MS = 6000;

const ArtistSpotlight = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const reducedMotionRef = useRef(false);
  const indexRef = useRef(0);
  const fadingRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const jumpTo = useCallback((next: number) => {
    if (fadingRef.current) return;
    indexRef.current = next;
    if (reducedMotionRef.current) { setIndex(next); return; }
    fadingRef.current = true;
    setVisible(false);
  }, []);

  const go = useCallback((dir: 1 | -1) => {
    jumpTo((indexRef.current + dir + artists.length) % artists.length);
  }, [jumpTo]);

  useEffect(() => {
    if (paused || reducedMotionRef.current) return;
    const id = window.setInterval(() => {
      jumpTo((indexRef.current + 1) % artists.length);
    }, ROTATION_MS);
    return () => window.clearInterval(id);
  }, [paused, jumpTo]);

  const artist = artists[index];
  const bioPreview = artist.bio.split("\n\n")[0];

  return (
    <section id="artist-spotlight" className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection className="mb-12 text-center">
          <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Meet the Painters
          </p>
          <h2 className="font-display text-4xl font-bold text-foreground">
            Artist Spotlight
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body text-base leading-relaxed text-muted-foreground">
            Twenty-five painters from across the country are descending on the Omaha metro — easels, brushes, and all — to capture Douglas & Sarpy County in real time. Meet one of them.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="flex items-center gap-3">
            {/* Prev */}
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous artist"
              className="hidden md:inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background text-foreground shadow ring-1 ring-border transition-colors hover:bg-muted"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div
              className="relative flex-1 overflow-hidden rounded-lg bg-card shadow-sm"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div
                className={`grid md:grid-cols-2 md:h-[520px] transition-opacity ease-in-out ${visible ? "opacity-100 duration-500" : "opacity-0 duration-200"}`}
                onTransitionEnd={(e) => {
                  if (e.propertyName !== "opacity" || visible) return;
                  setIndex(indexRef.current);
                  setVisible(true);
                  fadingRef.current = false;
                }}
              >
                <div className="aspect-square md:aspect-auto md:h-full overflow-hidden bg-muted">
                  <img
                    src={artist.src}
                    alt={artist.alt ?? artist.name}
                    className="h-full w-full object-cover"
                    style={{ objectPosition: artist.objectPosition ?? "center" }}
                    onError={(e) => { (e.target as HTMLImageElement).src = placeholderHeadshot; }}
                  />
                </div>
                <div className="flex flex-col justify-center p-8 md:p-10 md:h-full md:overflow-hidden">
                  <div>
                    <h3 className="font-display text-3xl font-semibold text-foreground">
                      {artist.name}
                    </h3>
                    <p className="mt-1 font-body text-xs font-semibold uppercase tracking-widest text-primary">
                      {artist.location}
                    </p>
                    <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground line-clamp-5">
                      {bioPreview}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-4">
                    <Link
                      to="/artists"
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-body text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                    Meet all the artists →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Mobile arrows inside */}
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous artist"
                className="md:hidden absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground shadow ring-1 ring-border backdrop-blur transition-colors hover:bg-background"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next artist"
                className="md:hidden absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground shadow ring-1 ring-border backdrop-blur transition-colors hover:bg-background"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Next */}
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next artist"
              className="hidden md:inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background text-foreground shadow ring-1 ring-border transition-colors hover:bg-muted"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {artists.map((a, i) => (
              <button
                key={a.name}
                type="button"
                onClick={() => jumpTo(i)}
                aria-label={`Show ${a.name}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
              />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ArtistSpotlight;