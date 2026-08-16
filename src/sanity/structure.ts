import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import type { StructureResolver } from "sanity/structure";

// Grouped by what an editor is actually trying to do, most-touched first, with
// a divider between groups. The previous order was the order the migration
// script happened to seed in, which put Open Division Quick Facts at the top
// and Artists near the bottom.
//
// `title` matters here: without it the plugin labels each item
// "Orderable <type>" (e.g. "Orderable faqItem") — the raw schema name, which
// reads like a bug to the volunteer editors who use this Studio. These are the
// schema titles pluralised, since each item is a list.
const ORDERABLE_GROUPS: { type: string; title: string }[][] = [
  // The festival itself — the bulk of in-season editing.
  [
    { type: "homepageHighlight", title: "Homepage Highlights" },
    { type: "artist", title: "Artists" },
    { type: "scheduleDay", title: "Schedule Days" },
    { type: "festivalLocation", title: "Festival Locations" },
  ],
  // Money in: who is supporting the festival and how.
  [
    { type: "sponsor", title: "Sponsors" },
    { type: "sponsorTier", title: "Sponsor Tiers" },
    { type: "adSize", title: "Ad Sizes" },
  ],
  // Taking part.
  [{ type: "openDivisionQuickFact", title: "Open Division Quick Facts" }],
  // Answering visitors.
  [
    { type: "faqCategory", title: "FAQ Categories" },
    { type: "faqItem", title: "FAQ Items" },
  ],
];

const ORDERABLE_TYPES = ORDERABLE_GROUPS.flat();

// Page-level singletons: one document each, pinned to a fixed _id rather than
// listed as a creatable collection. These hold copy that used to be hardcoded
// in the page components.
const PAGE_SINGLETONS: { id: string; title: string }[] = [
  { id: "aboutPage", title: "About Page" },
  { id: "ticketsPage", title: "Tickets Page" },
  { id: "openDivisionPage", title: "Open Division Page" },
  { id: "schedulePage", title: "Schedule Page" },
  { id: "artistsPage", title: "Artists Page" },
  { id: "galleryPage", title: "Gallery Page" },
  { id: "faqPage", title: "FAQ Page" },
  { id: "sponsorsPage", title: "Sponsors Page" },
  { id: "advertisingPage", title: "Advertising Page" },
  { id: "contactInfo", title: "Contact Details" },
  { id: "festivalInfo", title: "Festival Dates" },
  { id: "siteChrome", title: "Site-wide Text" },
];

// Types hidden from the generic document list: orderable ones (already have
// their own drag-reorderable list item above), the page singletons, and
// "homepage" — all pinned to fixed documents rather than creatable collections.
const HIDDEN_TYPES = [
  ...ORDERABLE_TYPES.map(({ type }) => type),
  ...PAGE_SINGLETONS.map(({ id }) => id),
  "homepage",
];

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      // Page copy, in roughly the order the pages appear in the site nav.
      S.listItem()
        .id("homepage")
        .title("Homepage")
        .child(S.document().schemaType("homepage").documentId("homepage")),
      ...PAGE_SINGLETONS.map(({ id, title }) =>
        S.listItem()
          .id(id)
          .title(title)
          .child(S.document().schemaType(id).documentId(id))
      ),
      S.divider(),
      ...ORDERABLE_GROUPS.flatMap((group, i) => [
        // Separator before every group except the first — the divider under
        // Homepage already opens that one.
        ...(i > 0 ? [S.divider()] : []),
        ...group.map(({ type, title }) =>
          orderableDocumentListDeskItem({ type, title, S, context })
        ),
      ]),
      S.divider(),
      // Anything not given an explicit home above (currently just Form Config)
      // lands last, so a newly added schema type still shows up rather than
      // silently disappearing.
      ...S.documentTypeListItems().filter(
        (item) => !HIDDEN_TYPES.includes(item.getId() ?? "")
      ),
    ]);
