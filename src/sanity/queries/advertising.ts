import { client } from "@/sanity/client";

export type AdSize = {
  _id: string;
  name: string;
  price: string;
  icon: string;
  dimensions: string;
};

export async function getAdSizes() {
  return client.fetch<AdSize[]>(
    `*[_type == "adSize"] | order(orderRank)`,
    {},
    { next: { revalidate: 3600, tags: ["adSize"] } }
  );
}
