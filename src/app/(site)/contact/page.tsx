import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/pageMetadata";
import Contact from "@/page-components/Contact";
import { getFormConfig } from "@/sanity/queries/formConfig";
import { getContactInfo } from "@/sanity/queries/pages";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    route: "/contact",
    fallbackTitle: "Contact the Plein Air Festival Team: Ralston, NE",
    fallbackDescription: "Questions about the festival, sponsorships, volunteering, or advertising? Reach the Heartland Plein Air Festival team in Ralston, Nebraska.",
  });
}

export default async function ContactPage() {
  const [config, contactInfo] = await Promise.all([
    getFormConfig("contact"),
    getContactInfo(),
  ]);
  return <Contact config={config} contactInfo={contactInfo} />;
}
