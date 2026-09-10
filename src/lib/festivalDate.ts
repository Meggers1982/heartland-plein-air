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

/** YYYY-MM-DD `days` after `iso`. Date.UTC rolls Sept 31 over to Oct 1, so
 *  no month-length table is needed, and UTC keeps the visitor's zone out of it. */
const addDays = (iso: string, days: number): string => {
  const { y, m, d } = parts(iso);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
};

/** Midnight at the END of the last day, festival time — the moment it's over. */
export const festivalEndTimestamp = (endDate: string): number =>
  festivalStartTimestamp(addDays(endDate, 1));

const DAY_MS = 86_400_000;

// ---------------------------------------------------------------------------
// Festival phase
//
// The countdown banner and ribbon show different content before, during and
// after the festival. Which one is visible is decided by CSS keyed off a
// `data-festival-phase` attribute on <html>, set by a tiny inline script in
// the root layout's <head> BEFORE the page paints (see festivalPhaseScript).
//
// Why not React state: every page is statically prerendered and only
// regenerated hourly or on a Sanity publish, so the HTML can be up to an hour
// older than the clock. Rendering the phase in React would either bake a stale
// phase into that HTML or flash the wrong one until hydration. The attribute
// approach renders all variants and lets the browser pick before first paint.
// ---------------------------------------------------------------------------

export type FestivalPhase = "before" | "live" | "after";

/** The <html> attribute the `phase-live:` / `phase-after:` Tailwind variants read. */
export const PHASE_ATTRIBUTE = "data-festival-phase";

export function festivalPhase(now: number, startsAt: number, endsAt: number): FestivalPhase {
  if (now < startsAt) return "before";
  if (now < endsAt) return "live";
  return "after";
}

/** 1 on opening day. Rolls over at midnight Central, not the visitor's midnight. */
export const festivalDayNumber = (now: number, startsAt: number): number =>
  Math.floor((now - startsAt) / DAY_MS) + 1;

/** Number of festival days, inclusive — 7 for Sept 13–19. */
export const festivalLengthDays = (startDate: string, endDate: string): number =>
  Math.round((festivalEndTimestamp(endDate) - festivalStartTimestamp(startDate)) / DAY_MS);

const MONTHS_ID = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/**
 * The /schedule anchor for a festival day, e.g. "day-sep-15". Mirrors the
 * `scheduleDay._id` convention Schedule.tsx already depends on. A day with no
 * schedule document just lands at the top of /schedule, which is harmless.
 */
export function scheduleDayAnchor(startDate: string, dayNumber: number): string {
  const { m, d } = parts(addDays(startDate, dayNumber - 1));
  return `day-${MONTHS_ID[m - 1]}-${d}`;
}

/**
 * The inline script that stamps the phase on <html> before first paint. Must
 * stay self-contained (it runs before any bundle loads) and must agree with
 * festivalPhase() above — the unit tests check both at every boundary.
 *
 * Returns "" for unusable timestamps, which leaves the attribute unset: the
 * CSS then falls back to the "before" layout, i.e. what the site showed
 * before any of this existed.
 */
export function festivalPhaseScript(startsAt: number, endsAt: number): string {
  if (!Number.isFinite(startsAt) || !Number.isFinite(endsAt)) return "";
  return `(function(){var n=Date.now();document.documentElement.setAttribute("${PHASE_ATTRIBUTE}",n<${startsAt}?"before":n<${endsAt}?"live":"after")})();`;
}

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
