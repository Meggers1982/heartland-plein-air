import type { Metadata } from "next";
import YouthPaintoutSuccess from "@/page-components/YouthPaintoutSuccess";
import { getContactInfo, getTicketsPage, getSiteChrome } from "@/sanity/queries/pages";

export const metadata: Metadata = {
  title: "Youth Paintout Registration Received | Heartland Plein Air Festival",
  description:
    "You're registered for the Youth Paintout on September 12. Here's what to wear and what to do when you arrive.",
  alternates: {
    canonical: "https://heartlandpleinair.org/tickets/youth-paintout/success",
  },
  robots: { index: false, follow: false },
};

export default async function YouthPaintoutSuccessPage() {
  const contactInfo = await getContactInfo();
  const chrome = await getSiteChrome();
  const page = await getTicketsPage();
  return <YouthPaintoutSuccess chrome={chrome} page={page} contactInfo={contactInfo} />;
}
