import type { Metadata } from "next";
import Contact from "@/page-components/Contact";

export const metadata: Metadata = {
  title: "Contact the Plein Air Festival Team: Ralston, NE",
  description:
    "Questions about the festival, sponsorships, volunteering, or advertising? Reach the Heartland Plein Air Festival team in Ralston, Nebraska.",
  alternates: { canonical: "https://heartlandpleinair.org/contact" },
  openGraph: {
    title: "Contact the Plein Air Festival Team: Ralston, NE",
    description:
      "Questions about the festival, sponsorships, volunteering, or advertising? Reach the Heartland Plein Air Festival team in Ralston, Nebraska.",
    type: "website",
    url: "https://heartlandpleinair.org/contact",
    siteName: "Heartland Plein Air Festival",
    locale: "en_US",
    images: ["/assets/hero-pleinair.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact the Plein Air Festival Team: Ralston, NE",
    description:
      "Questions about the festival, sponsorships, volunteering, or advertising? Reach the Heartland Plein Air Festival team in Ralston, Nebraska.",
    images: ["/assets/hero-pleinair.jpg"],
  },
};

export default function ContactPage() {
  return <Contact />;
}
