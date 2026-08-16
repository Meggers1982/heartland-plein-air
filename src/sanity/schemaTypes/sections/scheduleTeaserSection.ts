import { defineField, defineType } from "sanity";

// The days come from Homepage Highlights; only the heading is set here.
export const scheduleTeaserSection = defineType({
  name: "scheduleTeaserSection",
  title: "Schedule Teaser",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      type: "string",
      description: "The small label above the heading.",
      initialValue: "The Week at a Glance",
    }),
    defineField({
      name: "title",
      type: "string",
      initialValue: "Festival Schedule",
    }),
  ],
  preview: {
    select: { subtitle: "title" },
    prepare: ({ subtitle }) => ({ title: "Schedule Teaser", subtitle }),
  },
});
