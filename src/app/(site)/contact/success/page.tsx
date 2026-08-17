import type { Metadata } from "next";
import ContactSuccess from "@/page-components/ContactSuccess";
import { getContactInfo, getSiteChrome } from "@/sanity/queries/pages";

export const metadata: Metadata = {
  title: "Message Sent | Heartland Plein Air Festival",
  description: "Thank you for contacting the Heartland Plein Air Festival.",
  alternates: { canonical: "https://heartlandpleinair.org/contact/success" },
  robots: { index: false, follow: false },
};

export default async function ContactSuccessPage() {
  const contactInfo = await getContactInfo();
  const chrome = await getSiteChrome();
  return <ContactSuccess chrome={chrome} contactInfo={contactInfo} />;
}
