import type { Image } from "sanity";

import { sanityFetch } from "@/sanity/lib/live";

export type PageSeo = {
  route: string;
  title: string;
  description: string;
  shareImage?: Image;
};

/** Returns null when no document exists yet — callers fall back to code values. */
export async function getPageSeo(route: string): Promise<PageSeo | null> {
  const { data } = await sanityFetch({
    query: `*[_type == "pageSeo" && route == $route][0]`,
    params: { route },
    tags: ["pageSeo"],
  });
  return (data as PageSeo) ?? null;
}
