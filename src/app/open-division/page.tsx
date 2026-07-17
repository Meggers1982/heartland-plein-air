import type { Metadata } from "next";
import OpenDivision from "@/page-components/OpenDivision";

export const metadata: Metadata = {
  title: "Register to Paint Plein Air With the Pros: Omaha 2026",
  description:
    "Register to paint alongside 25 national artists during festival week. Limited to 30 spots at $30. All mediums welcome. Sept. 13–19, 2026, Omaha metro.",
  alternates: { canonical: "https://heartlandpleinair.org/open-division" },
  openGraph: {
    title: "Register to Paint Plein Air With the Pros: Omaha 2026",
    description:
      "Register to paint alongside 25 national artists during festival week. Limited to 30 spots at $30. All mediums welcome. Sept. 13–19, 2026, Omaha metro.",
    type: "website",
    url: "https://heartlandpleinair.org/open-division",
    siteName: "Heartland Plein Air Festival",
    locale: "en_US",
    images: ["/assets/hero-pleinair.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Register to Paint Plein Air With the Pros: Omaha 2026",
    description:
      "Register to paint alongside 25 national artists during festival week. Limited to 30 spots at $30. All mediums welcome. Sept. 13–19, 2026, Omaha metro.",
    images: ["/assets/hero-pleinair.jpg"],
  },
};

export default function OpenDivisionPage() {
  return <OpenDivision />;
}
