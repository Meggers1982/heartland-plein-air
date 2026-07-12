import type { Metadata } from "next";
import Schedule from "@/page-components/Schedule";

export const metadata: Metadata = {
  title: "Plan Your Visit: Plein Air Festival Schedule Omaha",
  description:
    "Full event schedule for the Heartland Plein Air Festival — daily paint-outs, the Judge's Lecture, Collectors Preview, and the Sept. 19 public exhibition.",
  alternates: { canonical: "https://heartlandpleinair.org/schedule" },
};

export default function SchedulePage() {
  return <Schedule />;
}
