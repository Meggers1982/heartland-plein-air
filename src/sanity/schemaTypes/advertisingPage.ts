import { defineArrayMember, defineField, defineType } from "sanity";

// Singleton (_id: "advertisingPage") — the artwork file specifications shown
// beside the ad size options. Previously hardcoded in Advertising.tsx.
export const advertisingPage = defineType({
  name: "advertisingPage",
  title: "Advertising Page",
  type: "document",
  fields: [
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
