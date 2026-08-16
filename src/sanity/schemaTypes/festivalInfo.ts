import { defineField, defineType } from "sanity";

// Singleton (_id: "festivalInfo") — the festival's dates and where it happens.
//
// These two dates are the single source for the countdown clock, every mention
// of the dates in page titles and search results, the line under the countdown,
// and the structured data Google reads. Changing them here changes all of it.
export const festivalInfo = defineType({
  name: "festivalInfo",
  title: "Festival Dates",
  type: "document",
  fields: [
    defineField({
      name: "startDate",
      title: "First day",
      type: "date",
      description:
        "⚠️ Drives the countdown as well as every printed mention of the dates. The clock counts to midnight on this day, festival time.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "Last day",
      type: "date",
      validation: (Rule) =>
        Rule.required().min(Rule.valueOfField("startDate")).error(
          "The last day cannot be before the first day.",
        ),
    }),
    defineField({
      name: "location",
      title: "Where it happens",
      type: "string",
      description: 'Shown after the dates, e.g. "Douglas & Sarpy County, Nebraska".',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { start: "startDate", end: "endDate", subtitle: "location" },
    prepare: ({ start, end, subtitle }) => ({
      title: `${start ?? "?"} – ${end ?? "?"}`,
      subtitle,
    }),
  },
});
