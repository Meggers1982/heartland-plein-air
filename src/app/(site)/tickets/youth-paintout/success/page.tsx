import type { Metadata } from "next";
import YouthPaintoutSuccess from "@/page-components/YouthPaintoutSuccess";
import { getContactInfo, getTicketsPage } from "@/sanity/queries/pages";

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
  const page = await getTicketsPage();
  return <YouthPaintoutSuccess page={page} contactInfo={contactInfo} />;
}
