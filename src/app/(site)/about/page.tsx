import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/pageMetadata";
import About from "@/page-components/About";
import { getAboutPage } from "@/sanity/queries/pages";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    route: "/about",
    fallbackTitle: "Learn About the Plein Air Festival: Omaha, NE 2026",
    fallbackDescription: "Learn what plein air painting is, how festival week works, and who organizes it. 25 national artists paint the Omaha metro live, Sept. 13\u201319, 2026.",
    fallbackImage: "/assets/plein-air-painter-niobrara-river.webp",
  });
}

export default async function AboutPage() {
  const page = await getAboutPage();
  return <About page={page} />;
}
