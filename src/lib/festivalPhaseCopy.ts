import type { SiteChrome } from "@/sanity/queries/pages";

type PhaseCopyKey =
  | "liveLabel"
  | "liveHeading"
  | "liveCtaTitle"
  | "liveCtaBody"
  | "liveCtaButton"
  | "afterLabel"
  | "afterHeading"
  | "afterNewsletterTitle"
  | "afterNewsletterBody";

/**
 * What the countdown banner and ribbon say during and after the festival when
 * the matching "Site-wide Text" field in Studio is empty.
 *
 * These are an exception to "content comes from Sanity": the fields were added
 * days before opening, and a blank banner on opening day is worse than
 * placeholder copy. Editors override any line in Studio → Site-wide Text →
 * "During the festival" / "After the festival".
 */
const FALLBACK: Record<PhaseCopyKey, string> = {
  liveLabel: "Happening now",
  liveHeading: "The artists are out painting",
  liveCtaTitle: "Find them today",
  liveCtaBody: "Today's painting locations and evening events are on the schedule.",
  liveCtaButton: "See today's schedule",
  afterLabel: "Thank you",
  afterHeading: "Thanks for a great festival week",
  afterNewsletterTitle: "See you next year",
  afterNewsletterBody: "Sign up and we'll tell you first when next year's dates are set.",
};

export const phaseCopy = (chrome: SiteChrome | null): Record<PhaseCopyKey, string> =>
  Object.fromEntries(
    (Object.keys(FALLBACK) as PhaseCopyKey[]).map((k) => [k, chrome?.[k]?.trim() || FALLBACK[k]]),
  ) as Record<PhaseCopyKey, string>;
