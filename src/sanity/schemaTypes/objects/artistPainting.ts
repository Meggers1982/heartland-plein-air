import { defineField, defineType } from "sanity";

export const artistPainting = defineType({
  name: "artistPainting",
  title: "Painting",
  type: "object",
  fields: [
    defineField({ name: "image", type: "image", validation: (Rule) => Rule.required() }),
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "alt", type: "string", validation: (Rule) => Rule.required() }),
  ],
  preview: {
    select: { title: "title", media: "image" },
  },
});
