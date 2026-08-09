import { parseTimeRange, buildEventIcs } from "./ics";

describe("parseTimeRange", () => {
  it("handles a plain range", () => {
    expect(parseTimeRange("10 AM – 2 PM")).toEqual({
      start: { h: 10, m: 0 },
      end: { h: 14, m: 0 },
    });
  });

  it("borrows the meridiem from the end token", () => {
    // "5 – 6:30 PM" is how the Youth Art Show Reception is written.
    expect(parseTimeRange("5 – 6:30 PM")).toEqual({
      start: { h: 17, m: 0 },
      end: { h: 18, m: 30 },
    });
  });

  it("understands Noon as an end time", () => {
    // Regression: "Noon" used to fail to parse, so the Youth Paintout exported
    // as 10–11 AM instead of running to midday.
    expect(parseTimeRange("10 AM – Noon")).toEqual({
      start: { h: 10, m: 0 },
      end: { h: 12, m: 0 },
    });
  });

  it("understands Noon as a start time without borrowing a meridiem", () => {
    expect(parseTimeRange("Noon – 5 PM")).toEqual({
      start: { h: 12, m: 0 },
      end: { h: 17, m: 0 },
    });
  });

  it("falls back to midday for unparseable input", () => {
    expect(parseTimeRange("Lunchtime")).toEqual({
      start: { h: 12, m: 0 },
      end: { h: 13, m: 0 },
    });
  });
});

describe("buildEventIcs", () => {
  it("emits the Youth Paintout as a 10 AM to noon event", () => {
    const ics = buildEventIcs({
      uid: "day-sep-12-youth-paintout",
      date: "20260912",
      time: "10 AM – Noon",
      name: "Youth Paintout",
      location: "Wildewood Park",
      address: "8000 Ralston Ave., Ralston, NE",
    });
    expect(ics).toContain("DTSTART;TZID=America/Chicago:20260912T100000");
    expect(ics).toContain("DTEND;TZID=America/Chicago:20260912T120000");
    expect(ics).toContain("SUMMARY:Youth Paintout");
  });
});
