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
    { name: "page", title: "Page text", default: true },
    { name: "registration", title: "Registration" },
    { name: "rules", title: "Rules & conduct" },
  ],
  fields: [
    // Headings and paragraphs, in the order they appear down the page. Write
    // {fee} or {capacity} anywhere below and the real numbers are filled in, so
    // the price can never be quoted here in a way that contradicts what PayPal
    // charges.
    defineField({ name: "eyebrow", title: "Header eyebrow", type: "string", group: "page" }),
    defineField({ name: "title", title: "Page title", type: "string", group: "page" }),
    defineField({
      name: "intro",
      title: "Introduction",
      type: "text",
      rows: 3,
      group: "page",
    }),
    defineField({ name: "quickFactsEyebrow", type: "string", group: "page" }),
    defineField({ name: "quickFactsTitle", type: "string", group: "page" }),
    defineField({ name: "checkInEyebrow", type: "string", group: "page" }),
    defineField({ name: "checkInTitle", type: "string", group: "page" }),
    defineField({ name: "checkInBody", type: "text", rows: 3, group: "page" }),
    defineField({
      name: "liabilityNote",
      title: "Liability note",
      type: "string",
      group: "page",
      description: "The highlighted line under check-in.",
    }),
    defineField({ name: "requirementsEyebrow", type: "string", group: "page" }),
    defineField({ name: "requirementsTitle", type: "string", group: "page" }),
    defineField({ name: "conductEyebrow", type: "string", group: "page" }),
    defineField({ name: "conductTitle", type: "string", group: "page" }),
    defineField({ name: "salesEyebrow", type: "string", group: "page" }),
    defineField({ name: "salesTitle", type: "string", group: "page" }),
    defineField({ name: "turnInTitle", type: "string", group: "page" }),
    defineField({
      name: "turnInBody",
      type: "text",
      rows: 3,
      group: "page",
      description: "Link out by writing [the Granary](https://atthegranary.com/).",
    }),
    defineField({ name: "registerTitle", type: "string", group: "page" }),
    defineField({ name: "registerBody", type: "text", rows: 2, group: "page" }),
    defineField({ name: "registerPaymentNote", type: "text", rows: 2, group: "page" }),
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
      name: "festivalWeek",
      title: "Festival week sections",
      type: "array",
      of: [{ type: "openDivisionSection" }],
      group: "rules",
      description:
        "Everything else artists need for the week (awards night, Quick Paint, payment timing, who to call). Renders in this order between Sales & Exhibition and the registration form. Drag to reorder.",
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
