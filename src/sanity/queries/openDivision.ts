import { sanityFetch } from "@/sanity/lib/live";

export type OpenDivisionQuickFact = {
  _id: string;
  title: string;
  description: string;
  icon: string;
};

export async function getQuickFacts() {
  const { data } = await sanityFetch({
    query: `*[_type == "openDivisionQuickFact"] | order(orderRank)`,
    tags: ["openDivisionQuickFact"],
  });
  return data as OpenDivisionQuickFact[];
}
