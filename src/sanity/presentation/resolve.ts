import { defineLocations, type PresentationPluginOptions } from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    openDivisionQuickFact: defineLocations({
      select: { title: "title" },
      resolve: (doc) => ({
        locations: [{ title: doc?.title || "Untitled", href: "/open-division" }],
      }),
    }),
    sponsorTier: defineLocations({
      select: { title: "name" },
      resolve: (doc) => ({
        locations: [{ title: doc?.title || "Untitled", href: "/sponsors" }],
      }),
    }),
    sponsor: defineLocations({
      select: { title: "name" },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || "Untitled", href: "/sponsors" },
          { title: "Homepage", href: "/" },
        ],
      }),
    }),
    adSize: defineLocations({
      select: { title: "name" },
      resolve: (doc) => ({
        locations: [{ title: doc?.title || "Untitled", href: "/advertising" }],
      }),
    }),
    scheduleDay: defineLocations({
      select: { title: "title" },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || "Untitled", href: "/schedule" },
          { title: "Homepage", href: "/" },
        ],
      }),
    }),
    homepageHighlight: defineLocations({
      select: { title: "title" },
      resolve: (doc) => ({
        locations: [{ title: doc?.title || "Untitled", href: "/" }],
      }),
    }),
    festivalLocation: defineLocations({
      select: { title: "name" },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || "Untitled", href: "/schedule" },
          { title: "Homepage", href: "/" },
        ],
      }),
    }),
    faqCategory: defineLocations({
      select: { title: "title" },
      resolve: (doc) => ({
        locations: [{ title: doc?.title || "Untitled", href: "/faq" }],
      }),
    }),
    faqItem: defineLocations({
      select: { title: "question" },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || "Untitled", href: "/faq" },
          { title: "Homepage", href: "/" },
        ],
      }),
    }),
    artist: defineLocations({
      select: { title: "name" },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || "Untitled", href: "/artists" },
          { title: "Gallery", href: "/gallery" },
          { title: "Homepage", href: "/" },
        ],
      }),
    }),
    homepage: defineLocations({
      select: { title: "_id" },
      resolve: () => ({
        locations: [{ title: "Homepage", href: "/" }],
      }),
    }),
    // Each form config drives exactly one form. Unlike the other types this
    // can't be resolved from a slug — the link between a document and its page
    // is `formKey`, matched against the route that calls getFormConfig() with
    // it. Keep this table in step with those call sites.
    //
    // The success page is listed too: successTitle/successMessage only ever
    // render there, so editing that copy with just the form page in view would
    // show a preview where nothing changes.
    formConfig: defineLocations({
      select: { title: "name", formKey: "formKey" },
      resolve: (doc) => {
        const routes: Record<string, { form: string; success: string }> = {
          contact: { form: "/contact", success: "/contact/success" },
          sponsorshipInquiry: { form: "/sponsors", success: "/sponsors/success" },
          advertisingInquiry: { form: "/advertising", success: "/advertising/success" },
          openDivisionInquiry: { form: "/open-division", success: "/open-division/success" },
          // The Youth Paintout form is a section of /tickets, not its own route.
          youthPaintout: { form: "/tickets", success: "/tickets/youth-paintout/success" },
        };
        const route = routes[doc?.formKey as string];
        if (!route) return { locations: [] };
        const title = doc?.title || "Untitled";
        return {
          locations: [
            { title, href: route.form },
            { title: `${title} — success page`, href: route.success },
          ],
        };
      },
    }),
  },
};
