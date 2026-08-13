import type { Image } from "sanity";

import { client } from "@/sanity/client";

export type ArtistPainting = {
  _key: string;
  image: Image;
  title: string;
  alt: string;
};

export type Artist = {
  _id: string;
  name: string;
  slug: string;
  headshot?: Image;
  headshotAlt?: string;
  objectPosition?: string;
  location: string;
  bio: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  isJudge: boolean;
  medium?: "oil-and-pastel" | "watercolor";
  paintings?: ArtistPainting[];
};

const TAGS = { next: { revalidate: 3600, tags: ["artist"] } };

export async function getArtists() {
  return client.fetch<Artist[]>(
    `*[_type == "artist"] | order(orderRank) { ..., "slug": slug.current }`,
    {},
    TAGS
  );
}

export async function getGalleryArtists() {
  return client.fetch<Artist[]>(
    `*[_type == "artist" && defined(medium) && count(paintings) > 0] | order(orderRank) { ..., "slug": slug.current }`,
    {},
    TAGS
  );
}

export async function getArtistCount() {
  return client.fetch<number>(`count(*[_type == "artist"])`, {}, TAGS);
}
