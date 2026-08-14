import { defineField, defineType } from "sanity";

const cta = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "label", type: "string", validation: (Rule) => Rule.required() }),
      defineField({ name: "href", type: "string", validation: (Rule) => Rule.required() }),
    ],
  });

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "subtitle", type: "text", rows: 2, validation: (Rule) => Rule.required() }),
    defineField({ name: "backgroundImage", type: "image" }),
    cta("primaryCta", "Primary button"),
    cta("secondaryCta", "Secondary button"),
    cta("tertiaryCta", "Tertiary button"),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title: "Hero", subtitle: title }),
  },
});
