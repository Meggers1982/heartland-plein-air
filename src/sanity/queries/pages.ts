import type { PortableTextBlock } from "sanity";

import { sanityFetch } from "@/sanity/lib/live";

// Queries for the page-level singletons — copy that used to live in
// src/page-components/*.tsx. Each fetches one fixed document by _id.

export type AboutPageSection = {
  _key: string;
  eyebrow: string;
  heading: string;
  body: PortableTextBlock[];
};

export type AboutPage = {
  eyebrow: string;
  title: string;
  intro: PortableTextBlock[];
  sections: AboutPageSection[];
};

export type ContactInfo = {
  eyebrow: string;
  organization: string;
  addressLine1: string;
  addressLine2: string;
  phone: string;
  phoneHref: string;
  email: string;
  facebookUrl?: string;
  instagramUrl?: string;
  contactTopics: string[];
  pageEyebrow?: string;
  pageTitle?: string;
};

export type TicketOption = { _key: string; id: string; name: string; price: string };
export type PassBenefit = { _key: string; day: string; title: string; description: string };
export type DayOfInstruction = {
  _key: string;
  name: string;
  icon: string;
  detail: string;
  featured?: boolean;
};

export type TicketSection = {
  _key: string;
  id: string;
  eyebrow?: string;
  heading?: string;
  price?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export type TicketsPage = {
  eyebrow?: string;
  title?: string;
  intro?: string;
  sections?: TicketSection[];
  ticketOptions: TicketOption[];
  passBenefits: PassBenefit[];
  youthPaintoutGoodToKnow: string[];
  youthPaintoutDayOf: DayOfInstruction[];
  youthGoodToKnowHeading?: string;
  youthRegisterHeading?: string;
  youthReceptionCredit?: string;
};

export type OpenDivisionPage = {
  eyebrow?: string;
  title?: string;
  intro?: string;
  quickFactsEyebrow?: string;
  quickFactsTitle?: string;
  checkInEyebrow?: string;
  checkInTitle?: string;
  checkInBody?: string;
  liabilityNote?: string;
  requirementsEyebrow?: string;
  requirementsTitle?: string;
  conductEyebrow?: string;
  conductTitle?: string;
  salesEyebrow?: string;
  salesTitle?: string;
  turnInTitle?: string;
  turnInBody?: string;
  registerTitle?: string;
  registerBody?: string;
  registerPaymentNote?: string;
  registrationFee: number;
  capacity: number;
  paintingRequirements: string[];
  paintingConduct: string[];
  salesInfo: string[];
  festivalWeek?: OpenDivisionSection[];
};

export type OpenDivisionSection = {
  _key: string;
  eyebrow?: string;
  title: string;
  icon: string;
  body: string[];
};

export type FileSpec = { _key: string; icon: string; text: string };
export type AdvertisingPage = {
  fileSpecs: FileSpec[];
  eyebrow?: string; title?: string; intro?: string;
  catalogEyebrow?: string; catalogTitle?: string;
  specsEyebrow?: string; specsTitle?: string; specsIntro?: string;
  reserveEyebrow?: string; reserveTitle?: string; reserveIntro?: string;
  deadlineTitle?: string; deadlineBody?: string;
  submitTitle?: string; submitBody?: string;
  paymentTitle?: string; paymentBody?: string;
  closedNote?: string; ctaTitle?: string; ctaBody?: string;
};

export type NamedOpportunity = { _key: string; title: string; description: string };
export type SponsorsPage = {
  namedOpportunities: NamedOpportunity[];
  eyebrow?: string; title?: string;
  becomeEyebrow?: string; becomeTitle?: string; becomeIntro?: string; becomeLinkLabel?: string;
  ctaTitle?: string; ctaBody?: string; payTitle?: string;
  givingEyebrow?: string; givingTitle?: string; givingIntro?: string;
  thankYouEyebrow?: string; thankYouTitle?: string; thankYouBody?: string;
  partnersTitle?: string;
  successPayTitle?: string;
  paymentHint?: string;
  payOnlineLabel?: string;
};

export type SchedulePage = {
  title?: string; browseLabel?: string;
  locationsEyebrow?: string; locationsTitle?: string; locationsIntro?: string;
  mapHelperText?: string; noEventsText?: string;
};

export type ArtistsPage = {
  eyebrow?: string; title?: string;
  rosterEyebrow?: string; rosterTitle?: string; cardHint?: string;
  judgeEyebrow?: string; judgeTitle?: string;
  judgeBadge?: string; viewBioLabel?: string;
};

export type FaqPage = {
  eyebrow?: string; title?: string; intro?: string;
  browseLabel?: string; noResultsText?: string;
};

export type FestivalInfo = {
  startDate: string;
  endDate: string;
  location: string;
};

export type GalleryPage = {
  eyebrow?: string;
  title?: string;
  intro?: string[];
  allFilterLabel?: string;
};

export type SiteChrome = {
  countdownLabel?: string;
  ribbonLabelDesktop?: string;
  ribbonLabelMobile?: string;
  newsletterTitle?: string;
  newsletterBody?: string;
  footerBlurb?: string;
  footerVisitHeading?: string;
  footerStayHeading?: string;
  footerSponsorsHeading?: string;
  footerPresentedBy?: string;
  followAlongLabel?: string;
  signupPlaceholder?: string;
  signupFootnote?: string;
  signupSuccess?: string;
  successRecapHeading?: string;
  successContactEyebrow?: string;
  successContactHeading?: string;
};

async function fetchSingleton<T>(id: string): Promise<T> {
  const { data } = await sanityFetch({
    query: `*[_id == $id][0]`,
    params: { id },
    tags: [id],
  });
  return data as T;
}

export const getAboutPage = () => fetchSingleton<AboutPage>("aboutPage");
export const getContactInfo = () => fetchSingleton<ContactInfo>("contactInfo");
export const getTicketsPage = () => fetchSingleton<TicketsPage>("ticketsPage");
export const getOpenDivisionPage = () => fetchSingleton<OpenDivisionPage>("openDivisionPage");
export const getAdvertisingPage = () => fetchSingleton<AdvertisingPage>("advertisingPage");
export const getSponsorsPage = () => fetchSingleton<SponsorsPage>("sponsorsPage");
export const getSchedulePage = () => fetchSingleton<SchedulePage>("schedulePage");
export const getArtistsPage = () => fetchSingleton<ArtistsPage>("artistsPage");
export const getFaqPage = () => fetchSingleton<FaqPage>("faqPage");
export const getFestivalInfo = () => fetchSingleton<FestivalInfo>("festivalInfo");
export const getGalleryPage = () => fetchSingleton<GalleryPage>("galleryPage");
export const getSiteChrome = () => fetchSingleton<SiteChrome>("siteChrome");
