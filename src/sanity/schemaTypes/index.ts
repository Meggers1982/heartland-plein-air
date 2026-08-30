import type { SchemaTypeDefinition } from "sanity";

import { aboutPage } from "./aboutPage";
import { adSize } from "./adSize";
import { advertisingPage } from "./advertisingPage";
import { artist } from "./artist";
import { artistsPage } from "./artistsPage";
import { contactInfo } from "./contactInfo";
import { faqCategory } from "./faqCategory";
import { faqPage } from "./faqPage";
import { festivalInfo } from "./festivalInfo";
import { galleryMedium } from "./galleryMedium";
import { galleryPage } from "./galleryPage";
import { siteChrome } from "./siteChrome";
import { faqItem } from "./faqItem";
import { festivalLocation } from "./festivalLocation";
import { formConfig } from "./formConfig";
import { homepage } from "./homepage";
import { homepageHighlight } from "./homepageHighlight";
import { artistPainting } from "./objects/artistPainting";
import { locationEvent } from "./objects/locationEvent";
import { openDivisionSection } from "./objects/openDivisionSection";
import { paintoutSpot } from "./objects/paintoutSpot";
import { scheduleEvent } from "./objects/scheduleEvent";
import { openDivisionPage } from "./openDivisionPage";
import { pageSeo } from "./pageSeo";
import { openDivisionQuickFact } from "./openDivisionQuickFact";
import { scheduleDay } from "./scheduleDay";
import { schedulePage } from "./schedulePage";
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
import { sponsorsPage } from "./sponsorsPage";
import { ticketsPage } from "./ticketsPage";

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
    // Page-level singletons: copy that used to be hardcoded in
    // src/page-components/*.tsx and therefore needed a developer to change.
    aboutPage,
    contactInfo,
    ticketsPage,
    openDivisionPage,
    advertisingPage,
    sponsorsPage,
    schedulePage,
    artistsPage,
    faqPage,
    festivalInfo,
    galleryPage,
    galleryMedium,
    siteChrome,
    pageSeo,
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
    openDivisionSection,
    paintoutSpot,
    scheduleEvent,
    locationEvent,
    artistPainting,
  ],
};
