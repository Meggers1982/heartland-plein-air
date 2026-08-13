import type { Metadata } from "next";
import OpenDivisionSuccess from "@/page-components/OpenDivisionSuccess";
import { getQuickFacts } from "@/sanity/queries/openDivision";

export const metadata: Metadata = {
  title: "Registration Received | Heartland Plein Air Festival",
  description:
    "Thank you for registering for the Open Division at the Heartland Plein Air Festival.",
  alternates: { canonical: "https://heartlandpleinair.org/open-division/success" },
  robots: { index: false, follow: false },
};

export default async function OpenDivisionSuccessPage() {
  const quickFacts = await getQuickFacts();
  return <OpenDivisionSuccess quickFacts={quickFacts} />;
}
