import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import { urlFor } from "@/sanity/lib/image";
import type { AboutSection as AboutSectionData } from "@/sanity/queries/homepage";

const AboutSection = ({ eyebrow, title, paragraphs, linkLabel, linkHref, image }: AboutSectionData) => {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-2">
        <AnimatedSection>
          <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </p>
          <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground">
            {title}
          </h2>
          <div className="space-y-4 font-body text-lg leading-relaxed text-muted-foreground">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {linkLabel && linkHref && (
            <Link
              href={linkHref}
              className="mt-6 inline-block font-body text-sm font-semibold uppercase tracking-widest text-primary hover:underline"
            >
              {linkLabel}
            </Link>
          )}
        </AnimatedSection>
        <AnimatedSection delay={200}>
          <div className="overflow-hidden rounded-lg shadow-xl transition-transform duration-500 hover:scale-[1.02]">
            <img
              src={
                image
                  ? urlFor(image).width(1200).auto("format").url()
                  : "/assets/plein-air-painter-niobrara-river.webp"
              }
              alt="Artist painting riverside landscape at an outdoor easel"
              className="h-full w-full object-cover"
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default AboutSection;
