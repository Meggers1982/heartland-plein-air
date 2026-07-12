import type { Metadata } from "next";
import Artists from "@/page-components/Artists";

export const metadata: Metadata = {
  title: "Meet the Artists: 25 Plein Air Painters in Omaha 2026",
  description:
    "Browse bios for all 25 invited plein air artists painting the Omaha metro in September 2026 — plus meet Rick J. Delanty, the 2026 Judge of Awards.",
  alternates: { canonical: "https://heartlandpleinair.org/artists" },
};

export default function ArtistsPage() {
  return <Artists />;
}
