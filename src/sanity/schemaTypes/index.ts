import type { SchemaTypeDefinition } from "sanity";

import { openDivisionQuickFact } from "./openDivisionQuickFact";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [openDivisionQuickFact],
};
