import { sanityFetch } from "@/sanity/lib/live";

export type AdSize = {
  _id: string;
  name: string;
  price: string;
  icon: string;
  dimensions: string;
};

export async function getAdSizes() {
  const { data } = await sanityFetch({
    query: `*[_type == "adSize"] | order(orderRank)`,
    tags: ["adSize"],
  });
  return data as AdSize[];
}
