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

// Types hidden from the generic document list: orderable ones (already have
// their own drag-reorderable list item above) and "homepage", which is a
// singleton pinned to a fixed document rather than a creatable collection.
const HIDDEN_TYPES = [...ORDERABLE_TYPES.map(({ type }) => type), "homepage"];

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .id("homepage")
        .title("Homepage")
        .child(S.document().schemaType("homepage").documentId("homepage")),
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
