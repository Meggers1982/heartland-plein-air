import { defineField, defineType } from "sanity";

// Singleton (_id: "contactInfo") — the festival office details, which were
// hardcoded in FestivalContactInfo.tsx and therefore needed a developer to
// change. They appear on /contact and anywhere else that component is used.
export const contactInfo = defineType({
  name: "contactInfo",
  title: "Contact Details",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Label above the name",
      type: "string",
      initialValue: "Festival Office",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "organization",
      title: "Organization name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "addressLine1",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "addressLine2",
      title: "City, state and ZIP",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone (as displayed)",
      type: "string",
      description: 'Shown exactly as typed, e.g. "(402) 592-6552".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phoneHref",
      title: "Phone (dialable)",
      type: "string",
      description:
        'What tapping the number actually dials — digits only, with country code: "+14025926552".',
      validation: (Rule) =>
        Rule.required().regex(/^\+?[0-9]+$/, {
          name: "digits",
          invert: false,
        }),
    }),
    defineField({
      name: "email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook URL",
      type: "url",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "contactTopics",
      title: "Contact form topics",
      type: "array",
      of: [{ type: "string" }],
      description:
        'The choices in the contact form\'s "Topic" dropdown. These are sent with the enquiry, so keep them meaningful.',
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { subtitle: "organization" },
    prepare: ({ subtitle }) => ({ title: "Contact Details", subtitle }),
  },
});
