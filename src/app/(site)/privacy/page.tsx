import type { Metadata } from "next";
import Privacy from "@/page-components/Privacy";

const DESCRIPTION =
  "How the Heartland Plein Air Festival collects, uses, and shares personal information — including forms, analytics, payments, and children's registration data.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: DESCRIPTION,
  alternates: { canonical: "https://heartlandpleinair.org/privacy" },
  openGraph: {
    title: "Privacy Policy | Heartland Plein Air Festival",
    description: DESCRIPTION,
    type: "website",
    url: "https://heartlandpleinair.org/privacy",
    siteName: "Heartland Plein Air Festival",
    locale: "en_US",
    images: ["/assets/hero-pleinair.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Heartland Plein Air Festival",
    description: DESCRIPTION,
    images: ["/assets/hero-pleinair.jpg"],
  },
};

export default function PrivacyPage() {
  return <Privacy />;
}
