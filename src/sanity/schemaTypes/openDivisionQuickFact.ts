import { orderRankField } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export const openDivisionQuickFact = defineType({
  name: "openDivisionQuickFact",
  title: "Open Division Quick Fact",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      type: "string",
      options: { list: ["DollarSign", "Ruler", "Stamp", "Percent"] },
      validation: (Rule) => Rule.required(),
    }),
    orderRankField({ type: "openDivisionQuickFact" }),
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
});
