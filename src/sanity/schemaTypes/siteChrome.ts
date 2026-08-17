import { defineField, defineType } from "sanity";

// Singleton (_id: "siteChrome") — the furniture that surrounds every page:
// the countdown labels, the newsletter prompt inside the countdown banner, and
// the footer's blurb and column headings.
//
// It lives in one document rather than being split across the pages it appears
// on, because it appears on all of them: editing "Stay in Touch" in six places
// would be a worse job than editing it here once.
export const siteChrome = defineType({
  name: "siteChrome",
  title: "Site-wide Text",
  type: "document",
  groups: [
    { name: "countdown", title: "Countdown", default: true },
    { name: "footer", title: "Footer" },
    { name: "signup", title: "Email sign-up" },
    { name: "success", title: "Confirmation pages" },
  ],
  fields: [
    defineField({
      name: "countdownLabel",
      title: "Countdown label",
      type: "string",
      group: "countdown",
      description: 'Above the clock on the homepage, e.g. "The brushes come out in".',
    }),
    defineField({
      name: "ribbonLabelDesktop",
      title: "Ribbon label (wide screens)",
      type: "string",
      group: "countdown",
      description: "The strip under the menu on interior pages.",
    }),
    defineField({
      name: "ribbonLabelMobile",
      title: "Ribbon label (phones)",
      type: "string",
      group: "countdown",
      description: "Kept short so it fits a narrow screen.",
    }),
    defineField({
      name: "newsletterTitle",
      title: "Newsletter prompt — heading",
      type: "string",
      group: "countdown",
      description: "Shown beside the countdown on the homepage.",
    }),
    defineField({
      name: "newsletterBody",
      title: "Newsletter prompt — text",
      type: "text",
      rows: 2,
      group: "countdown",
    }),
    defineField({
      name: "footerBlurb",
      title: "Footer description",
      type: "text",
      rows: 5,
      group: "footer",
      description: "The paragraph under the logo, on every page.",
    }),
    defineField({ name: "footerVisitHeading", title: "Column heading — address", type: "string", group: "footer" }),
    defineField({ name: "footerStayHeading", title: "Column heading — sign-up", type: "string", group: "footer" }),
    defineField({ name: "footerSponsorsHeading", title: "Heading above the logos", type: "string", group: "footer" }),
    defineField({
      name: "footerPresentedBy",
      title: "Nonprofit line",
      type: "text",
      rows: 2,
      group: "footer",
      description: "The credit beside the district logo, including the EIN.",
    }),
    defineField({ name: "followAlongLabel", title: 'Label above the social icons', type: "string", group: "footer" }),
    defineField({ name: "signupPlaceholder", title: "Email box placeholder", type: "string", group: "signup" }),
    defineField({ name: "signupFootnote", title: "Small print under the box", type: "string", group: "signup" }),
    defineField({
      name: "signupSuccess",
      title: "Message after signing up",
      type: "string",
      group: "signup",
      description: "Validation warnings stay in code — only this confirmation is editable.",
    }),
    defineField({
      name: "successRecapHeading",
      title: "Heading above the recap",
      type: "string",
      group: "success",
      description: "On the page shown after someone submits a form.",
    }),
    defineField({ name: "successContactEyebrow", title: "Contact block — small line", type: "string", group: "success" }),
    defineField({ name: "successContactHeading", title: "Contact block — heading", type: "string", group: "success" }),
  ],
  preview: { prepare: () => ({ title: "Site-wide Text" }) },
});
