import type { Metadata } from "next";
import Advertising from "@/page-components/Advertising";
import { getAdSizes } from "@/sanity/queries/advertising";

export const metadata: Metadata = {
  title: "Advertise in the Plein Air Festival Catalog: Omaha",
  description:
    "Place an ad in the Heartland Plein Air Festival catalog — 3,000 printed copies plus digital. Full, half, and quarter-page options from $125. Deadline July 17.",
  alternates: { canonical: "https://heartlandpleinair.org/advertising" },
  openGraph: {
    title: "Advertise in the Plein Air Festival Catalog: Omaha",
    description:
      "Place an ad in the Heartland Plein Air Festival catalog — 3,000 printed copies plus digital. Full, half, and quarter-page options from $125. Deadline July 17.",
    type: "website",
    url: "https://heartlandpleinair.org/advertising",
    siteName: "Heartland Plein Air Festival",
    locale: "en_US",
    images: ["/assets/hero-pleinair.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Advertise in the Plein Air Festival Catalog: Omaha",
    description:
      "Place an ad in the Heartland Plein Air Festival catalog — 3,000 printed copies plus digital. Full, half, and quarter-page options from $125. Deadline July 17.",
    images: ["/assets/hero-pleinair.jpg"],
  },
};

export default async function AdvertisingPage() {
  const adSizes = await getAdSizes();
  return <Advertising adSizes={adSizes} />;
}
