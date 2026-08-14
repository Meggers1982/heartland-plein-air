import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import type { VipPassTeaserSection as VipPassTeaserSectionData } from "@/sanity/queries/homepage";

const VipPassTeaserSection = ({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
}: VipPassTeaserSectionData) => {
  return (
    <section id="tickets" className="py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <AnimatedSection>
          <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </p>
          <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground">
            {title}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-body text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 font-body text-sm font-semibold uppercase tracking-[0.15em] text-primary-foreground shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            {ctaLabel}
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default VipPassTeaserSection;
