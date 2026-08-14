import { defineField, defineType } from "sanity";

// Marker-only: content comes from sponsor documents (the untiered funders).
// This type just marks the position of the "Made Possible By" strip in the
// homepage's section order.
export const sponsorsSection = defineType({
  name: "sponsorsSection",
  title: "Sponsors",
  type: "object",
  fields: [
    defineField({
      name: "internalNote",
      type: "string",
      description: "Not shown on the site. Content comes from Sponsor documents.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Sponsors", subtitle: "Pulls from Sponsors" }),
  },
});
