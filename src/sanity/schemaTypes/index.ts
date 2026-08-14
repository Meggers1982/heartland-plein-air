import type { SchemaTypeDefinition } from "sanity";

import { adSize } from "./adSize";
import { artist } from "./artist";
import { faqCategory } from "./faqCategory";
import { faqItem } from "./faqItem";
import { festivalLocation } from "./festivalLocation";
import { formConfig } from "./formConfig";
import { homepage } from "./homepage";
import { homepageHighlight } from "./homepageHighlight";
import { artistPainting } from "./objects/artistPainting";
import { locationEvent } from "./objects/locationEvent";
import { paintoutSpot } from "./objects/paintoutSpot";
import { scheduleEvent } from "./objects/scheduleEvent";
import { openDivisionQuickFact } from "./openDivisionQuickFact";
import { scheduleDay } from "./scheduleDay";
import { aboutSection } from "./sections/aboutSection";
import { artistSpotlightSection } from "./sections/artistSpotlightSection";
import { faqTeaserSection } from "./sections/faqTeaserSection";
import { festivalHighlightsSection } from "./sections/festivalHighlightsSection";
import { heroSection } from "./sections/heroSection";
import { newsletterCtaSection } from "./sections/newsletterCtaSection";
import { paintingLocationsSection } from "./sections/paintingLocationsSection";
import { scheduleTeaserSection } from "./sections/scheduleTeaserSection";
import { sponsorsSection } from "./sections/sponsorsSection";
import { vipPassTeaserSection } from "./sections/vipPassTeaserSection";
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
    formConfig,
    homepage,
    heroSection,
    aboutSection,
    festivalHighlightsSection,
    scheduleTeaserSection,
    vipPassTeaserSection,
    paintingLocationsSection,
    artistSpotlightSection,
    sponsorsSection,
    faqTeaserSection,
    newsletterCtaSection,
    paintoutSpot,
    scheduleEvent,
    locationEvent,
    artistPainting,
  ],
};
