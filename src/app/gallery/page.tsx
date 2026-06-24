import type { Metadata } from "next";
import Gallery from "@/page-components/Gallery";

export const metadata: Metadata = {
  title: "Gallery | Heartland Plein Air Festival",
  description:
    "Browse paintings from Heartland Plein Air Festival artists — oil, pastel, and watercolor works created on location across the Omaha metro.",
  alternates: { canonical: "https://heartlandpleinair.org/gallery" },
};

export default function GalleryPage() {
  return <Gallery />;
}
