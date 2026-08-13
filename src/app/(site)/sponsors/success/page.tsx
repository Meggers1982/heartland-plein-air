import type { Metadata } from "next";
import SponsorSuccess from "@/page-components/SponsorSuccess";
import { getSponsorTiers } from "@/sanity/queries/sponsors";

export const metadata: Metadata = {
  title: "Sponsorship Inquiry Received | Heartland Plein Air Festival",
  description:
    "Thank you for your sponsorship inquiry for the Heartland Plein Air Festival.",
  alternates: { canonical: "https://heartlandpleinair.org/sponsors/success" },
  robots: { index: false, follow: false },
};

export default async function SponsorsSuccessPage() {
  const sponsorTiers = await getSponsorTiers();
  return <SponsorSuccess sponsorTiers={sponsorTiers} />;
}
