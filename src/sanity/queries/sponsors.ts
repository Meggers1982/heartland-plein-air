import type { Image } from "sanity";

import { client } from "@/sanity/client";

export type Sponsor = {
  _id: string;
  name: string;
  logo?: Image;
  alt?: string;
  url?: string;
  hideFromPartnersGrid?: boolean;
};

export type SponsorTier = {
  _id: string;
  name: string;
  price: string;
  min: number;
  icon: string;
  benefits: string[];
  nameOnly: boolean;
};

export type SponsorTierWithSponsors = SponsorTier & { sponsors: Sponsor[] };

const REVALIDATE = { next: { revalidate: 3600, tags: ["sponsor", "sponsorTier"] } };

export async function getFunders() {
  return client.fetch<Sponsor[]>(
    `*[_type == "sponsor" && !defined(tier)] | order(orderRank)`,
    {},
    REVALIDATE
  );
}

export async function getSponsorTiers() {
  return client.fetch<SponsorTier[]>(
    `*[_type == "sponsorTier"] | order(orderRank)`,
    {},
    REVALIDATE
  );
}

export async function getSponsorTiersWithSponsors() {
  return client.fetch<SponsorTierWithSponsors[]>(
    `*[_type == "sponsorTier"] | order(orderRank) {
      ...,
      "sponsors": *[_type == "sponsor" && references(^._id)] | order(orderRank)
    }`,
    {},
    REVALIDATE
  );
}
