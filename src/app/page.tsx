import type { Metadata } from "next";
import Index from "@/page-components/Index";

export const metadata: Metadata = {
  title: "Heartland Plein Air Festival | September 13–19, 2026",
  description:
    "Heartland Plein Air Festival brings 25 nationally recognized artists to the Omaha metro for a week of outdoor painting, public exhibition, and live art-making. September 13–19, 2026.",
  alternates: { canonical: "https://heartlandpleinair.org" },
};

export default function HomePage() {
  return <Index />;
}
