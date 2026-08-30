import { defineField, defineType } from "sanity";

// A free-form section on the Open Division page, rendered between "Sales &
// Exhibition" and the registration form.
//
// This exists as a repeatable array rather than another run of named
// eyebrow/title/body fields because the festival week keeps growing new things
// artists need told (Quick Paint, the reception, payment timing). Each of those
// previously required a schema change plus a deploy; now they're an entry here.
export const openDivisionSection = defineType({
  name: "openDivisionSection",
  title: "Festival Week Section",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Small label above the heading",
      type: "string",
      description: 'e.g. "Awards Night".',
    }),
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      type: "string",
      options: {
        list: [
          "Palette",
          "Users",
          "Award",
          "Stamp",
          "Eye",
          "LayoutGrid",
          "DollarSign",
          "FileText",
          "MapPin",
          "Percent",
          "Layers",
          "ClipboardCheck",
        ],
      },
      description: "Shown beside each bullet in this section.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Bullets",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      description:
        'One bullet per point. Write {fee} or {capacity} for the live numbers, and link out with [the Granary](https://atthegranary.com/) or [Tickets page](/tickets).',
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "eyebrow" },
  },
});
