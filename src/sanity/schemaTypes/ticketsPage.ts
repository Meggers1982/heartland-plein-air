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
  fields: [
    defineField({
      name: "ticketOptions",
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
    defineField({
      name: "youthPaintoutGoodToKnow",
      title: "Youth Paintout — good to know",
      type: "array",
      of: [{ type: "text", rows: 2 }],
      description:
        "Logistics for parents, shown beside the registration form. Ages, arrival time, supervision, limits.",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "youthPaintoutDayOf",
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
