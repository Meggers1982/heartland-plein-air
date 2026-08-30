import { defineField, defineType } from "sanity";

export const scheduleEvent = defineType({
  name: "scheduleEvent",
  title: "Schedule Event",
  type: "object",
  fields: [
    defineField({ name: "time", type: "string" }),
    defineField({ name: "name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "address", type: "string" }),
    defineField({
      name: "spots",
      title: "Painting spots",
      type: "array",
      of: [{ type: "paintoutSpot" }],
      description:
        "Individual painting spots within this event's district, distinct from the event's own location.",
    }),
    defineField({
      name: "ctaLabel",
      title: "Button label",
      type: "string",
      description:
        'Optional button under this event, e.g. "Register here". Needs a link below to show up.',
    }),
    defineField({
      name: "ctaHref",
      title: "Button link",
      type: "string",
      description:
        'Where the button goes — a path on this site like "/tickets/youth-paintout", or a full https:// address.',
    }),
    defineField({
      name: "sponsor",
      title: "Sponsor name",
      type: "string",
      description: "Per-event sponsor credit, e.g. for the Youth Art Show Reception.",
    }),
    defineField({ name: "sponsorLogo", title: "Sponsor logo", type: "image" }),
    defineField({ name: "sponsorAlt", title: "Sponsor logo alt text", type: "string" }),
    defineField({ name: "sponsorUrl", title: "Sponsor URL", type: "url" }),
  ],
  preview: {
    select: { title: "name", subtitle: "time" },
  },
});
