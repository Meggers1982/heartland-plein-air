import type { Metadata } from "next";
import Contact from "@/page-components/Contact";

export const metadata: Metadata = {
  title: "Contact the Plein Air Festival Team: Ralston, NE",
  description:
    "Questions about the festival, sponsorships, volunteering, or advertising? Reach the Heartland Plein Air Festival team in Ralston, Nebraska.",
  alternates: { canonical: "https://heartlandpleinair.org/contact" },
};

export default function ContactPage() {
  return <Contact />;
}
