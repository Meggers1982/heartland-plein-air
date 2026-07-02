import type { Metadata } from "next";
import Advertising from "@/page-components/Advertising";

export const metadata: Metadata = {
  title: "Advertising | Heartland Plein Air Festival",
  description:
    "Advertise in the Heartland Plein Air Festival catalog — full, half, and quarter page ad options, specs, and deadlines.",
  alternates: { canonical: "https://heartlandpleinair.org/advertising" },
};

export default function AdvertisingPage() {
  return <Advertising />;
}
