// Turns a schedule event's human time string into the ISO datetimes that
// Event structured data wants.
//
// Google Search Console reported "Missing field endDate" on all 13 per-event
// Event nodes: they carried a bare `startDate` of "2026-09-14" and nothing
// else, so search had no idea the Lunch Break Paintout runs midday or when the
// auction is over. The times were sitting in Sanity the whole time as display
// strings ("11 AM – 1:30 PM"), never parsed.
//
// Editors keep writing those strings the way they read on the page. This is the
// one place that understands them, so the schema stays correct without asking
// anyone to maintain a second machine-readable copy that would drift.

import { CENTRAL_OFFSET } from "@/lib/festivalDate";

type Clock = { h: number; m: number; meridiem?: "am" | "pm" };

/** "11 AM" · "1:30 PM" · "5:30" · "9" · "Noon" · "Midnight" */
function parseClock(raw: string): Clock | null {
  const s = raw.trim().toLowerCase().replace(/\./g, "");
  if (!s) return null;
  if (s === "noon") return { h: 12, m: 0, meridiem: "pm" };
  if (s === "midnight") return { h: 0, m: 0, meridiem: "am" };

  const m = s.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/);
  if (!m) return null;

  let h = Number(m[1]);
  const min = m[2] ? Number(m[2]) : 0;
  const meridiem = m[3] as "am" | "pm" | undefined;
  if (h < 1 || h > 12 || min > 59) return null;

  if (meridiem === "pm" && h !== 12) h += 12;
  if (meridiem === "am" && h === 12) h = 0;
  return { h, m: min, meridiem };
}

const minutes = (c: Clock) => c.h * 60 + c.m;

/** Shifts a meridiem-less clock by 12h. "5" reading as 05:00 becomes 17:00. */
const toAfternoon = (c: Clock): Clock => (c.h < 12 ? { ...c, h: c.h + 12 } : c);
const toMorning = (c: Clock): Clock => (c.h >= 12 ? { ...c, h: c.h - 12 } : c);

const iso = (date: string, c: Clock) =>
  `${date}T${String(c.h).padStart(2, "0")}:${String(c.m).padStart(2, "0")}:00${CENTRAL_OFFSET}`;

/**
 * `date` is YYYY-MM-DD; `time` is whatever an editor typed.
 *
 * Returns null rather than a guess when the string can't be read — a wrong
 * datetime in structured data is worse than an absent one, since search would
 * publish it as fact. Callers fall back to the bare date.
 */
export function parseEventTimes(
  date: string,
  time: string | undefined,
): { startDate: string; endDate?: string } | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !time) return null;

  // Editors use en dashes; accept the other two rather than silently failing.
  const parts = time.split(/\s*[–—-]\s*/).filter(Boolean);
  if (parts.length === 0 || parts.length > 2) return null;

  let start = parseClock(parts[0]);
  if (!start) return null;

  // A lone time ("3 PM") is a start with no known duration. Inventing an end
  // would assert a length nobody stated, so it simply has no endDate.
  if (parts.length === 1) {
    if (!start.meridiem) return null;
    return { startDate: iso(date, start) };
  }

  const end = parseClock(parts[1]);
  if (!end || !end.meridiem) return null;

  // "9 – 11 AM" and "5 – 6:30 PM" only mark the meridiem once, on the end.
  if (!start.meridiem) {
    start = end.meridiem === "pm" ? toAfternoon(start) : toMorning(start);
    // "11 – 1 PM" would make the start 11 PM, after its own end. The other
    // reading is the only sane one.
    if (minutes(start) >= minutes(end)) {
      start = end.meridiem === "pm" ? toMorning(start) : toAfternoon(start);
    }
  }

  if (minutes(start) >= minutes(end)) return null;
  return { startDate: iso(date, start), endDate: iso(date, end) };
}

/**
 * The calendar date a `scheduleDay` describes, from its `_id` ("day-sep-14").
 *
 * The `date` field on the document is unset on every day, so the id is the only
 * source. Validated rather than trusted: "day-online" would otherwise yield
 * "2026-online" and put a malformed startDate into the structured data.
 */
export function scheduleDayDate(id: string): string | null {
  const m = id.match(/^day-sep-(\d{1,2})$/);
  if (!m) return null;
  const d = Number(m[1]);
  if (d < 1 || d > 30) return null;
  return `2026-09-${String(d).padStart(2, "0")}`;
}
