import type { Image } from "sanity";

import { sanityFetch } from "@/sanity/lib/live";

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

const TAGS = ["sponsor", "sponsorTier"];

export async function getFunders() {
  const { data } = await sanityFetch({
    query: `*[_type == "sponsor" && !defined(tier)] | order(orderRank)`,
    tags: TAGS,
  });
  return data as Sponsor[];
}

export async function getSponsorTiers() {
  const { data } = await sanityFetch({
    query: `*[_type == "sponsorTier"] | order(orderRank)`,
    tags: TAGS,
  });
  return data as SponsorTier[];
}

export async function getSponsorTiersWithSponsors() {
  const { data } = await sanityFetch({
    query: `*[_type == "sponsorTier"] | order(orderRank) {
      ...,
      "sponsors": *[_type == "sponsor" && references(^._id)] | order(orderRank)
    }`,
    tags: TAGS,
  });
  return data as SponsorTierWithSponsors[];
}
