import {
  PHASE_ATTRIBUTE,
  festivalDayNumber,
  festivalEndTimestamp,
  festivalLengthDays,
  festivalPhase,
  festivalPhaseScript,
  festivalStartTimestamp,
  scheduleDayAnchor,
} from "@/lib/festivalDate";

const START = "2026-09-13";
const END = "2026-09-19";
const startsAt = festivalStartTimestamp(START);
const endsAt = festivalEndTimestamp(END);

/** Runs the inline <head> script against a stub document at a given instant. */
function runPhaseScript(now: number): string | null {
  const attrs: Record<string, string> = {};
  const doc = { documentElement: { setAttribute: (k: string, v: string) => (attrs[k] = v) } };
  new Function("document", "Date", festivalPhaseScript(startsAt, endsAt))(doc, { now: () => now });
  return attrs[PHASE_ATTRIBUTE] ?? null;
}

describe("festival boundaries", () => {
  it("starts at midnight Central on the first day", () => {
    expect(startsAt).toBe(Date.parse("2026-09-13T05:00:00Z"));
  });

  it("ends at midnight Central after the last day, not at the start of it", () => {
    expect(endsAt).toBe(Date.parse("2026-09-20T05:00:00Z"));
  });

  it("rolls the end over a month boundary", () => {
    expect(festivalEndTimestamp("2026-09-30")).toBe(Date.parse("2026-10-01T05:00:00Z"));
  });

  it("counts the festival's days inclusively", () => {
    expect(festivalLengthDays(START, END)).toBe(7);
    expect(festivalLengthDays("2026-09-30", "2026-10-02")).toBe(3);
  });
});

describe("festivalPhase", () => {
  const cases: Array<[string, number, string]> = [
    ["a second before opening", startsAt - 1000, "before"],
    ["opening midnight", startsAt, "live"],
    ["a second before closing midnight", endsAt - 1000, "live"],
    ["closing midnight", endsAt, "after"],
  ];

  it.each(cases)("is correct %s", (_label, now, expected) => {
    expect(festivalPhase(now, startsAt, endsAt)).toBe(expected);
  });

  it.each(cases)("the inline <head> script agrees %s", (_label, now, expected) => {
    expect(runPhaseScript(now)).toBe(expected);
  });

  it("emits no script for unusable dates, leaving the default (before) layout", () => {
    expect(festivalPhaseScript(NaN, endsAt)).toBe("");
    expect(festivalPhaseScript(startsAt, Infinity)).toBe("");
  });
});

describe("festivalDayNumber", () => {
  it("is 1 on opening day and 7 on the last", () => {
    expect(festivalDayNumber(startsAt, startsAt)).toBe(1);
    expect(festivalDayNumber(startsAt + 2 * 86_400_000 + 5, startsAt)).toBe(3);
    expect(festivalDayNumber(endsAt - 1, startsAt)).toBe(7);
  });

  it("rolls over at midnight Central, not the visitor's midnight", () => {
    // 11:59pm Central on the 13th is already the 14th in UTC — still day 1.
    expect(festivalDayNumber(Date.parse("2026-09-14T04:59:00Z"), startsAt)).toBe(1);
    expect(festivalDayNumber(Date.parse("2026-09-14T05:00:00Z"), startsAt)).toBe(2);
  });
});

describe("scheduleDayAnchor", () => {
  it("matches the scheduleDay _id convention", () => {
    expect(scheduleDayAnchor(START, 1)).toBe("day-sep-13");
    expect(scheduleDayAnchor(START, 7)).toBe("day-sep-19");
  });

  it("crosses into the next month", () => {
    expect(scheduleDayAnchor("2026-09-30", 2)).toBe("day-oct-1");
  });
});
