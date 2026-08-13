import type { SchemaTypeDefinition } from "sanity";

import { festivalLocation } from "./festivalLocation";
import { homepageHighlight } from "./homepageHighlight";
import { locationEvent } from "./objects/locationEvent";
import { paintoutSpot } from "./objects/paintoutSpot";
import { scheduleEvent } from "./objects/scheduleEvent";
import { openDivisionQuickFact } from "./openDivisionQuickFact";
import { scheduleDay } from "./scheduleDay";
import { sponsor } from "./sponsor";
import { sponsorTier } from "./sponsorTier";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    openDivisionQuickFact,
    sponsorTier,
    sponsor,
    scheduleDay,
    homepageHighlight,
    festivalLocation,
    paintoutSpot,
    scheduleEvent,
    locationEvent,
  ],
};
