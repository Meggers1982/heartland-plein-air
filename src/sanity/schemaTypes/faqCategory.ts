import { orderRankField } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export const faqCategory = defineType({
  name: "faqCategory",
  title: "FAQ Category",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    orderRankField({ type: "faqCategory" }),
  ],
  preview: {
    select: { title: "title" },
  },
});
