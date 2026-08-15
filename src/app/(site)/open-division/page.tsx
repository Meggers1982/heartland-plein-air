import type { Metadata } from "next";
import OpenDivision from "@/page-components/OpenDivision";
import { getOpenDivisionPage } from "@/sanity/queries/pages";
import { getQuickFacts } from "@/sanity/queries/openDivision";
import { getFormConfig } from "@/sanity/queries/formConfig";

export async function generateMetadata(): Promise<Metadata> {
  const { registrationFee, capacity } = await getOpenDivisionPage();
  const description = `Register to paint alongside 25 national artists during festival week. Limited to ${capacity} spots at $${registrationFee}. All mediums welcome. Sept. 13–19, 2026, Omaha metro.`;
  return {
  title: "Register to Paint Plein Air With the Pros: Omaha 2026",
  description,
  alternates: { canonical: "https://heartlandpleinair.org/open-division" },
  openGraph: {
    title: "Register to Paint Plein Air With the Pros: Omaha 2026",
    description,
    type: "website",
    url: "https://heartlandpleinair.org/open-division",
    siteName: "Heartland Plein Air Festival",
    locale: "en_US",
    images: ["/assets/hero-pleinair.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Register to Paint Plein Air With the Pros: Omaha 2026",
    description,
    images: ["/assets/hero-pleinair.jpg"],
  },
  };
}

export default async function OpenDivisionPage() {
  const [quickFacts, inquiryFormConfig, page] = await Promise.all([
    getQuickFacts(),
    getFormConfig("openDivisionInquiry"),
    getOpenDivisionPage(),
  ]);
  return <OpenDivision page={page} quickFacts={quickFacts} inquiryFormConfig={inquiryFormConfig} />;
}
