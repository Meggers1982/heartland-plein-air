import { orderRankField } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

import { portableTextBlock } from "./shared/portableText";

export const scheduleDay = defineType({
  name: "scheduleDay",
  title: "Schedule Day",
  type: "document",
  fields: [
    defineField({
      name: "dayShort",
      type: "string",
      description: 'Compact form used in nav/timeline, e.g. "Sat · Sep 12".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "dayLong",
      type: "string",
      description: 'Full form used on the day\'s own card, e.g. "Saturday, September 12".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "narrative",
      type: "array",
      of: [portableTextBlock],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "audience",
      type: "string",
      options: { list: ["public", "ticketed", "artists"] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "events",
      type: "array",
      of: [{ type: "scheduleEvent" }],
    }),
    defineField({ name: "logo", type: "image" }),
    defineField({ name: "logoAlt", type: "string" }),
    defineField({ name: "logoUrl", type: "url" }),
    orderRankField({ type: "scheduleDay" }),
  ],
  preview: {
    select: { title: "title", subtitle: "dayShort" },
  },
});
