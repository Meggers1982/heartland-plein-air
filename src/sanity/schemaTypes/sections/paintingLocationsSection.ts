import { defineField, defineType } from "sanity";

export const paintingLocationsSection = defineType({
  name: "paintingLocationsSection",
  title: "Painting Locations",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "description",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "helperText",
      title: "Helper text",
      type: "text",
      rows: 2,
      description: "Shorter line beneath description, e.g. instructions for using the map filter.",
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title: "Painting Locations", subtitle: title }),
  },
});
