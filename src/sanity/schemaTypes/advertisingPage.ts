import { defineArrayMember, defineField, defineType } from "sanity";

// Singleton (_id: "advertisingPage") — the artwork file specifications shown
// beside the ad size options. Previously hardcoded in Advertising.tsx.
export const advertisingPage = defineType({
  name: "advertisingPage",
  title: "Advertising Page",
  type: "document",
  groups: [
    { name: "page", title: "Page text", default: true },
    { name: "lists", title: "Lists" },
  ],
  fields: [
    // Headings and paragraphs, in page order.
    defineField({ name: "eyebrow", type: "string", group: "page" }),
    defineField({ name: "title", type: "string", group: "page" }),
    defineField({ name: "intro", type: "text", rows: 3, group: "page" }),
    defineField({ name: "catalogEyebrow", type: "string", group: "page" }),
    defineField({ name: "catalogTitle", type: "string", group: "page" }),
    defineField({ name: "specsEyebrow", type: "string", group: "page" }),
    defineField({ name: "specsTitle", type: "string", group: "page" }),
    defineField({ name: "specsIntro", type: "text", rows: 2, group: "page" }),
    defineField({ name: "reserveEyebrow", type: "string", group: "page" }),
    defineField({ name: "reserveTitle", type: "string", group: "page" }),
    defineField({ name: "reserveIntro", type: "text", rows: 2, group: "page" }),
    defineField({ name: "deadlineTitle", type: "string", group: "page" }),
    defineField({ name: "deadlineBody", type: "text", rows: 2, group: "page" }),
    defineField({ name: "submitTitle", type: "string", group: "page" }),
    defineField({ name: "submitBody", type: "text", rows: 2, group: "page", description: "Link the address by writing [info@ralstonarts.org](mailto:info@ralstonarts.org)." }),
    defineField({ name: "paymentTitle", type: "string", group: "page" }),
    defineField({ name: "paymentBody", type: "text", rows: 2, group: "page" }),
    defineField({ name: "closedNote", type: "string", group: "page", description: "Shown once the deadline has passed." }),
    defineField({ name: "ctaTitle", type: "string", group: "page" }),
    defineField({ name: "ctaBody", type: "text", rows: 2, group: "page" }),
    defineField({
      name: "fileSpecs",
      title: "Artwork file specifications",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "fileSpec",
          fields: [
            defineField({
              name: "icon",
              type: "string",
              description:
                "Icon name. Available: FileText, Ruler, Palette, Layers, Maximize2, Rows2, LayoutGrid. An unrecognised name simply renders no icon.",
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: "text", type: "string", validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: "text", subtitle: "icon" } },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: { prepare: () => ({ title: "Advertising Page" }) },
});
