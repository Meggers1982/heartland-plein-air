import type { Metadata } from "next";
import Gallery from "@/page-components/Gallery";

export const metadata: Metadata = {
  title: "Preview Artist Portfolios: Plein Air Festival 2026",
  description:
    "Preview paintings by all 25 invited festival artists — oils, pastels, and watercolors — before they paint the Omaha metro live in September 2026.",
  alternates: { canonical: "https://heartlandpleinair.org/gallery" },
  openGraph: {
    title: "Preview Artist Portfolios: Plein Air Festival 2026",
    description:
      "Preview paintings by all 25 invited festival artists — oils, pastels, and watercolors — before they paint the Omaha metro live in September 2026.",
    type: "website",
    url: "https://heartlandpleinair.org/gallery",
    siteName: "Heartland Plein Air Festival",
    locale: "en_US",
    images: ["/assets/sunlit-riverside-valley-plein-air-oil-painting.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Preview Artist Portfolios: Plein Air Festival 2026",
    description:
      "Preview paintings by all 25 invited festival artists — oils, pastels, and watercolors — before they paint the Omaha metro live in September 2026.",
    images: ["/assets/sunlit-riverside-valley-plein-air-oil-painting.webp"],
  },
};

export default function GalleryPage() {
  return <Gallery />;
}
