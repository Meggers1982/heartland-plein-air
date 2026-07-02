import type { Metadata } from "next";
import Schedule from "@/page-components/Schedule";

export const metadata: Metadata = {
  title: "Schedule of Events | Heartland Plein Air Festival",
  description:
    "Full schedule for the Heartland Plein Air Festival, September 12 – October 2, 2026, across the Omaha metro.",
  alternates: { canonical: "https://heartlandpleinair.org/schedule" },
};

export default function SchedulePage() {
  return <Schedule />;
}
