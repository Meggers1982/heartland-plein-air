import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/pageMetadata";
import Schedule from "@/page-components/Schedule";
import { getFestivalLocations, getScheduleDays } from "@/sanity/queries/schedule";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    route: "/schedule",
    fallbackTitle: "Plan Your Visit: Plein Air Festival Schedule Omaha",
    fallbackDescription: "Full event schedule for the Heartland Plein Air Festival \u2014 daily paint-outs, the Judge's Lecture, Collectors Preview, and the Sept. 19 public exhibition.",
  });
}

export default async function SchedulePage() {
  const [days, festivalLocations] = await Promise.all([
    getScheduleDays(),
    getFestivalLocations(),
  ]);
  return <Schedule days={days} festivalLocations={festivalLocations} />;
}
