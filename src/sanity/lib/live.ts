import { defineLive } from "next-sanity/live";

import { client } from "@/sanity/client";
import { token } from "@/sanity/lib/token";

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
  // defineLive defaults to revalidate: false in production, relying solely on
  // the /api/revalidate webhook + the Live Content API's push events. Keep
  // the same 1h ISR fallback the rest of this migration was built around, so
  // a missed or delayed webhook delivery still self-heals within the hour.
  fetchOptions: { revalidate: 3600 },
});
