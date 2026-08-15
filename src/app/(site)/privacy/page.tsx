import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/pageMetadata";
import Privacy from "@/page-components/Privacy";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    route: "/privacy",
    fallbackTitle: "Privacy Policy",
    fallbackDescription: "How the Heartland Plein Air Festival collects, uses, and shares personal information \u2014 including forms, analytics, payments, and children's registration data.",
  });
}

export default function PrivacyPage() {
  return <Privacy />;
}
