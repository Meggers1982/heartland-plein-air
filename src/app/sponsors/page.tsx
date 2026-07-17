import type { Metadata } from "next";
import Sponsors from "@/page-components/Sponsors";

export const metadata: Metadata = {
  title: "Sponsor the Plein Air Festival: Put Your Name on It",
  description:
    "Support the Heartland Plein Air Festival. Sponsorship levels from $100 to $5,000+, with logo placement, catalog ads, and VIP passes. 501(c)(3) org.",
  alternates: { canonical: "https://heartlandpleinair.org/sponsors" },
  openGraph: {
    title: "Sponsor the Plein Air Festival: Put Your Name on It",
    description:
      "Support the Heartland Plein Air Festival. Sponsorship levels from $100 to $5,000+, with logo placement, catalog ads, and VIP passes. 501(c)(3) org.",
    type: "website",
    url: "https://heartlandpleinair.org/sponsors",
    siteName: "Heartland Plein Air Festival",
    locale: "en_US",
    images: ["/assets/hero-pleinair.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sponsor the Plein Air Festival: Put Your Name on It",
    description:
      "Support the Heartland Plein Air Festival. Sponsorship levels from $100 to $5,000+, with logo placement, catalog ads, and VIP passes. 501(c)(3) org.",
    images: ["/assets/hero-pleinair.jpg"],
  },
};

export default function SponsorsPage() {
  return <Sponsors />;
}
