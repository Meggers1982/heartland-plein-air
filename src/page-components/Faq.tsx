'use client';
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import AnimatedSection from "@/components/AnimatedSection";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import NewsletterCTA from "@/components/NewsletterCTA";
import BrushStrokeDivider from "@/components/BrushStrokeDivider";
import BackToTop from "@/components/BackToTop";
import { cn } from "@/lib/utils";
import { categories } from "@/data/faq";

const Faq = () => {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string>(categories[0].id);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories
      .map((c) => ({
        ...c,
        items: c.items.filter(
          (i) =>
            i.q.toLowerCase().includes(q) ||
            i.a.some((p) => p.toLowerCase().includes(q)),
        ),
      }))
      .filter((c) => c.items.length > 0);
  }, [query]);

  useEffect(() => {
    const handler = () => {
      const offset = 160;
      let current = filtered[0]?.id ?? "";
      for (const c of filtered) {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top <= offset) current = c.id;
      }
      if (current) setActiveId(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [filtered]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const totalCount = categories.reduce((n, c) => n + c.items.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary/10 pt-44 pb-24">
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <AnimatedSection>
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Help Center
            </p>
            <h1 className="mb-6 font-display text-5xl font-bold leading-tight text-foreground md:text-6xl">
              Everything You Need to Know Before You Go
            </h1>
            <p className="mx-auto mb-8 max-w-2xl font-body text-lg leading-relaxed text-muted-foreground">
              From registration and judging to paint-outs and prizes — find answers to the most common questions about the Heartland Plein Air Festival, or browse by topic below.
            </p>
            <div className="relative mx-auto max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions… (e.g. tickets, parking, kids)"
                aria-label="Search FAQ questions"
                className="h-14 rounded-full border-2 border-border bg-background pl-12 pr-5 font-body text-base shadow-sm focus-visible:ring-primary"
              />
            </div>
            <div className="mt-8">
              <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Browse by topic
              </p>
              <nav className="flex flex-wrap justify-center gap-2">
                {filtered.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => scrollTo(c.id)}
                    className={cn(
                      "rounded-full border px-4 py-2 font-body text-sm transition-colors",
                      activeId === c.id
                        ? "border-primary/40 bg-primary/10 font-semibold text-primary"
                        : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    {c.title}
                    <span className="ml-2 text-xs opacity-60">{c.items.length}</span>
                  </button>
                ))}
              </nav>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <BrushStrokeDivider />

      {/* Body */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="min-w-0">
            {filtered.length === 0 && (
              <div className="rounded-lg border border-border bg-muted/30 p-8 text-center">
                <p className="font-display text-lg text-foreground">
                  No results for "{query}"
                </p>
                <p className="mt-2 font-body text-sm text-muted-foreground">
                  Try a different keyword, or clear your search to browse all topics.
                </p>
              </div>
            )}

            {filtered.map((c, idx) => (
              <AnimatedSection key={c.id} delay={idx * 50}>
                <div id={c.id} className="mb-14 scroll-mt-28">
                  <h2 className="mb-6 font-display text-3xl font-bold text-foreground md:text-4xl">
                    {c.title}
                  </h2>
                  <Accordion type="single" collapsible className="w-full">
                    {c.items.map((item, i) => (
                      <AccordionItem key={i} value={`${c.id}-${i}`}>
                        <AccordionTrigger className="font-display text-lg font-semibold text-foreground text-left">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="font-body text-base leading-relaxed text-muted-foreground space-y-4">
                          {item.a.map((paragraph, pi) => (
                            <p key={pi}>{paragraph}</p>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <div id="contact">
        <NewsletterCTA />
      </div>

      <SiteFooter />
      <BackToTop />
    </div>
  );
};

export default Faq;
