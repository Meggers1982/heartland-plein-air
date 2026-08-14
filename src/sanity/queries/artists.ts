import type { Image } from "sanity";

import { sanityFetch } from "@/sanity/lib/live";

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

const TAGS = ["artist"];

export async function getArtists() {
  const { data } = await sanityFetch({
    query: `*[_type == "artist"] | order(orderRank) { ..., "slug": slug.current }`,
    tags: TAGS,
  });
  return data as Artist[];
}

export async function getGalleryArtists() {
  const { data } = await sanityFetch({
    query: `*[_type == "artist" && defined(medium) && count(paintings) > 0] | order(orderRank) { ..., "slug": slug.current }`,
    tags: TAGS,
  });
  return data as Artist[];
}

export async function getArtistCount() {
  const { data } = await sanityFetch({
    query: `count(*[_type == "artist"])`,
    tags: TAGS,
  });
  return data as number;
}
