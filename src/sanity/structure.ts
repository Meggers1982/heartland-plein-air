import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import type { StructureResolver } from "sanity/structure";

// `title` is required here in practice: without it the plugin labels each item
// "Orderable <type>" (e.g. "Orderable faqItem"), which is the raw schema name
// and reads like a bug to the volunteer editors who use this Studio. These are
// the schema titles pluralised, since each item is a list.
const ORDERABLE_TYPES: { type: string; title: string }[] = [
  { type: "openDivisionQuickFact", title: "Open Division Quick Facts" },
  { type: "sponsorTier", title: "Sponsor Tiers" },
  { type: "sponsor", title: "Sponsors" },
  { type: "scheduleDay", title: "Schedule Days" },
  { type: "homepageHighlight", title: "Homepage Highlights" },
  { type: "festivalLocation", title: "Festival Locations" },
  { type: "adSize", title: "Ad Sizes" },
  { type: "faqCategory", title: "FAQ Categories" },
  { type: "faqItem", title: "FAQ Items" },
  { type: "artist", title: "Artists" },
];

// Types hidden from the generic document list: orderable ones (already have
// their own drag-reorderable list item below) and "homepage", which is a
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
      ...ORDERABLE_TYPES.map(({ type, title }) =>
        orderableDocumentListDeskItem({ type, title, S, context })
      ),
      ...S.documentTypeListItems().filter(
        (item) => !HIDDEN_TYPES.includes(item.getId() ?? "")
      ),
    ]);
