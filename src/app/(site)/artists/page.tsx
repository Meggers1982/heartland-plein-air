import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/pageMetadata";
import Artists from "@/page-components/Artists";
import { getArtistsPage } from "@/sanity/queries/pages";
import { getArtists } from "@/sanity/queries/artists";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    route: "/artists",
    fallbackTitle: "Meet the Artists: 25 Plein Air Painters in Omaha 2026",
    fallbackDescription: "Browse bios for all 25 invited plein air artists painting the Omaha metro in September 2026 \u2014 plus meet Rick J. Delanty, the 2026 Judge of Awards.",
  });
}

export default async function ArtistsPage() {
  const roster = await getArtists();
  const page = await getArtistsPage();
  return <Artists page={page} roster={roster} />;
}
