import { defineField, defineType } from "sanity";

// Locks each form's field keys to the payload keys Formspree/notification
// templates already expect — an editor can relabel or reorder-in-place, but
// can't invent a new key that would silently break a downstream integration.
const ALLOWED_KEYS: Record<string, string[]> = {
  contact: ["name", "email", "topic", "subject", "message"],
  sponsorshipInquiry: ["name", "organization", "email", "phone", "level", "message"],
  advertisingInquiry: ["name", "organization", "email", "phone", "level", "message"],
  openDivisionInquiry: ["name", "street", "city", "state", "zip", "email", "phone", "level", "message"],
  youthPaintout: [
    "firstName",
    "lastName",
    "age",
    "streetAddress",
    "city",
    "state",
    "zip",
    "phone",
    "email",
    "parentName",
    "emergencyContactName",
    "emergencyContactPhone",
    "relationship",
  ],
};

export const formConfig = defineType({
  name: "formConfig",
  title: "Form Config",
  type: "document",
  fields: [
    defineField({
      name: "formKey",
      title: "Form",
      type: "string",
      options: { list: Object.keys(ALLOWED_KEYS) },
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Internal label",
      type: "string",
      description: 'Not shown on the site, e.g. "Contact Form".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "submitLabel", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "successTitle", type: "string" }),
    defineField({ name: "successMessage", type: "text" }),
    defineField({
      name: "fields",
      type: "array",
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: "object",
          name: "formField",
          fields: [
            defineField({
              name: "key",
              title: "Payload key",
              type: "string",
              readOnly: true,
              validation: (Rule) =>
                Rule.required().custom((key, context) => {
                  const formKey = (context.document as { formKey?: string })?.formKey;
                  const allowed = formKey ? ALLOWED_KEYS[formKey] : undefined;
                  if (!allowed) return true;
                  return allowed.includes(key as string)
                    ? true
                    : `"${key}" isn't a valid field for this form. Allowed: ${allowed.join(", ")}`;
                }),
            }),
            defineField({ name: "label", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "placeholder", type: "string" }),
            defineField({
              name: "type",
              type: "string",
              options: { list: ["text", "email", "tel", "textarea", "select"] },
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: "required", type: "boolean", initialValue: true }),
            defineField({
              name: "options",
              type: "array",
              of: [{ type: "string" }],
              description:
                'Only used when type is "select". The Sponsorship Level, Ad Size, and Topic dropdowns are driven by their own content elsewhere and ignore this — it only applies to a genuinely new select field.',
              hidden: ({ parent }) => (parent as { type?: string })?.type !== "select",
            }),
            defineField({ name: "maxLength", title: "Max length", type: "number" }),
          ],
          preview: { select: { title: "label", subtitle: "key" } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "name" },
  },
});
