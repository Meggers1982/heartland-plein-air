import type { SchemaTypeDefinition } from "sanity";

import { openDivisionQuickFact } from "./openDivisionQuickFact";
import { sponsor } from "./sponsor";
import { sponsorTier } from "./sponsorTier";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [openDivisionQuickFact, sponsorTier, sponsor],
};
