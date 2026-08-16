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
  ],
  preview: { prepare: () => ({ title: "Gallery Page" }) },
});
