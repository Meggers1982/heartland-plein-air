import { parseEventTimes, scheduleDayDate } from "./eventTimes";

const D = "2026-09-19";

describe("parseEventTimes", () => {
  it("reads a range with the meridiem on both ends", () => {
    expect(parseEventTimes(D, "11 AM – 1:30 PM")).toEqual({
      startDate: "2026-09-19T11:00:00-05:00",
      endDate: "2026-09-19T13:30:00-05:00",
    });
  });

  it("carries a single trailing meridiem back to the start", () => {
    expect(parseEventTimes(D, "9 – 11 AM")).toEqual({
      startDate: "2026-09-19T09:00:00-05:00",
      endDate: "2026-09-19T11:00:00-05:00",
    });
    expect(parseEventTimes(D, "5 – 6:30 PM")).toEqual({
      startDate: "2026-09-19T17:00:00-05:00",
      endDate: "2026-09-19T18:30:00-05:00",
    });
  });

  it("does not let an inherited meridiem push the start past its own end", () => {
    // "11 – 1 PM" inheriting PM would start at 23:00 and end at 13:00.
    expect(parseEventTimes(D, "11 – 1 PM")).toEqual({
      startDate: "2026-09-19T11:00:00-05:00",
      endDate: "2026-09-19T13:00:00-05:00",
    });
  });

  it("understands Noon on either side", () => {
    expect(parseEventTimes(D, "Noon – 1 PM")).toEqual({
      startDate: "2026-09-19T12:00:00-05:00",
      endDate: "2026-09-19T13:00:00-05:00",
    });
    expect(parseEventTimes(D, "10 AM – Noon")).toEqual({
      startDate: "2026-09-19T10:00:00-05:00",
      endDate: "2026-09-19T12:00:00-05:00",
    });
  });

  it("gives a lone time no endDate rather than inventing a duration", () => {
    expect(parseEventTimes(D, "3 PM")).toEqual({
      startDate: "2026-09-19T15:00:00-05:00",
    });
  });

  it("accepts hyphen and em dash, not just the en dash editors type", () => {
    const want = {
      startDate: "2026-09-19T09:00:00-05:00",
      endDate: "2026-09-19T11:00:00-05:00",
    };
    expect(parseEventTimes(D, "9 - 11 AM")).toEqual(want);
    expect(parseEventTimes(D, "9 — 11 AM")).toEqual(want);
  });

  it("returns null rather than guessing at something unreadable", () => {
    expect(parseEventTimes(D, "all day")).toBeNull();
    expect(parseEventTimes(D, "")).toBeNull();
    expect(parseEventTimes(D, undefined)).toBeNull();
    expect(parseEventTimes(D, "25 PM")).toBeNull();
    expect(parseEventTimes(D, "9 – 11")).toBeNull(); // no meridiem anywhere
    expect(parseEventTimes(D, "2 PM – 1 PM")).toBeNull(); // ends before it starts
    expect(parseEventTimes("2026-09", "9 – 11 AM")).toBeNull();
  });

  it("handles the noon and midnight edges of 12-hour time", () => {
    expect(parseEventTimes(D, "12 AM – 1 AM")?.startDate).toBe("2026-09-19T00:00:00-05:00");
    expect(parseEventTimes(D, "12 PM – 1 PM")?.startDate).toBe("2026-09-19T12:00:00-05:00");
  });

  it("covers every time string currently in the schedule", () => {
    const live = [
      "10 AM – Noon", "11 AM – 1:30 PM", "11 AM – 4 PM", "5 – 6 PM",
      "5 – 6:30 PM", "5:30 – 8 PM", "6 – 8 PM", "7:30 – 8:45 AM",
      "9 AM – Noon", "9 – 11 AM", "Noon – 1 PM",
    ];
    for (const t of live) {
      const r = parseEventTimes(D, t);
      expect(r, `failed to parse ${t}`).not.toBeNull();
      expect(r!.endDate, `no endDate for ${t}`).toBeTruthy();
    }
  });
});

describe("scheduleDayDate", () => {
  it("reads the date out of a day id", () => {
    expect(scheduleDayDate("day-sep-14")).toBe("2026-09-14");
    expect(scheduleDayDate("day-sep-9")).toBe("2026-09-09");
  });

  it("rejects ids that are not dates, instead of emitting 2026-online", () => {
    expect(scheduleDayDate("day-online")).toBeNull();
    expect(scheduleDayDate("day-sep-99")).toBeNull();
    expect(scheduleDayDate("something-else")).toBeNull();
  });
});
