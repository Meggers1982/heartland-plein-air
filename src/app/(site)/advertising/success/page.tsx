import type { Metadata } from "next";
import AdvertisingSuccess from "@/page-components/AdvertisingSuccess";
import { getContactInfo } from "@/sanity/queries/pages";
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
  const contactInfo = await getContactInfo();
  return <AdvertisingSuccess contactInfo={contactInfo} adSizes={adSizes} />;
}
