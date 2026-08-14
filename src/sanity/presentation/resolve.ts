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
  },
};
