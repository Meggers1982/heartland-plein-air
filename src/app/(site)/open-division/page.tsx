import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/pageMetadata";
import OpenDivision from "@/page-components/OpenDivision";
import { getOpenDivisionPage } from "@/sanity/queries/pages";
import { getQuickFacts } from "@/sanity/queries/openDivision";
import { getFormConfig } from "@/sanity/queries/formConfig";

export async function generateMetadata(): Promise<Metadata> {
  const { registrationFee, capacity } = await getOpenDivisionPage();
  return buildPageMetadata({
    route: "/open-division",
    fallbackTitle: "Register to Paint Plein Air With the Pros: Omaha 2026",
    fallbackDescription:
      "Register to paint alongside 25 national artists during festival week. Limited to {capacity} spots at ${fee}. All mediums welcome. Sept. 13\u201319, 2026, Omaha metro.",
    // Keeps the fee out of the editable string — see `replacements`.
    replacements: { fee: registrationFee, capacity },
  });
}

export default async function OpenDivisionPage() {
  const [quickFacts, inquiryFormConfig, page] = await Promise.all([
    getQuickFacts(),
    getFormConfig("openDivisionInquiry"),
    getOpenDivisionPage(),
  ]);
  return <OpenDivision page={page} quickFacts={quickFacts} inquiryFormConfig={inquiryFormConfig} />;
}
