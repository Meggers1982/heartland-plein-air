import stamps from "./legalUpdated.json";

/**
 * "Last updated" dates for the legal pages, derived from git by
 * scripts/stamp-legal-updated.mjs (wired to `prebuild`). Editing
 * Privacy.tsx or Terms.tsx moves that page's date on the next deploy.
 */
export type LegalPageKey = keyof typeof stamps;

export const legalUpdatedIso = (page: LegalPageKey): string => stamps[page];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Formats an ISO timestamp as e.g. "August 14, 2026".
 *
 * Reads the calendar date straight off the string rather than going through
 * `new Date()`. The stamps carry the committer's offset (…T21:40:39-04:00), so
 * converting to UTC would roll a late-evening commit to the following day and
 * show a date the change didn't happen on.
 */
export const formatLegalDate = (iso: string): string => {
  const [year, month, day] = iso.slice(0, 10).split("-").map(Number);
  return `${MONTHS[month - 1]} ${day}, ${year}`;
};
