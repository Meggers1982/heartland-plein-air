import type { Metadata } from "next";
import Advertising from "@/page-components/Advertising";

export const metadata: Metadata = {
  title: "Advertise in the Plein Air Festival Catalog: Omaha",
  description:
    "Place an ad in the Heartland Plein Air Festival catalog — 3,000 printed copies plus digital. Full, half, and quarter-page options from $125. Deadline July 17.",
  alternates: { canonical: "https://heartlandpleinair.org/advertising" },
};

export default function AdvertisingPage() {
  return <Advertising />;
}
