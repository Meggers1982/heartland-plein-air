import { defineField, defineType } from "sanity";

// Singleton (_id: "artistsPage") — the headings around the roster.
// The artists themselves come from Artist documents.
export const artistsPage = defineType({
  name: "artistsPage",
  title: "Artists Page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "rosterEyebrow", type: "string" }),
    defineField({ name: "rosterTitle", type: "string" }),
    defineField({ name: "cardHint", type: "string", description: "The small prompt on each artist card." }),
    defineField({ name: "judgeEyebrow", type: "string" }),
    defineField({ name: "judgeTitle", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Artists Page" }) },
});
