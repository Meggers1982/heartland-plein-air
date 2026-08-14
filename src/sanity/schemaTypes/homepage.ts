import { defineField, defineType } from "sanity";

export const SECTION_TYPE_NAMES = [
  "heroSection",
  "aboutSection",
  "festivalHighlightsSection",
  "scheduleTeaserSection",
  "vipPassTeaserSection",
  "paintingLocationsSection",
  "artistSpotlightSection",
  "sponsorsSection",
  "faqTeaserSection",
  "newsletterCtaSection",
] as const;

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  // Singleton: Studio's structure.ts pins this to a single fixed document
  // (_id: "homepage") rather than listing it as a creatable collection.
  fields: [
    defineField({
      name: "sections",
      type: "array",
      of: SECTION_TYPE_NAMES.map((name) => ({ type: name })),
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage" }),
  },
});
