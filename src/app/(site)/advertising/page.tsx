import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/pageMetadata";
import Advertising from "@/page-components/Advertising";
import { getAdSizes } from "@/sanity/queries/advertising";
import { getFormConfig } from "@/sanity/queries/formConfig";
import { getAdvertisingPage } from "@/sanity/queries/pages";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    route: "/advertising",
    fallbackTitle: "Advertise in the Plein Air Festival Catalog: Omaha",
    fallbackDescription: "Place an ad in the Heartland Plein Air Festival catalog \u2014 3,000 printed copies plus digital. Full, half, and quarter-page options from $125.",
  });
}

export default async function AdvertisingPage() {
  const [adSizes, inquiryFormConfig, page] = await Promise.all([
    getAdSizes(),
    getFormConfig("advertisingInquiry"),
    getAdvertisingPage(),
  ]);
  return <Advertising page={page} adSizes={adSizes} inquiryFormConfig={inquiryFormConfig} />;
}
