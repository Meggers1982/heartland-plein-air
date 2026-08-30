// End of day, July 17, 2026, Central Time (America/Chicago is UTC-5 in July under DST) —
// fixed to the venue's timezone so the cutoff doesn't shift with a visitor's local clock.
export const AD_DEADLINE = new Date("2026-07-18T00:00:00-05:00").getTime();

// The last day ads are accepted, i.e. the day before the cutoff above.
// The date used to be typed out again in the nav banner and once more in the
// closed-state copy on /advertising, so moving the deadline meant finding three
// places and a miss would have the banner and the page contradicting each other.
export const AD_DEADLINE_LABEL = "July 17, 2026";
