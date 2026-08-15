import { defineField, defineType } from "sanity";

// Singleton (_id: "openDivisionPage").
//
// The registration fee is the important field here. It used to be written out
// in eight separate places — page copy, the success page, three SEO
// descriptions, and two live PayPal `amount` values — so changing it meant
// finding all eight and getting every one right. It is now a single number that
// drives the displayed price AND the amount PayPal charges.
export const openDivisionPage = defineType({
  name: "openDivisionPage",
  title: "Open Division Page",
  type: "document",
  groups: [
    { name: "registration", title: "Registration", default: true },
    { name: "rules", title: "Rules & conduct" },
  ],
  fields: [
    defineField({
      name: "registrationFee",
      title: "Registration fee (USD)",
      type: "number",
      group: "registration",
      description:
        "⚠️ This is what artists are CHARGED, not just what they read. Changing it changes the PayPal amount as well as every mention of the price on the site. Whole dollars.",
      validation: (Rule) => Rule.required().positive().precision(2),
    }),
    defineField({
      name: "capacity",
      title: "Number of spots",
      type: "number",
      group: "registration",
      description: 'Used in "limited to N artists, first come, first served".',
      validation: (Rule) => Rule.required().integer().positive(),
    }),
    defineField({
      name: "paintingRequirements",
      title: "Painting requirements",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      group: "rules",
      description: "Sizes, media, framing — the rules a submitted painting must meet.",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "paintingConduct",
      title: "Where and how to paint",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      group: "rules",
      description:
        "Conduct while painting. You can link to another page by writing [Schedule page](/schedule).",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "salesInfo",
      title: "Selling your work",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      group: "rules",
      description: "Sale rules and the commission split.",
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { fee: "registrationFee", capacity: "capacity" },
    prepare: ({ fee, capacity }) => ({
      title: "Open Division Page",
      subtitle: `$${fee} · ${capacity} spots`,
    }),
  },
});
