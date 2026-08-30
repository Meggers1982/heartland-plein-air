import type { Image, PortableTextBlock } from "sanity";

import { sanityFetch } from "@/sanity/lib/live";

export type Audience = "public" | "ticketed" | "artists";

export type PaintoutSpot = {
  _key: string;
  name: string;
  address?: string;
  note?: string;
};

export type ScheduleEvent = {
  _key: string;
  time?: string;
  name: string;
  location?: string;
  address?: string;
  spots?: PaintoutSpot[];
  ctaLabel?: string;
  ctaHref?: string;
  sponsor?: string;
  sponsorLogo?: Image;
  sponsorAlt?: string;
  sponsorUrl?: string;
};

export type ScheduleDay = {
  _id: string;
  dayShort: string;
  dayLong: string;
  title: string;
  narrative: PortableTextBlock[];
  audience: Audience;
  events?: ScheduleEvent[];
  logo?: Image;
  logoAlt?: string;
  logoUrl?: string;
};

export type HomepageHighlight = {
  _id: string;
  day: Pick<ScheduleDay, "_id" | "dayShort" | "dayLong" | "logo" | "logoAlt" | "logoUrl">;
  title: string;
  description: string;
  time: string;
  location: string;
  sponsor?: string;
  sponsorLogo?: Image;
  sponsorAlt?: string;
  sponsorUrl?: string;
  ticketHref?: string;
  ticketLabel?: string;
};

export type LocationEvent = {
  _key: string;
  day: Pick<ScheduleDay, "_id" | "dayShort" | "dayLong">;
  time?: string;
  name: string;
};

export type FestivalLocation = {
  _id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  description: string;
  websiteUrl?: string;
  events?: LocationEvent[];
};

const TAGS = ["scheduleDay", "homepageHighlight", "festivalLocation"];

export async function getScheduleDays() {
  const { data } = await sanityFetch({
    query: `*[_type == "scheduleDay"] | order(orderRank)`,
    tags: TAGS,
  });
  return data as ScheduleDay[];
}

export async function getHomepageHighlights() {
  const { data } = await sanityFetch({
    query: `*[_type == "homepageHighlight"] | order(orderRank) {
      ...,
      "day": day->{_id, dayShort, dayLong, logo, logoAlt, logoUrl}
    }`,
    tags: TAGS,
  });
  return data as HomepageHighlight[];
}

export async function getFestivalLocations() {
  const { data } = await sanityFetch({
    query: `*[_type == "festivalLocation"] | order(orderRank) {
      ...,
      "events": events[] {
        ...,
        "day": day->{_id, dayShort, dayLong}
      }
    }`,
    tags: TAGS,
  });
  return data as FestivalLocation[];
}
