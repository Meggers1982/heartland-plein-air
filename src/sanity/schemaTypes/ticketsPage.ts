import { defineArrayMember, defineField, defineType } from "sanity";

// Singleton (_id: "ticketsPage").
//
// NOTE ON PRICES: tickets are sold through Passage (gopassage.com), not through
// this site — there is no PayPal button on /tickets. So the prices here are
// display text only. Editing one changes what visitors *read*, not what they
// are charged; the real price lives in Passage and the two must be kept in step
// by hand. That was already true when these lived in code.
export const ticketsPage = defineType({
  name: "ticketsPage",
  title: "Tickets Page",
  type: "document",
  groups: [
    { name: "page", title: "Page text", default: true },
    { name: "youth", title: "Youth Paintout" },
  ],
  fields: [
    defineField({
      name: "eyebrow",
      title: "Header eyebrow",
      type: "string",
      group: "page",
    }),
    defineField({ name: "title", title: "Page title", type: "string", group: "page" }),
    defineField({
      name: "intro",
      title: "Introduction",
      type: "text",
      rows: 3,
      group: "page",
      description: "The paragraph under the page title.",
    }),
    defineField({
      name: "sections",
      title: "Ticket sections",
      type: "array",
      group: "page",
      description:
        "One per block down the page. The layout of each is fixed — this is the wording inside it.",
      of: [
        defineArrayMember({
          type: "object",
          name: "ticketSection",
          fields: [
            defineField({
              name: "id",
              title: "Section ID",
              type: "string",
              description:
                "Matches the jump link above and the anchor in the page. Changing it breaks both — leave it alone.",
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: "eyebrow", type: "string" }),
            defineField({ name: "heading", type: "string" }),
            defineField({
              name: "price",
              type: "string",
              description: 'Display text — "$125", "Free". Passage is what actually charges.',
            }),
            defineField({
              name: "description",
              type: "text",
              rows: 4,
              description:
                "Link to another site by writing [The Granary](https://atthegranary.com/).",
            }),
            defineField({
              name: "ctaLabel",
              title: "Button label",
              type: "string",
            }),
            defineField({
              name: "ctaHref",
              title: "Button link",
              type: "url",
              description: "Usually the Passage listing for this ticket.",
            }),
          ],
          preview: { select: { title: "heading", subtitle: "price" } },
        }),
      ],
    }),
    defineField({
      name: "ticketOptions",
      group: "page",
      title: "Ticket options",
      description:
        "The jump links under the page header, in the order the sections appear below them.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "ticketOption",
          fields: [
            defineField({
              name: "id",
              title: "Section ID",
              type: "string",
              description:
                "Links the jump button to its section further down the page. Changing this breaks the link — leave it alone unless a developer has changed the section too.",
              validation: (Rule) =>
                Rule.required().regex(/^[a-z0-9-]+$/, { name: "lowercase-hyphens" }),
            }),
            defineField({ name: "name", type: "string", validation: (Rule) => Rule.required() }),
            defineField({
              name: "price",
              type: "string",
              description: 'Display text — "$125", "Free". Not what Passage charges.',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "name", subtitle: "price" } },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "passBenefits",
      group: "page",
      title: "Collector VIP Pass — what's included",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "passBenefit",
          fields: [
            defineField({
              name: "day",
              type: "string",
              description: 'e.g. "Thursday, September 17".',
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
            defineField({
              name: "description",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "title", subtitle: "day" } },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({ name: "youthGoodToKnowHeading", type: "string", group: "youth" }),
    defineField({ name: "youthRegisterHeading", type: "string", group: "youth" }),
    defineField({
      name: "youthReceptionCredit",
      title: "Sponsor credit under the reception",
      type: "string",
      group: "page",
    }),
    defineField({
      name: "youthPaintoutGoodToKnow",
      group: "youth",
      title: "Youth Paintout — good to know",
      type: "array",
      of: [{ type: "text", rows: 2 }],
      description:
        "Logistics for parents, shown beside the registration form. Ages, arrival time, supervision, limits.",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "youthPaintoutDayOf",
      group: "youth",
      title: "Youth Paintout — what to expect on the day",
      description:
        "Shown on the confirmation page after a family registers, not on the Tickets page itself.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "dayOfInstruction",
          fields: [
            defineField({ name: "name", type: "string", validation: (Rule) => Rule.required() }),
            defineField({
              name: "icon",
              type: "string",
              description:
                "Icon name. Available: Shirt, ClipboardCheck, MapPin, Users, Eye, Heart. An unrecognised name simply renders no icon.",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "detail",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "featured",
              type: "boolean",
              initialValue: false,
              description:
                "Pulls this one out of the grid to span the full row with an accent treatment. Intended for a single card — turning it on for several loses the emphasis.",
            }),
          ],
          preview: { select: { title: "name", subtitle: "icon" } },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Tickets Page" }),
  },
});
