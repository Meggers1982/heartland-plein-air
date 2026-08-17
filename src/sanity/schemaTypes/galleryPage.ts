import { defineField, defineType } from "sanity";

// Singleton (_id: "galleryPage") — the header above the gallery. The paintings
// themselves come from each Artist's own paintings.
export const galleryPage = defineType({
  name: "galleryPage",
  title: "Gallery Page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "title", type: "string" }),
    defineField({
      name: "intro",
      title: "Introduction",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      description:
        "The paragraphs under the header. Link to another page by writing [Artists page](/artists).",
    }),
    defineField({
      name: "allFilterLabel",
      title: 'Label for the "show everything" button',
      type: "string",
      description: "The first filter button, before the individual mediums.",
    }),
  ],
  preview: { prepare: () => ({ title: "Gallery Page" }) },
});
