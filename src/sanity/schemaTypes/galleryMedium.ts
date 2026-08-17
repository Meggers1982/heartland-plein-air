import { orderRankField } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

// A gallery category — "Oil & Pastel", "Watercolor", and whatever gets added
// next. Artists point at one of these, and the filter buttons on /gallery build
// themselves from the ones actually in use.
//
// This used to be a fixed two-item list written in BOTH the artist schema and
// Gallery.tsx, so adding a category meant a developer editing two files. Now
// it's one document each.
export const galleryMedium = defineType({
  name: "galleryMedium",
  title: "Gallery Medium",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Button label",
      type: "string",
      description: 'What visitors see on the filter button, e.g. "Oil & Pastel".',
      validation: (Rule) => Rule.required(),
    }),
    orderRankField({ type: "galleryMedium" }),
  ],
  preview: {
    select: { title: "label" },
  },
});
