import { defineArrayMember, defineField, defineType } from "sanity";

// Singleton (_id: "sponsorsPage") — the "Award & Event Sponsorships" list, for
// supporters who want to fund something specific rather than take a tier.
// Previously hardcoded as `namedOpportunities` in Sponsors.tsx.
export const sponsorsPage = defineType({
  name: "sponsorsPage",
  title: "Sponsors Page",
  type: "document",
  groups: [
    { name: "page", title: "Page text", default: true },
    { name: "lists", title: "Lists" },
  ],
  fields: [
    // Headings and paragraphs, in page order.
    defineField({ name: "eyebrow", type: "string", group: "page" }),
    defineField({ name: "title", type: "string", group: "page" }),
    defineField({ name: "becomeEyebrow", type: "string", group: "page" }),
    defineField({ name: "becomeTitle", type: "string", group: "page" }),
    defineField({ name: "becomeIntro", type: "text", rows: 4, group: "page" }),
    defineField({ name: "becomeLinkLabel", type: "string", group: "page" }),
    defineField({ name: "ctaTitle", type: "string", group: "page" }),
    defineField({ name: "ctaBody", type: "text", rows: 2, group: "page" }),
    defineField({ name: "payTitle", type: "string", group: "page" }),
    defineField({ name: "givingEyebrow", type: "string", group: "page" }),
    defineField({ name: "givingTitle", type: "string", group: "page" }),
    defineField({ name: "givingIntro", type: "text", rows: 2, group: "page" }),
    defineField({ name: "thankYouEyebrow", type: "string", group: "page" }),
    defineField({ name: "thankYouTitle", type: "string", group: "page" }),
    defineField({ name: "thankYouBody", type: "text", rows: 2, group: "page" }),
    defineField({ name: "partnersTitle", type: "string", group: "page" }),
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
