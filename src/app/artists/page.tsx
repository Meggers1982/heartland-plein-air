import type { Metadata } from "next";
import Artists from "@/page-components/Artists";

export const metadata: Metadata = {
  title: "Meet the Artists: 25 Plein Air Painters in Omaha 2026",
  description:
    "Browse bios for all 25 invited plein air artists painting the Omaha metro in September 2026 — plus meet Rick J. Delanty, the 2026 Judge of Awards.",
  alternates: { canonical: "https://heartlandpleinair.org/artists" },
  openGraph: {
    title: "Meet the Artists: 25 Plein Air Painters in Omaha 2026",
    description:
      "Browse bios for all 25 invited plein air artists painting the Omaha metro in September 2026 — plus meet Rick J. Delanty, the 2026 Judge of Awards.",
    type: "website",
    url: "https://heartlandpleinair.org/artists",
    siteName: "Heartland Plein Air Festival",
    locale: "en_US",
    images: ["/assets/hero-pleinair.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet the Artists: 25 Plein Air Painters in Omaha 2026",
    description:
      "Browse bios for all 25 invited plein air artists painting the Omaha metro in September 2026 — plus meet Rick J. Delanty, the 2026 Judge of Awards.",
    images: ["/assets/hero-pleinair.jpg"],
  },
};

export default function ArtistsPage() {
  return <Artists />;
}
