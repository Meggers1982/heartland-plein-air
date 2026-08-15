import { defineField, defineType } from "sanity";

// One document per route, holding the search-result and social-share text that
// used to be hardcoded in each `page.tsx`. Every route repeated its title and
// description three times (page, OpenGraph, Twitter), so a wording change meant
// editing three strings and keeping them in step.
//
// `route` is a fixed list rather than free text: a typo'd route would produce a
// document no page ever reads, which is invisible until someone notices the old
// text still in Google. Adding a genuinely new page means adding it here too.
export const ROUTES = [
  "/",
  "/about",
  "/artists",
  "/gallery",
  "/schedule",
  "/tickets",
  "/open-division",
  "/sponsors",
  "/advertising",
  "/faq",
  "/contact",
  "/privacy",
  "/terms",
] as const;

export const pageSeo = defineType({
  name: "pageSeo",
  title: "Page SEO",
  type: "document",
  fields: [
    defineField({
      name: "route",
      title: "Page",
      type: "string",
      options: { list: ROUTES.map((r) => ({ title: r === "/" ? "/ (homepage)" : r, value: r })) },
      description: "Which page this text belongs to.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description:
        "Shown as the clickable headline in Google and on the browser tab. Around 60 characters is the most that displays.",
      validation: (Rule) => Rule.required().max(70).warning("Over 70 characters will be cut off."),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description:
        "The grey summary under the title in search results, and the preview text when the page is shared. Around 155 characters is the most that displays.",
      validation: (Rule) =>
        Rule.required().max(180).warning("Over 180 characters will be cut off."),
    }),
    defineField({
      name: "shareImage",
      title: "Share image",
      type: "image",
      description:
        "The picture shown when this page is shared on Facebook, LinkedIn or a message. Leave empty to use the festival default. Landscape works best.",
    }),
  ],
  preview: {
    select: { title: "route", subtitle: "title", media: "shareImage" },
  },
});
