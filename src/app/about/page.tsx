import type { Metadata } from "next";
import About from "@/page-components/About";

export const metadata: Metadata = {
  title: "Learn About the Plein Air Festival: Omaha, NE 2026",
  description:
    "Learn what plein air painting is, how festival week works, and who organizes it. 25 national artists paint the Omaha metro live, Sept. 13–19, 2026.",
  alternates: { canonical: "https://heartlandpleinair.org/about" },
  openGraph: {
    title: "Learn About the Plein Air Festival: Omaha, NE 2026",
    description:
      "Learn what plein air painting is, how festival week works, and who organizes it. 25 national artists paint the Omaha metro live, Sept. 13–19, 2026.",
    type: "website",
    url: "https://heartlandpleinair.org/about",
    siteName: "Heartland Plein Air Festival",
    locale: "en_US",
    images: ["/assets/plein-air-painter-niobrara-river.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn About the Plein Air Festival: Omaha, NE 2026",
    description:
      "Learn what plein air painting is, how festival week works, and who organizes it. 25 national artists paint the Omaha metro live, Sept. 13–19, 2026.",
    images: ["/assets/plein-air-painter-niobrara-river.webp"],
  },
};

export default function AboutPage() {
  return <About />;
}
