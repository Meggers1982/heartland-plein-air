import type { Metadata } from "next";
import Tickets from "@/page-components/Tickets";
import { getFormConfig } from "@/sanity/queries/formConfig";
import { getTicketsPage } from "@/sanity/queries/pages";

export const metadata: Metadata = {
  title: "Buy Plein Air Festival Tickets: Get Closer to the Art",
  description:
    "Most festival events are free. Get the $125 Collector VIP Pass, or buy standalone tickets: $25 lecture, $95 Collectors Preview Reception.",
  alternates: { canonical: "https://heartlandpleinair.org/tickets" },
  openGraph: {
    title: "Buy Plein Air Festival Tickets: Get Closer to the Art",
    description:
      "Most festival events are free. Get the $125 Collector VIP Pass, or buy standalone tickets: $25 lecture, $95 Collectors Preview Reception.",
    type: "website",
    url: "https://heartlandpleinair.org/tickets",
    siteName: "Heartland Plein Air Festival",
    locale: "en_US",
    images: ["/assets/hero-pleinair.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy Plein Air Festival Tickets: Get Closer to the Art",
    description:
      "Most festival events are free. Get the $125 Collector VIP Pass, or buy standalone tickets: $25 lecture, $95 Collectors Preview Reception.",
    images: ["/assets/hero-pleinair.jpg"],
  },
};

export default async function TicketsPage() {
  const youthPaintoutFormConfig = await getFormConfig("youthPaintout");
  const page = await getTicketsPage();
  return <Tickets page={page} youthPaintoutFormConfig={youthPaintoutFormConfig} />;
}
