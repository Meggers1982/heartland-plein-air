import { orderRankField } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export const sponsor = defineType({
  name: "sponsor",
  title: "Sponsor",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "logo", type: "image" }),
    defineField({
      name: "alt",
      type: "string",
      description: "Alt text for the logo. Required if a logo is set.",
      validation: (Rule) =>
        Rule.custom((alt, context) => {
          const hasLogo = Boolean((context.document as { logo?: unknown })?.logo);
          if (hasLogo && !alt) return "Required when a logo is set";
          return true;
        }),
    }),
    defineField({ name: "url", type: "url" }),
    defineField({
      name: "tier",
      type: "reference",
      to: [{ type: "sponsorTier" }],
      description:
        "Leave empty for funders/media partners that aren't a paid sponsorship tier.",
    }),
    defineField({
      name: "hideFromPartnersGrid",
      title: 'Hide from "Presented with Support From" grid',
      type: "boolean",
      initialValue: false,
      description:
        "Still shown in the site footer and homepage sponsor strip. Only meaningful for untiered sponsors.",
    }),
    orderRankField({ type: "sponsor" }),
  ],
  preview: {
    select: { title: "name", media: "logo", tierName: "tier.name" },
    prepare({ title, media, tierName }) {
      return { title, subtitle: tierName || "Funder / partner", media };
    },
  },
});
