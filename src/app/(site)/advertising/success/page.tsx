import type { Metadata } from "next";
import AdvertisingSuccess from "@/page-components/AdvertisingSuccess";
import { getAdSizes } from "@/sanity/queries/advertising";

export const metadata: Metadata = {
  title: "Ad Reservation Received | Heartland Plein Air Festival",
  description:
    "Thank you for reserving ad space in the Heartland Plein Air Festival catalog.",
  alternates: { canonical: "https://heartlandpleinair.org/advertising/success" },
  robots: { index: false, follow: false },
};

export default async function AdvertisingSuccessPage() {
  const adSizes = await getAdSizes();
  return <AdvertisingSuccess adSizes={adSizes} />;
}
