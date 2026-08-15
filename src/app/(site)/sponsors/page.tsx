import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/pageMetadata";
import Sponsors from "@/page-components/Sponsors";
import { getFunders, getSponsorTiersWithSponsors } from "@/sanity/queries/sponsors";
import { getFormConfig } from "@/sanity/queries/formConfig";
import { getSponsorsPage } from "@/sanity/queries/pages";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    route: "/sponsors",
    fallbackTitle: "Sponsor the Plein Air Festival: Put Your Name on It",
    fallbackDescription: "Support the Heartland Plein Air Festival. Sponsorship levels from $100 to $5,000+, with logo placement, catalog ads, and VIP passes. 501(c)(3) org.",
  });
}

export default async function SponsorsPage() {
  const [funders, sponsorTiers, inquiryFormConfig, page] = await Promise.all([
    getFunders(),
    getSponsorTiersWithSponsors(),
    getFormConfig("sponsorshipInquiry"),
    getSponsorsPage(),
  ]);
  return (
    <Sponsors page={page} funders={funders} sponsorTiers={sponsorTiers} inquiryFormConfig={inquiryFormConfig} />
  );
}
