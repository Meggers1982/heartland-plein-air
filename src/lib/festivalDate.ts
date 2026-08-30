// One source for the festival dates.
//
// They used to be written out in about a dozen places: the countdown's target
// timestamp, six metadata strings, both countdown components, and the
// structured data's startDate/endDate. Nothing kept them in agreement, so
// rescheduling meant finding every one — and a miss would leave the countdown
// clock disagreeing with the text printed beside it.
//
// Everything below derives from the two dates on the `festivalInfo` document.

/**
 * Central Time's offset during September (America/Chicago is UTC-5 under DST).
 *
 * Deliberately NOT editable: pinning the countdown to the festival's own
 * timezone is what stops it drifting with each visitor's clock, and it is a
 * mechanical detail rather than something an editor should be asked about.
 * Only revisit if the festival moves outside daylight saving.
 */
export const CENTRAL_OFFSET = "-05:00";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec",
];

/** Splits YYYY-MM-DD without going through `new Date()`, which would shift the
 *  calendar day for anyone west of UTC. */
const parts = (iso: string) => {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return { y, m, d };
};

/** Midnight on the opening day, in the festival's timezone — what the countdown counts to. */
export const festivalStartTimestamp = (startDate: string): number =>
  new Date(`${startDate.slice(0, 10)}T00:00:00${CENTRAL_OFFSET}`).getTime();

/**
 * "September 13–19, 2026", or "Sept 13–19, 2026" in short form. Handles a range
 * that crosses a month ("September 30 – October 2, 2026") so a rescheduled
 * festival doesn't render nonsense.
 */
export function formatFestivalRange(
  startDate: string,
  endDate: string,
  style: "long" | "short" = "long",
): string {
  const a = parts(startDate);
  const b = parts(endDate);
  const names = style === "long" ? MONTHS : MONTHS_SHORT;
  const startMonth = names[a.m - 1];
  if (a.m === b.m && a.y === b.y) return `${startMonth} ${a.d}–${b.d}, ${b.y}`;
  return `${startMonth} ${a.d} – ${names[b.m - 1]} ${b.d}, ${b.y}`;
}

/** The line under the countdown: dates and where it happens. */
export const formatFestivalLine = (
  startDate: string,
  endDate: string,
  location: string,
  style: "long" | "short" = "long",
): string => `${formatFestivalRange(startDate, endDate, style)} · ${location}`;
