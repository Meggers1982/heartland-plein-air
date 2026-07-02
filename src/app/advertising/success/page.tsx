import type { Metadata } from "next";
import AdvertisingSuccess from "@/page-components/AdvertisingSuccess";

export const metadata: Metadata = {
  title: "Ad Reservation Received | Heartland Plein Air Festival",
  description:
    "Thank you for reserving ad space in the Heartland Plein Air Festival catalog.",
  alternates: { canonical: "https://heartlandpleinair.org/advertising/success" },
};

export default function AdvertisingSuccessPage() {
  return <AdvertisingSuccess />;
}
