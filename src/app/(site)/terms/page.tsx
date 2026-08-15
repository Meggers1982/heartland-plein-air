import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/pageMetadata";
import Terms from "@/page-components/Terms";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    route: "/terms",
    fallbackTitle: "Terms of Use",
    fallbackDescription: "Terms for using heartlandpleinair.org and attending Heartland Plein Air Festival events \u2014 tickets and payment, refunds, artwork and copyright, photography, and weather changes.",
  });
}

export default function TermsPage() {
  return <Terms />;
}
