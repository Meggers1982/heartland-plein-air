import { orderRankField } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export const homepageHighlight = defineType({
  name: "homepageHighlight",
  title: "Homepage Highlight",
  type: "document",
  fields: [
    defineField({
      name: "day",
      type: "reference",
      to: [{ type: "scheduleDay" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "time", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "location", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "sponsor",
      title: "Sponsor name",
      type: "string",
    }),
    defineField({ name: "sponsorLogo", title: "Sponsor logo", type: "image" }),
    defineField({ name: "sponsorAlt", title: "Sponsor logo alt text", type: "string" }),
    defineField({ name: "sponsorUrl", title: "Sponsor URL", type: "url" }),
    defineField({
      name: "ticketHref",
      title: "Ticket link",
      type: "string",
      description: 'Internal link to the matching section on /tickets, e.g. "/tickets#youth-paintout".',
    }),
    defineField({ name: "ticketLabel", type: "string" }),
    orderRankField({ type: "homepageHighlight" }),
  ],
  preview: {
    select: { title: "title", subtitle: "time" },
  },
});
