import type { Metadata } from "next";
import Faq from "@/page-components/Faq";

export const metadata: Metadata = {
  title: "FAQ | Heartland Plein Air Festival",
  description:
    "Answers to frequently asked questions about the Heartland Plein Air Festival — tickets, locations, buying art, volunteering, and more.",
  alternates: { canonical: "https://heartlandpleinair.org/faq" },
};

export default function FaqPage() {
  return <Faq />;
}
