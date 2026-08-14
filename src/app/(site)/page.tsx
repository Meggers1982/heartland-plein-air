import type { Metadata } from "next";
import Index from "@/page-components/Index";
import { getFunders } from "@/sanity/queries/sponsors";
import { getFestivalLocations, getHomepageHighlights } from "@/sanity/queries/schedule";
import { getFeaturedFaqItems } from "@/sanity/queries/faq";
import { getArtists } from "@/sanity/queries/artists";
import { getHomepageSections } from "@/sanity/queries/homepage";

export const metadata: Metadata = {
  title: "Heartland Plein Air Festival: See Art Made in the Open",
  description:
    "Watch 25 nationally recognized artists paint the Omaha metro live. Free public events all week. Exhibition and auction September 19, 2026, in Ralston, NE.",
  alternates: { canonical: "https://heartlandpleinair.org" },
};

export default async function HomePage() {
  const [sections, funders, homepageHighlights, festivalLocations, faqs, artists] =
    await Promise.all([
      getHomepageSections(),
      getFunders(),
      getHomepageHighlights(),
      getFestivalLocations(),
      getFeaturedFaqItems(),
      getArtists(),
    ]);
  return (
    <Index
      sections={sections}
      funders={funders}
      homepageHighlights={homepageHighlights}
      festivalLocations={festivalLocations}
      faqs={faqs}
      artists={artists}
    />
  );
}
