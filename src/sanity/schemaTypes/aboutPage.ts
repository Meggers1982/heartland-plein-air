import { defineArrayMember, defineField, defineType } from "sanity";

import { portableTextBlock } from "./shared/portableText";

// Singleton (_id: "aboutPage") — pinned in structure.ts, not a creatable list.
// The /about page had no Sanity content at all before this; every word was in
// About.tsx. The shape mirrors what that page already renders: a dark header,
// a lead-in, then alternating eyebrow + heading + prose sections.
export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Header eyebrow",
      type: "string",
      description: 'The small line above the title, e.g. "September 13–19, 2026".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Page title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Introduction",
      type: "array",
      of: [portableTextBlock],
      description: "The opening paragraphs, before the first section heading.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "aboutPageSection",
          fields: [
            defineField({
              name: "eyebrow",
              type: "string",
              description: 'The small label above the heading, e.g. "The Art Form".',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "heading",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "body",
              type: "array",
              of: [portableTextBlock],
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "heading", subtitle: "eyebrow" },
          },
        }),
      ],
      description: "Drag to reorder. Each one renders as a band down the page.",
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    prepare: () => ({ title: "About Page" }),
  },
});
