import type { Metadata } from "next";
import Artists from "@/page-components/Artists";

export const metadata: Metadata = {
  title: "Artists | Heartland Plein Air Festival",
  description:
    "Meet the 25 nationally recognized artists invited to paint the Omaha metro during the Heartland Plein Air Festival, September 13–19, 2026.",
  alternates: { canonical: "https://heartlandpleinair.org/artists" },
};

export default function ArtistsPage() {
  return <Artists />;
}
