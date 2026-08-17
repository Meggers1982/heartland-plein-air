import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/pageMetadata";
import Gallery from "@/page-components/Gallery";
import { getGalleryPage } from "@/sanity/queries/pages";
import { getGalleryArtists, getGalleryMediums } from "@/sanity/queries/artists";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    route: "/gallery",
    fallbackTitle: "Preview Artist Portfolios: Plein Air Festival 2026",
    fallbackDescription: "Preview paintings by all 25 invited festival artists \u2014 oils, pastels, and watercolors \u2014 before they paint the Omaha metro live in September 2026.",
    fallbackImage: "/assets/sunlit-riverside-valley-plein-air-oil-painting.webp",
  });
}

export default async function GalleryPage() {
  const galleryArtists = await getGalleryArtists();
  const page = await getGalleryPage();
  const mediums = await getGalleryMediums();
  return <Gallery mediums={mediums} page={page} galleryArtists={galleryArtists} />;
}
