import { defineField, defineType } from "sanity";

// The logos come from Sponsor documents (the untiered funders); only the
// heading above them is set here.
export const sponsorsSection = defineType({
  name: "sponsorsSection",
  title: "Sponsors",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      type: "string",
      description: "The small label above the heading.",
      initialValue: "Made Possible By",
    }),
    defineField({
      name: "title",
      type: "string",
      initialValue: "Our Sponsors",
    }),
  ],
  preview: {
    select: { subtitle: "title" },
    prepare: ({ subtitle }) => ({ title: "Sponsors", subtitle }),
  },
});
