import { useEffect, useMemo, useState } from "react";
import { categories } from "@/data/faq";
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
      <section className="relative overflow-hidden bg-primary/10 py-24">
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <AnimatedSection>
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Help Center
            </p>
            <h1 className="mb-6 font-display text-5xl font-bold leading-tight text-foreground md:text-6xl">
              How can we help?
            </h1>
            <p className="mx-auto mb-8 max-w-2xl font-body text-lg font-light leading-relaxed text-muted-foreground">
              Search {totalCount}+ answers about the Heartland Plein Air Arts Festival, or browse by topic below.
            </p>
            <div className="relative mx-auto max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions… (e.g. tickets, parking, kids)"
                className="h-14 rounded-full border-2 border-border bg-background pl-12 pr-5 font-body text-base shadow-sm focus-visible:ring-primary"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <BrushStrokeDivider />

      {/* Body */}
      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-[260px_1fr]">
          {/* Sidebar nav */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Topics
            </p>
            <nav className="flex flex-row flex-wrap gap-2 lg:flex-col lg:gap-1">
              {filtered.map((c) => (
                <button
                  key={c.id}
                  onClick={() => scrollTo(c.id)}
                  className={cn(
                    "rounded-md px-4 py-2.5 text-left font-body text-sm transition-colors",
                    "border lg:border-transparent",
                    activeId === c.id
                      ? "border-primary/30 bg-primary/10 font-semibold text-primary lg:border-l-2 lg:border-l-primary lg:border-transparent lg:bg-primary/5 lg:rounded-none"
                      : "border-border text-muted-foreground hover:bg-muted hover:text-foreground lg:border-transparent lg:border-l-2 lg:border-l-border",
                  )}
                >
                  {c.title}
                  <span className="ml-2 text-xs opacity-60">{c.items.length}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
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
