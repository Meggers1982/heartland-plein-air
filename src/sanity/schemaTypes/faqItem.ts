import { orderRankField } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

import { portableTextBlock } from "./shared/portableText";

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "document",
  fields: [
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "faqCategory" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "question", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "answer",
      type: "array",
      of: [portableTextBlock],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      type: "boolean",
      initialValue: false,
      description: "Shown in the homepage FAQ teaser section.",
    }),
    orderRankField({ type: "faqItem" }),
  ],
  preview: {
    select: { title: "question", subtitle: "category.title" },
  },
});
