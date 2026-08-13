import type { SchemaTypeDefinition } from "sanity";

import { adSize } from "./adSize";
import { artist } from "./artist";
import { faqCategory } from "./faqCategory";
import { faqItem } from "./faqItem";
import { festivalLocation } from "./festivalLocation";
import { homepageHighlight } from "./homepageHighlight";
import { artistPainting } from "./objects/artistPainting";
import { locationEvent } from "./objects/locationEvent";
import { paintoutSpot } from "./objects/paintoutSpot";
import { scheduleEvent } from "./objects/scheduleEvent";
import { openDivisionQuickFact } from "./openDivisionQuickFact";
import { scheduleDay } from "./scheduleDay";
import { sponsor } from "./sponsor";
import { sponsorTier } from "./sponsorTier";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    adSize,
    openDivisionQuickFact,
    sponsorTier,
    sponsor,
    scheduleDay,
    homepageHighlight,
    festivalLocation,
    faqCategory,
    faqItem,
    artist,
    paintoutSpot,
    scheduleEvent,
    locationEvent,
    artistPainting,
  ],
};
