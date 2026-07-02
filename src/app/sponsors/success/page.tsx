import type { Metadata } from "next";
import SponsorSuccess from "@/page-components/SponsorSuccess";

export const metadata: Metadata = {
  title: "Sponsorship Inquiry Received | Heartland Plein Air Festival",
  description:
    "Thank you for your sponsorship inquiry for the Heartland Plein Air Festival.",
  alternates: { canonical: "https://heartlandpleinair.org/sponsors/success" },
};

export default function SponsorsSuccessPage() {
  return <SponsorSuccess />;
}
