import AnimatedSection from "@/components/AnimatedSection";
import { getIcon } from "@/sanity/lib/iconMap";
import type { FestivalHighlightsSection as FestivalHighlightsSectionData } from "@/sanity/queries/homepage";

const FestivalHighlightsSection = ({
  eyebrow,
  title,
  highlights,
}: FestivalHighlightsSectionData) => {
  return (
    <section id="highlights" className="bg-secondary/50 pt-24 pb-12">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection className="mb-16 text-center">
          <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </p>
          <h2 className="font-display text-4xl font-bold leading-tight text-foreground">
            {title}
          </h2>
        </AnimatedSection>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, i) => {
            const Icon = getIcon(item.icon);
            return (
              <AnimatedSection key={item._key} delay={i * 100} className="h-full">
                <div className="group flex h-full flex-col rounded-lg bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FestivalHighlightsSection;
