import type { Metadata } from "next";
import Index from "@/page-components/Index";
import { getFunders } from "@/sanity/queries/sponsors";

export const metadata: Metadata = {
  title: "Heartland Plein Air Festival: See Art Made in the Open",
  description:
    "Watch 25 nationally recognized artists paint the Omaha metro live. Free public events all week. Exhibition and auction September 19, 2026, in Ralston, NE.",
  alternates: { canonical: "https://heartlandpleinair.org" },
};

export default async function HomePage() {
  const funders = await getFunders();
  return <Index funders={funders} />;
}
