'use client';
import { useEffect, useState } from "react";
import CountdownBanner from "@/components/CountdownBanner";
import BrushStrokeDivider from "@/components/BrushStrokeDivider";
import SiteNav from "@/components/SiteNav";
import BackToTop from "@/components/BackToTop";
import { SECTION_MAP } from "@/sanity/lib/sectionMap";
import type { Sponsor } from "@/sanity/queries/sponsors";
import type { FestivalLocation, HomepageHighlight } from "@/sanity/queries/schedule";
import type { FaqItem } from "@/sanity/queries/faq";
import type { Artist } from "@/sanity/queries/artists";
import type { HomepageSection } from "@/sanity/queries/homepage";

// Matches the original hand-arranged homepage: a brush-stroke divider
// appears immediately before these section types only.
const DIVIDER_BEFORE = new Set([
  "festivalHighlightsSection",
  "vipPassTeaserSection",
  "paintingLocationsSection",
  "artistSpotlightSection",
]);

const Index = ({
  sections,
  funders,
  homepageHighlights,
  festivalLocations,
  faqs,
  artists,
}: {
  sections: HomepageSection[];
  funders: Sponsor[];
  homepageHighlights: HomepageHighlight[];
  festivalLocations: FestivalLocation[];
  faqs: FaqItem[];
  artists: Artist[];
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      {sections.map((section) => {
        const Component = SECTION_MAP[section._type];
        if (!Component) return null;
        return (
          <div key={section._key} id={section._type === "newsletterCtaSection" ? "contact" : undefined}>
            {DIVIDER_BEFORE.has(section._type) && <BrushStrokeDivider className="py-4" />}
            <Component
              {...section}
              scrollY={scrollY}
              heroLoaded={heroLoaded}
              funders={funders}
              sponsors={funders}
              homepageHighlights={homepageHighlights}
              festivalLocations={festivalLocations}
              faqs={faqs}
              artists={artists}
            />
            {section._type === "heroSection" && <CountdownBanner />}
          </div>
        );
      })}

      <BackToTop />
    </div>
  );
};

export default Index;
