import { defineField, defineType } from "sanity";

// Marker-only: content comes from the homepageHighlight documents, which
// already reference scheduleDay. This type just marks the position of the
// "Week at a Glance" timeline in the homepage's section order.
export const scheduleTeaserSection = defineType({
  name: "scheduleTeaserSection",
  title: "Schedule Teaser",
  type: "object",
  fields: [
    defineField({
      name: "internalNote",
      type: "string",
      description: "Not shown on the site. Content comes from Homepage Highlights.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Schedule Teaser", subtitle: "Pulls from Homepage Highlights" }),
  },
});
