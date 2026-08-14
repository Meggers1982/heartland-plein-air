import { defineField, defineType } from "sanity";

export const festivalHighlightsSection = defineType({
  name: "festivalHighlightsSection",
  title: "Festival Highlights",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "highlights",
      type: "array",
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: "object",
          name: "highlight",
          fields: [
            defineField({
              name: "icon",
              type: "string",
              options: { list: ["Users", "MapPin", "Eye", "ShoppingBag"] },
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
            defineField({
              name: "description",
              type: "text",
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "title", subtitle: "icon" } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title: "Festival Highlights", subtitle: title }),
  },
});
