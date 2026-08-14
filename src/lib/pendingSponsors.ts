/**
 * TEMPORARY code-side sponsor entries.
 *
 * Every other sponsor on the site comes from a Sanity `sponsor` document and is
 * edited in Studio. These two were added straight to the repo to get them live
 * without a Studio round-trip. They render alongside the Sanity-backed sponsors
 * in their tier grid on /sponsors, but they are invisible to editors — nobody
 * can change or remove them without a code change.
 *
 * Migrate these into Sanity and delete this file. See CHANGES.md → Known
 * follow-ups.
 */
export type PendingSponsor = {
  _id: string;
  name: string;
  /** Must match a `sponsorTier` document's `name` exactly (e.g. "Silver"). */
  tier: string;
  /** Path under /public — not a Sanity asset, so `urlFor()` does not apply. */
  logoSrc: string;
  alt: string;
  url?: string;
};

export const pendingSponsors: PendingSponsor[] = [
  {
    _id: "pending-omaha-lancers",
    name: "Omaha Lancers",
    tier: "Silver",
    logoSrc: "/assets/sponsors/omaha-lancers.webp",
    alt: "omaha lancers logo",
    url: "https://lancers.com/",
  },
  {
    _id: "pending-linhart-construction",
    name: "Linhart Construction",
    tier: "Silver",
    logoSrc: "/assets/sponsors/linhart-construction.webp",
    alt: "linhart construction logo",
    url: "https://www.linhartconstruction.com/",
  },
];

/** Sanity sponsors sort by `orderRank`; these have none, so they land last. */
export const pendingSponsorsForTier = (tierName: string): PendingSponsor[] =>
  pendingSponsors.filter((sponsor) => sponsor.tier === tierName);
