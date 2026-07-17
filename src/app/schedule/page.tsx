import type { Metadata } from "next";
import Schedule from "@/page-components/Schedule";

export const metadata: Metadata = {
  title: "Plan Your Visit: Plein Air Festival Schedule Omaha",
  description:
    "Full event schedule for the Heartland Plein Air Festival — daily paint-outs, the Judge's Lecture, Collectors Preview, and the Sept. 19 public exhibition.",
  alternates: { canonical: "https://heartlandpleinair.org/schedule" },
  openGraph: {
    title: "Plan Your Visit: Plein Air Festival Schedule Omaha",
    description:
      "Full event schedule for the Heartland Plein Air Festival — daily paint-outs, the Judge's Lecture, Collectors Preview, and the Sept. 19 public exhibition.",
    type: "website",
    url: "https://heartlandpleinair.org/schedule",
    siteName: "Heartland Plein Air Festival",
    locale: "en_US",
    images: ["/assets/hero-pleinair.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plan Your Visit: Plein Air Festival Schedule Omaha",
    description:
      "Full event schedule for the Heartland Plein Air Festival — daily paint-outs, the Judge's Lecture, Collectors Preview, and the Sept. 19 public exhibition.",
    images: ["/assets/hero-pleinair.jpg"],
  },
};

export default function SchedulePage() {
  return <Schedule />;
}
