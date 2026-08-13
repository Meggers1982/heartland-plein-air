import type { Image, PortableTextBlock } from "sanity";

import { client } from "@/sanity/client";

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

const TAGS = { next: { revalidate: 3600, tags: ["scheduleDay", "homepageHighlight", "festivalLocation"] } };

export async function getScheduleDays() {
  return client.fetch<ScheduleDay[]>(`*[_type == "scheduleDay"] | order(orderRank)`, {}, TAGS);
}

export async function getHomepageHighlights() {
  return client.fetch<HomepageHighlight[]>(
    `*[_type == "homepageHighlight"] | order(orderRank) {
      ...,
      "day": day->{_id, dayShort, dayLong, logo, logoAlt, logoUrl}
    }`,
    {},
    TAGS
  );
}

export async function getFestivalLocations() {
  return client.fetch<FestivalLocation[]>(
    `*[_type == "festivalLocation"] | order(orderRank) {
      ...,
      "events": events[] {
        ...,
        "day": day->{_id, dayShort, dayLong}
      }
    }`,
    {},
    TAGS
  );
}
