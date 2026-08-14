import AnimatedSection from "@/components/AnimatedSection";
import LocationsMap from "@/components/LocationsMap";
import type { FestivalLocation } from "@/sanity/queries/schedule";
import type { PaintingLocationsSection as PaintingLocationsSectionData } from "@/sanity/queries/homepage";

type Props = PaintingLocationsSectionData & { festivalLocations: FestivalLocation[] };

const PaintingLocationsSection = ({
  eyebrow,
  title,
  description,
  helperText,
  festivalLocations,
}: Props) => {
  return (
    <section id="locations" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection className="mb-12 text-center">
          <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </p>
          <h2 className="font-display text-4xl font-bold leading-tight text-foreground">
            {title}
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-primary/60" />
          <p className="mx-auto mt-4 max-w-2xl font-body text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
          {helperText && (
            <p className="mx-auto mt-3 max-w-2xl font-body text-sm leading-relaxed text-muted-foreground">
              {helperText}
            </p>
          )}
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <LocationsMap festivalLocations={festivalLocations} />
        </AnimatedSection>
      </div>
    </section>
  );
};

export default PaintingLocationsSection;
