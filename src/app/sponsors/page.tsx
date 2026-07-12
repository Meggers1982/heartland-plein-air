import type { Metadata } from "next";
import Sponsors from "@/page-components/Sponsors";

export const metadata: Metadata = {
  title: "Sponsor the Plein Air Festival: Put Your Name on It",
  description:
    "Support the Heartland Plein Air Festival. Sponsorship levels from $100 to $5,000+, with logo placement, catalog ads, and VIP passes. 501(c)(3) org.",
  alternates: { canonical: "https://heartlandpleinair.org/sponsors" },
};

export default function SponsorsPage() {
  return <Sponsors />;
}
