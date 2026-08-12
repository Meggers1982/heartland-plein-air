import { amountsMatch } from "./paypalVerify";

describe("amountsMatch", () => {
  it("matches identical amounts", () => {
    expect(amountsMatch("30.00", "30.00")).toBe(true);
  });

  it("matches amounts differing only in decimal formatting", () => {
    expect(amountsMatch("30", "30.00")).toBe(true);
  });

  it("rejects a mismatched amount", () => {
    expect(amountsMatch("30.00", "20.00")).toBe(false);
  });

  it("rejects a captured amount that rounds down from the expected value", () => {
    expect(amountsMatch("30.00", "29.99")).toBe(false);
  });

  it("rejects non-numeric input instead of throwing", () => {
    expect(amountsMatch("30.00", "not-a-number")).toBe(false);
    expect(amountsMatch("not-a-number", "30.00")).toBe(false);
  });
});
