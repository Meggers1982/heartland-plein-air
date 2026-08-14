import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import type { HeroSection as HeroSectionData } from "@/sanity/queries/homepage";

type Props = HeroSectionData & { scrollY: number; heroLoaded: boolean };

const HeroSection = ({
  eyebrow,
  title,
  subtitle,
  backgroundImage,
  primaryCta,
  secondaryCta,
  tertiaryCta,
  scrollY,
  heroLoaded,
}: Props) => {
  const fadeClass = `transition-all duration-700 ${heroLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`;

  return (
    <section className="relative flex min-h-[100dvh] items-end overflow-hidden">
      <img
        src={
          backgroundImage
            ? urlFor(backgroundImage).width(1920).auto("format").url()
            : "/assets/spring-greens-djgroesser.webp"
        }
        alt="oil painting of lush spring green landscape"
        className="absolute inset-0 h-[120%] w-full object-cover will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      />
      <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-40">
        <p
          className={`mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-secondary ${fadeClass}`}
          style={{ transitionDelay: "200ms" }}
        >
          {eyebrow}
        </p>
        <h1
          className={`hero-title mb-6 max-w-3xl font-display text-5xl font-bold leading-tight text-secondary md:text-7xl ${fadeClass}`}
          style={{ transitionDelay: "400ms" }}
        >
          {title}
        </h1>
        <p
          className={`mb-8 max-w-xl font-body text-lg font-medium leading-relaxed text-secondary/95 ${fadeClass}`}
          style={{ transitionDelay: "600ms" }}
        >
          {subtitle}
        </p>
        <div
          className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4 ${fadeClass}`}
          style={{ transitionDelay: "800ms" }}
        >
          {primaryCta && (
            <Link
              href={primaryCta.href}
              className="inline-flex w-full items-center justify-center rounded-full bg-primary px-7 py-3 font-body text-sm font-semibold uppercase tracking-[0.15em] text-primary-foreground shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
            >
              {primaryCta.label}
            </Link>
          )}
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="inline-flex w-full items-center justify-center rounded-full border-2 border-secondary/80 bg-transparent px-7 py-3 font-body text-sm font-semibold uppercase tracking-[0.15em] text-secondary transition-all hover:-translate-y-0.5 hover:bg-secondary hover:text-secondary-foreground sm:w-auto"
            >
              {secondaryCta.label}
            </Link>
          )}
          {tertiaryCta && (
            <Link
              href={tertiaryCta.href}
              className="inline-flex w-full items-center justify-center rounded-full border-2 border-secondary/80 bg-transparent px-7 py-3 font-body text-sm font-semibold uppercase tracking-[0.15em] text-secondary transition-all hover:-translate-y-0.5 hover:bg-secondary hover:text-secondary-foreground sm:w-auto"
            >
              {tertiaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
