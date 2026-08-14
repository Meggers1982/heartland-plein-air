import type { ComponentType } from "react";

import ArtistSpotlight from "@/components/ArtistSpotlight";
import NewsletterCTA from "@/components/NewsletterCTA";
import ScheduleSection from "@/components/ScheduleSection";
import AboutSection from "@/components/sections/AboutSection";
import FaqTeaserSection from "@/components/sections/FaqTeaserSection";
import FestivalHighlightsSection from "@/components/sections/FestivalHighlightsSection";
import HeroSection from "@/components/sections/HeroSection";
import PaintingLocationsSection from "@/components/sections/PaintingLocationsSection";
import VipPassTeaserSection from "@/components/sections/VipPassTeaserSection";
import SponsorsSection from "@/components/SponsorsSection";

// Each component here receives its own section's fields spread as props,
// plus the full shared homepage data bag (see Index.tsx) — components that
// don't need any of it (NewsletterCTA) or only need one slice of it
// (ArtistSpotlight, SponsorsSection, ScheduleSection) simply ignore the rest.
export const SECTION_MAP: Record<string, ComponentType<any>> = {
  heroSection: HeroSection,
  aboutSection: AboutSection,
  festivalHighlightsSection: FestivalHighlightsSection,
  scheduleTeaserSection: ScheduleSection,
  vipPassTeaserSection: VipPassTeaserSection,
  paintingLocationsSection: PaintingLocationsSection,
  artistSpotlightSection: ArtistSpotlight,
  sponsorsSection: SponsorsSection,
  faqTeaserSection: FaqTeaserSection,
  newsletterCtaSection: NewsletterCTA,
};
