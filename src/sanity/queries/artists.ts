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
    query: `*[_type == "artist" && defined(medium) && count(paintings) > 0] | order(orderRank) {
      ...,
      "slug": slug.current,
      "medium": medium->_id,
      "mediumLabel": medium->label
    }`,
    tags: TAGS,
  });
  return data as Artist[];
}

/** The categories that actually have paintings behind them, in Studio order —
 *  so the filter never offers a button that returns nothing. */
export async function getGalleryMediums() {
  const { data } = await sanityFetch({
    query: `*[_type == "galleryMedium" && count(*[_type == "artist" && medium._ref == ^._id && count(paintings) > 0]) > 0]
      | order(orderRank) { "id": _id, label }`,
    tags: TAGS,
  });
  return data as { id: string; label: string }[];
}

export async function getArtistCount() {
  const { data } = await sanityFetch({
    query: `count(*[_type == "artist"])`,
    tags: TAGS,
  });
  return data as number;
}
