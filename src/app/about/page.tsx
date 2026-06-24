import type { Metadata } from "next";
import About from "@/page-components/About";

export const metadata: Metadata = {
  title: "About | Heartland Plein Air Festival",
  description:
    "Learn about the Heartland Plein Air Festival — outdoor painting across the Omaha metro by 25 nationally recognized artists, September 13–19, 2026.",
  alternates: { canonical: "https://heartlandpleinair.org/about" },
};

export default function AboutPage() {
  return <About />;
}
