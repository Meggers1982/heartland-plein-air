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
};

export type OpenDivisionPage = {
  registrationFee: number;
  capacity: number;
  paintingRequirements: string[];
  paintingConduct: string[];
  salesInfo: string[];
};

export type FileSpec = { _key: string; icon: string; text: string };
export type AdvertisingPage = { fileSpecs: FileSpec[] };

export type NamedOpportunity = { _key: string; title: string; description: string };
export type SponsorsPage = { namedOpportunities: NamedOpportunity[] };

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
