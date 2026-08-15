import type { Metadata } from "next";
import Terms from "@/page-components/Terms";

const DESCRIPTION =
  "Terms for using heartlandpleinair.org and attending Heartland Plein Air Festival events — tickets and payment, refunds, artwork and copyright, photography, and weather changes.";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: DESCRIPTION,
  alternates: { canonical: "https://heartlandpleinair.org/terms" },
  openGraph: {
    title: "Terms of Use | Heartland Plein Air Festival",
    description: DESCRIPTION,
    type: "website",
    url: "https://heartlandpleinair.org/terms",
    siteName: "Heartland Plein Air Festival",
    locale: "en_US",
    images: ["/assets/hero-pleinair.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Use | Heartland Plein Air Festival",
    description: DESCRIPTION,
    images: ["/assets/hero-pleinair.jpg"],
  },
};

export default function TermsPage() {
  return <Terms />;
}
