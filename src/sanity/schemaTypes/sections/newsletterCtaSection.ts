import { defineField, defineType } from "sanity";

// The sign-up form itself is code; everything a visitor reads around it is here.
export const newsletterCtaSection = defineType({
  name: "newsletterCtaSection",
  title: "Newsletter Sign-up",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      type: "string",
      description: "The small label above the heading.",
      initialValue: "Join the Festival",
    }),
    defineField({ name: "title", type: "string", initialValue: "Be the First to Know" }),
    defineField({
      name: "perks",
      title: "What subscribers get",
      type: "array",
      of: [{ type: "string" }],
      description: "The short list beside the form. Three reads best.",
    }),
    defineField({
      name: "footnote",
      title: "Reassurance line",
      type: "string",
      description: "The small print under the form.",
      initialValue: "No spam. Unsubscribe anytime. Festival updates only.",
    }),
  ],
  preview: {
    select: { subtitle: "title" },
    prepare: ({ subtitle }) => ({ title: "Newsletter Sign-up", subtitle }),
  },
});
