import { defineField, defineType } from "sanity";

// Singleton (_id: "faqPage") — the headings around the questions.
// The questions themselves come from FAQ Categories and FAQ Items.
export const faqPage = defineType({
  name: "faqPage",
  title: "FAQ Page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "intro", type: "text", rows: 3 }),
    defineField({ name: "browseLabel", type: "string", description: "The label above the category buttons." }),
    defineField({ name: "noResultsText", type: "string", description: "Shown when a search matches nothing." }),
  ],
  preview: { prepare: () => ({ title: "FAQ Page" }) },
});
