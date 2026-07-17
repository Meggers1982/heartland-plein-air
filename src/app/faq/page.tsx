import type { Metadata } from "next";
import Faq from "@/page-components/Faq";

export const metadata: Metadata = {
  title: "Get Answers: Plein Air Festival FAQ Omaha 2026",
  description:
    "Get answers about the Heartland Plein Air Festival — what plein air is, where artists paint, how to buy artwork, tickets, volunteering, and more.",
  alternates: { canonical: "https://heartlandpleinair.org/faq" },
  openGraph: {
    title: "Get Answers: Plein Air Festival FAQ Omaha 2026",
    description:
      "Get answers about the Heartland Plein Air Festival — what plein air is, where artists paint, how to buy artwork, tickets, volunteering, and more.",
    type: "website",
    url: "https://heartlandpleinair.org/faq",
    siteName: "Heartland Plein Air Festival",
    locale: "en_US",
    images: ["/assets/hero-pleinair.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Answers: Plein Air Festival FAQ Omaha 2026",
    description:
      "Get answers about the Heartland Plein Air Festival — what plein air is, where artists paint, how to buy artwork, tickets, volunteering, and more.",
    images: ["/assets/hero-pleinair.jpg"],
  },
};

export default function FaqPage() {
  return <Faq />;
}
