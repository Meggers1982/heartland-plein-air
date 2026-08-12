// Midnight, September 13, 2026, Central Time (America/Chicago is UTC-5 in
// September under DST) — fixed to the festival's timezone so the countdown
// doesn't depend on a visitor's local clock (same fix as AD_DEADLINE in
// adDeadline.ts).
export const FESTIVAL_START = new Date("2026-09-13T00:00:00-05:00").getTime();
