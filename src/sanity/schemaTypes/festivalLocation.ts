import { orderRankField } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export const festivalLocation = defineType({
  name: "festivalLocation",
  title: "Festival Location",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "address", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "lat", type: "number", validation: (Rule) => Rule.required() }),
    defineField({ name: "lng", type: "number", validation: (Rule) => Rule.required() }),
    defineField({
      name: "description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "websiteUrl", type: "url" }),
    defineField({
      name: "events",
      type: "array",
      of: [{ type: "locationEvent" }],
    }),
    orderRankField({ type: "festivalLocation" }),
  ],
  preview: {
    select: { title: "name", subtitle: "address" },
  },
});
