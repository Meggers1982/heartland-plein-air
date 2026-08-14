import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import type { StructureResolver } from "sanity/structure";

const ORDERABLE_TYPES = [
  "openDivisionQuickFact",
  "sponsorTier",
  "sponsor",
  "scheduleDay",
  "homepageHighlight",
  "festivalLocation",
  "adSize",
  "faqCategory",
  "faqItem",
  "artist",
];

// Types hidden from the generic document list: orderable ones (already have
// their own drag-reorderable list item below) and "homepage", which is a
// singleton pinned to a fixed document rather than a creatable collection.
const HIDDEN_TYPES = [...ORDERABLE_TYPES, "homepage"];

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .id("homepage")
        .title("Homepage")
        .child(S.document().schemaType("homepage").documentId("homepage")),
      S.divider(),
      ...ORDERABLE_TYPES.map((type) =>
        orderableDocumentListDeskItem({ type, S, context })
      ),
      ...S.documentTypeListItems().filter(
        (item) => !HIDDEN_TYPES.includes(item.getId() ?? "")
      ),
    ]);
