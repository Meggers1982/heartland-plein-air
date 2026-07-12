import type { Metadata } from "next";
import Faq from "@/page-components/Faq";

export const metadata: Metadata = {
  title: "Get Answers: Plein Air Festival FAQ Omaha 2026",
  description:
    "Get answers about the Heartland Plein Air Festival — what plein air is, where artists paint, how to buy artwork, tickets, volunteering, and more.",
  alternates: { canonical: "https://heartlandpleinair.org/faq" },
};

export default function FaqPage() {
  return <Faq />;
}
