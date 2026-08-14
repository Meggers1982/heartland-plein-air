import { defineField, defineType } from "sanity";

export const vipPassTeaserSection = defineType({
  name: "vipPassTeaserSection",
  title: "VIP Pass Teaser",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "ctaLabel", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "ctaHref", type: "string", validation: (Rule) => Rule.required() }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title: "VIP Pass Teaser", subtitle: title }),
  },
});
