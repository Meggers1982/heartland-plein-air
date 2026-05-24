// Tiny ICS generator for festival events.
// Times are emitted as floating local times (America/Chicago) using TZID.

const pad = (n: number) => String(n).padStart(2, "0");

const escapeText = (s: string) =>
  s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");

// Parse a single clock token like "10 AM", "2 PM", "5:30 PM"
const parseClock = (token: string): { h: number; m: number } | null => {
  const m = token.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i);
  if (!m) return null;
  let h = parseInt(m[1], 10);
  const mins = m[2] ? parseInt(m[2], 10) : 0;
  const mer = m[3].toUpperCase();
  if (mer === "PM" && h !== 12) h += 12;
  if (mer === "AM" && h === 12) h = 0;
  return { h, m: mins };
};

// Parse a time range like "10 AM – 2 PM", "5 – 7 PM", "4 – 5:30 PM", or "Lunchtime".
// Returns start/end as {h,m}. If only one meridiem is present, applies it to both.
export const parseTimeRange = (
  time: string | undefined,
): { start: { h: number; m: number }; end: { h: number; m: number } } => {
  if (!time) return { start: { h: 12, m: 0 }, end: { h: 13, m: 0 } };
  const t = time.trim();
  if (/lunch/i.test(t)) return { start: { h: 12, m: 0 }, end: { h: 13, m: 0 } };

  const parts = t.split(/\s*[–-]\s*/);
  if (parts.length !== 2) {
    const single = parseClock(t);
    if (single) return { start: single, end: { h: single.h + 1, m: single.m } };
    return { start: { h: 12, m: 0 }, end: { h: 13, m: 0 } };
  }
  let [a, b] = parts;
  // If first piece is missing AM/PM, borrow from the second.
  if (!/AM|PM/i.test(a)) {
    const mer = b.match(/AM|PM/i);
    if (mer) a = `${a} ${mer[0]}`;
  }
  const start = parseClock(a) ?? { h: 12, m: 0 };
  const end = parseClock(b) ?? { h: start.h + 1, m: start.m };
  return { start, end };
};

const fmtLocal = (date: string, hm: { h: number; m: number }) =>
  // date = YYYYMMDD, output YYYYMMDDTHHMMSS (floating w/ TZID)
  `${date}T${pad(hm.h)}${pad(hm.m)}00`;

const VTIMEZONE_CHICAGO = [
  "BEGIN:VTIMEZONE",
  "TZID:America/Chicago",
  "BEGIN:STANDARD",
  "DTSTART:19701101T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU",
  "TZOFFSETFROM:-0500",
  "TZOFFSETTO:-0600",
  "TZNAME:CST",
  "END:STANDARD",
  "BEGIN:DAYLIGHT",
  "DTSTART:19700308T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU",
  "TZOFFSETFROM:-0600",
  "TZOFFSETTO:-0500",
  "TZNAME:CDT",
  "END:DAYLIGHT",
  "END:VTIMEZONE",
].join("\r\n");

export type IcsEventInput = {
  uid: string;
  date: string; // YYYYMMDD
  time?: string;
  name: string;
  location?: string;
  address?: string;
  description?: string;
};

export const buildEventIcs = (ev: IcsEventInput): string => {
  const { start, end } = parseTimeRange(ev.time);
  const dtstart = fmtLocal(ev.date, start);
  const dtend = fmtLocal(ev.date, end);
  const now = new Date();
  const dtstamp =
    `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}` +
    `T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`;
  const loc = [ev.location, ev.address].filter(Boolean).join(", ");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Heartland Plein Air//Schedule//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    VTIMEZONE_CHICAGO,
    "BEGIN:VEVENT",
    `UID:${ev.uid}@heartlandpleinair`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;TZID=America/Chicago:${dtstart}`,
    `DTEND;TZID=America/Chicago:${dtend}`,
    `SUMMARY:${escapeText(ev.name)}`,
    loc ? `LOCATION:${escapeText(loc)}` : "",
    ev.description ? `DESCRIPTION:${escapeText(ev.description)}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);

  return lines.join("\r\n");
};

export const downloadIcs = (filename: string, content: string) => {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".ics") ? filename : `${filename}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 500);
};