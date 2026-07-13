import AnimatedSection from "@/components/AnimatedSection";
import { sponsors } from "@/data/sponsors";

const SponsorsSection = () => {
  return (
    <section className="border-t border-border py-16">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection className="mb-10 text-center">
          <p className="mb-1 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Made Possible By
          </p>
          <h2 className="font-display text-4xl font-bold text-foreground">
            Our Sponsors
          </h2>
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-7">
            {sponsors.map((sponsor) => {
              const href = sponsor.url;
              const img = (
                <img
                  src={sponsor.logo}
                  alt={sponsor.alt}
                  className="max-h-12 w-auto max-w-full object-contain sm:max-h-16"
                />
              );

              return (
                <div
                  key={sponsor.name}
                  className="flex items-center justify-center px-2 py-2"
                >
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={sponsor.name}
                      className="flex items-center justify-center transition-opacity hover:opacity-80"
                    >
                      {img}
                    </a>
                  ) : (
                    img
                  )}
                </div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default SponsorsSection;
