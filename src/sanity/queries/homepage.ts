import type { Image } from "sanity";

import { sanityFetch } from "@/sanity/lib/live";

export type Cta = { label: string; href: string };

export type HeroSection = {
  _key: string;
  _type: "heroSection";
  eyebrow: string;
  title: string;
  subtitle: string;
  backgroundImage?: Image;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  tertiaryCta?: Cta;
};

export type AboutSection = {
  _key: string;
  _type: "aboutSection";
  eyebrow: string;
  title: string;
  paragraphs: string[];
  linkLabel?: string;
  linkHref?: string;
  image?: Image;
};

export type FestivalHighlightsSection = {
  _key: string;
  _type: "festivalHighlightsSection";
  eyebrow: string;
  title: string;
  highlights: { _key: string; icon: string; title: string; description: string }[];
};

export type ScheduleTeaserSection = { _key: string; _type: "scheduleTeaserSection" };

export type VipPassTeaserSection = {
  _key: string;
  _type: "vipPassTeaserSection";
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

export type PaintingLocationsSection = {
  _key: string;
  _type: "paintingLocationsSection";
  eyebrow: string;
  title: string;
  description: string;
  helperText?: string;
};

export type ArtistSpotlightSection = { _key: string; _type: "artistSpotlightSection" };

export type SponsorsSection = { _key: string; _type: "sponsorsSection" };

export type FaqTeaserSection = {
  _key: string;
  _type: "faqTeaserSection";
  eyebrow: string;
  title: string;
  linkLabel: string;
  linkHref: string;
};

export type NewsletterCtaSection = { _key: string; _type: "newsletterCtaSection" };

export type HomepageSection =
  | HeroSection
  | AboutSection
  | FestivalHighlightsSection
  | ScheduleTeaserSection
  | VipPassTeaserSection
  | PaintingLocationsSection
  | ArtistSpotlightSection
  | SponsorsSection
  | FaqTeaserSection
  | NewsletterCtaSection;

export async function getHomepageSections() {
  const { data } = await sanityFetch({
    query: `*[_id == "homepage"][0].sections`,
    tags: ["homepage"],
  });
  return (data ?? []) as HomepageSection[];
}
