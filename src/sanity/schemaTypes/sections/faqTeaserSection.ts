import { defineField, defineType } from "sanity";

export const faqTeaserSection = defineType({
  name: "faqTeaserSection",
  title: "FAQ Teaser",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "linkLabel", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "linkHref", type: "string", validation: (Rule) => Rule.required() }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title: "FAQ Teaser", subtitle: title }),
  },
});
