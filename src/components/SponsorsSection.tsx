import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import { urlFor } from "@/sanity/lib/image";
import type { Sponsor } from "@/sanity/queries/sponsors";

const SponsorsSection = ({
  sponsors,
  // Fallbacks keep the heading intact for homepage documents saved before these
  // fields existed — a blank <h2> would be a worse failure than stale wording.
  eyebrow = "Made Possible By",
  title = "Our Sponsors",
}: {
  sponsors: Sponsor[];
  eyebrow?: string;
  title?: string;
}) => {
  return (
    <section className="border-t border-border py-16">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection className="mb-10 text-center">
          <p className="mb-1 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </p>
          <h2 className="font-display text-4xl font-bold text-foreground">
            {title}
          </h2>
        </AnimatedSection>
        <AnimatedSection delay={100}>
          {/* A seven-column grid left five logos bunched on the left with an
              empty two columns on the right, each squeezed to ~130px wide.
              A centred wrapping row (same pattern as the footer strip) holds
              the group in the middle for any count, and one shared height
              keeps the marks level. Heights and gaps step together so the
              current five stay on one row from sm up — at sm, a 48px gap
              would push the last logo onto a row of its own. */}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-x-12 lg:gap-x-16 xl:gap-x-20">
            {sponsors.map((sponsor) => {
              const href = sponsor.url;
              const img = sponsor.logo ? (
                <img
                  src={urlFor(sponsor.logo).width(400).auto("format").url()}
                  alt={sponsor.alt ?? sponsor.name}
                  className="h-12 w-auto max-w-full object-contain md:h-14 lg:h-20"
                />
              ) : (
                <span className="font-body text-sm font-semibold text-foreground">
                  {sponsor.name}
                </span>
              );

              return (
                <div
                  key={sponsor._id}
                  className="flex max-w-full items-center justify-center"
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
        <div className="mt-10 text-center">
          <Link
            href="/sponsors"
            className="inline-flex items-center justify-center rounded-full border-2 border-primary bg-transparent px-7 py-3 font-body text-sm font-semibold uppercase tracking-[0.15em] text-primary transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
          >
            Become a Sponsor
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
