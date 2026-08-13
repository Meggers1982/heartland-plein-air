import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import type { StructureResolver } from "sanity/structure";

const ORDERABLE_TYPES = ["openDivisionQuickFact"];

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      ...ORDERABLE_TYPES.map((type) =>
        orderableDocumentListDeskItem({ type, S, context })
      ),
      ...S.documentTypeListItems().filter(
        (item) => !ORDERABLE_TYPES.includes(item.getId() ?? "")
      ),
    ]);
