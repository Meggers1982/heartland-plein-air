import { defineField, defineType } from "sanity";

// Marker-only: content comes from artist documents. This type just marks the
// position of the rotating artist spotlight in the homepage's section order.
export const artistSpotlightSection = defineType({
  name: "artistSpotlightSection",
  title: "Artist Spotlight",
  type: "object",
  fields: [
    defineField({
      name: "internalNote",
      type: "string",
      description: "Not shown on the site. Content comes from Artist documents.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Artist Spotlight", subtitle: "Pulls from Artists" }),
  },
});
