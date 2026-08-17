import { orderRankField } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export const artist = defineType({
  name: "artist",
  title: "Artist",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "headshot", type: "image" }),
    defineField({ name: "headshotAlt", title: "Headshot alt text", type: "string" }),
    defineField({
      name: "objectPosition",
      type: "string",
      description: 'CSS object-position value for the headshot crop, e.g. "70% center".',
    }),
    defineField({ name: "location", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "bio",
      type: "text",
      description: "Paragraphs separated by a blank line.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "website", type: "url" }),
    defineField({ name: "instagram", type: "url" }),
    defineField({ name: "facebook", type: "url" }),
    defineField({
      name: "isJudge",
      title: "Is Awards Judge",
      type: "boolean",
      initialValue: false,
      description: "Rick J. Delanty judges the awards and also paints the festival.",
    }),
    defineField({
      name: "medium",
      title: "Gallery medium",
      type: "reference",
      to: [{ type: "galleryMedium" }],
      description:
        "Which filter this artist's paintings sit under on the Gallery page. Only set for artists with gallery paintings. Manage the options under Gallery Mediums.",
    }),
    defineField({
      name: "paintings",
      type: "array",
      of: [{ type: "artistPainting" }],
    }),
    orderRankField({ type: "artist" }),
  ],
  preview: {
    select: { title: "name", subtitle: "location", media: "headshot" },
  },
});
