import { defineField, defineType } from "sanity";

// Marker-only: NewsletterCTA.tsx's copy is currently hardcoded in the
// component itself, not content-managed. This type just marks its position
// in the homepage's section order.
export const newsletterCtaSection = defineType({
  name: "newsletterCtaSection",
  title: "Newsletter CTA",
  type: "object",
  fields: [
    defineField({
      name: "internalNote",
      type: "string",
      description: "Not shown on the site. Copy is hardcoded in NewsletterCTA.tsx.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Newsletter CTA" }),
  },
});
