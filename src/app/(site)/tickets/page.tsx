import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/pageMetadata";
import Tickets from "@/page-components/Tickets";
import { getFormConfig } from "@/sanity/queries/formConfig";
import { getTicketsPage } from "@/sanity/queries/pages";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    route: "/tickets",
    fallbackTitle: "Buy Plein Air Festival Tickets: Get Closer to the Art",
    fallbackDescription: "Most festival events are free. Get the $125 Collector VIP Pass, or buy standalone tickets: $25 lecture, $95 Collectors Preview Reception.",
  });
}

export default async function TicketsPage() {
  const youthPaintoutFormConfig = await getFormConfig("youthPaintout");
  const page = await getTicketsPage();
  return <Tickets page={page} youthPaintoutFormConfig={youthPaintoutFormConfig} />;
}
