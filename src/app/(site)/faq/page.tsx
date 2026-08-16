import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/pageMetadata";
import Faq from "@/page-components/Faq";
import { getFaqPage } from "@/sanity/queries/pages";
import { getFaqCategories } from "@/sanity/queries/faq";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    route: "/faq",
    fallbackTitle: "Get Answers: Plein Air Festival FAQ Omaha 2026",
    fallbackDescription: "Get answers about the Heartland Plein Air Festival \u2014 what plein air is, where artists paint, how to buy artwork, tickets, volunteering, and more.",
  });
}

export default async function FaqPage() {
  const categories = await getFaqCategories();
  const page = await getFaqPage();
  return <Faq page={page} categories={categories} />;
}
