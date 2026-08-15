import { defineArrayMember, defineField, defineType } from "sanity";

// Singleton (_id: "sponsorsPage") — the "Award & Event Sponsorships" list, for
// supporters who want to fund something specific rather than take a tier.
// Previously hardcoded as `namedOpportunities` in Sponsors.tsx.
export const sponsorsPage = defineType({
  name: "sponsorsPage",
  title: "Sponsors Page",
  type: "document",
  fields: [
    defineField({
      name: "namedOpportunities",
      title: "Award & event sponsorships",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "namedOpportunity",
          fields: [
            defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
            defineField({
              name: "description",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
      description: "Drag to reorder. These appear as cards under 'Designated Giving'.",
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: { prepare: () => ({ title: "Sponsors Page" }) },
});
