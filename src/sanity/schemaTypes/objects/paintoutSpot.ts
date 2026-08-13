import { defineField, defineType } from "sanity";

export const paintoutSpot = defineType({
  name: "paintoutSpot",
  title: "Paintout Spot",
  type: "object",
  fields: [
    defineField({ name: "name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "address", type: "string" }),
    defineField({ name: "note", type: "string" }),
  ],
  preview: {
    select: { title: "name", subtitle: "address" },
  },
});
