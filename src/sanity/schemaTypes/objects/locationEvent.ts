import { defineField, defineType } from "sanity";

export const locationEvent = defineType({
  name: "locationEvent",
  title: "Location Event",
  type: "object",
  fields: [
    defineField({
      name: "day",
      type: "reference",
      to: [{ type: "scheduleDay" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "time", type: "string" }),
    defineField({ name: "name", type: "string", validation: (Rule) => Rule.required() }),
  ],
  preview: {
    select: { title: "name", subtitle: "time" },
  },
});
