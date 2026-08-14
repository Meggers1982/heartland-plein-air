import type { PortableTextBlock } from "sanity";

import { sanityFetch } from "@/sanity/lib/live";

export type FaqItem = {
  _id: string;
  question: string;
  answer: PortableTextBlock[];
  featured: boolean;
};

export type FaqCategory = {
  _id: string;
  title: string;
  items: FaqItem[];
};

const TAGS = ["faqCategory", "faqItem"];

export async function getFaqCategories() {
  const { data } = await sanityFetch({
    query: `*[_type == "faqCategory"] | order(orderRank) {
      _id,
      title,
      "items": *[_type == "faqItem" && references(^._id)] | order(orderRank)
    }`,
    tags: TAGS,
  });
  return data as FaqCategory[];
}

export async function getFeaturedFaqItems() {
  const { data } = await sanityFetch({
    query: `*[_type == "faqItem" && featured == true] | order(orderRank)`,
    tags: TAGS,
  });
  return data as FaqItem[];
}
