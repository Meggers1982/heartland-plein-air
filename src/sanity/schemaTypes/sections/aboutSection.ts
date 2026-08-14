import { defineField, defineType } from "sanity";

export const aboutSection = defineType({
  name: "aboutSection",
  title: "About",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "paragraphs",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({ name: "linkLabel", type: "string" }),
    defineField({ name: "linkHref", type: "string" }),
    defineField({ name: "image", type: "image" }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title: "About", subtitle: title }),
  },
});
