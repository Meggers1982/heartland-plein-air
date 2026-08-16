import { defineField, defineType } from "sanity";

// The roster comes from Artist documents; only the heading is set here.
export const artistSpotlightSection = defineType({
  name: "artistSpotlightSection",
  title: "Artist Spotlight",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      type: "string",
      description: "The small label above the heading.",
      initialValue: "Meet the Painters",
    }),
    defineField({
      name: "title",
      type: "string",
      initialValue: "Artist Spotlight",
    }),
  ],
  preview: {
    select: { subtitle: "title" },
    prepare: ({ subtitle }) => ({ title: "Artist Spotlight", subtitle }),
  },
});
