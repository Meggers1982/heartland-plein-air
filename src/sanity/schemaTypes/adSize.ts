import { orderRankField } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export const adSize = defineType({
  name: "adSize",
  title: "Ad Size",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "price", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "icon",
      type: "string",
      options: { list: ["Maximize2", "Rows2", "LayoutGrid"] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "dimensions", type: "string", validation: (Rule) => Rule.required() }),
    orderRankField({ type: "adSize" }),
  ],
  preview: {
    select: { title: "name", subtitle: "price" },
  },
});
