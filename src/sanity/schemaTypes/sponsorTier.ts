import { orderRankField } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export const sponsorTier = defineType({
  name: "sponsorTier",
  title: "Sponsor Tier",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      type: "string",
      description: 'Display price range, e.g. "$5,000 and over".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "min",
      title: "Minimum amount (USD)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "icon",
      type: "string",
      options: { list: ["Crown", "Gem", "Award", "Medal", "Star", "Heart"] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "benefits",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "nameOnly",
      title: "Name only (no logos)",
      type: "boolean",
      initialValue: false,
      description:
        "Sponsors at this tier are listed by name only on the Sponsors page, even if they have a logo on file.",
    }),
    orderRankField({ type: "sponsorTier" }),
  ],
  preview: {
    select: { title: "name", subtitle: "price" },
  },
});
