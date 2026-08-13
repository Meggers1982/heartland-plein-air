import { client } from "@/sanity/client";

export type OpenDivisionQuickFact = {
  _id: string;
  title: string;
  description: string;
  icon: string;
};

export async function getQuickFacts() {
  return client.fetch<OpenDivisionQuickFact[]>(
    `*[_type == "openDivisionQuickFact"] | order(orderRank)`,
    {},
    { next: { revalidate: 3600, tags: ["openDivisionQuickFact"] } }
  );
}
