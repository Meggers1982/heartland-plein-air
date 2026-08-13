import type { PortableTextBlock } from "sanity";

import { client } from "@/sanity/client";

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

const TAGS = { next: { revalidate: 3600, tags: ["faqCategory", "faqItem"] } };

export async function getFaqCategories() {
  return client.fetch<FaqCategory[]>(
    `*[_type == "faqCategory"] | order(orderRank) {
      _id,
      title,
      "items": *[_type == "faqItem" && references(^._id)] | order(orderRank)
    }`,
    {},
    TAGS
  );
}

export async function getFeaturedFaqItems() {
  return client.fetch<FaqItem[]>(
    `*[_type == "faqItem" && featured == true] | order(orderRank)`,
    {},
    TAGS
  );
}
