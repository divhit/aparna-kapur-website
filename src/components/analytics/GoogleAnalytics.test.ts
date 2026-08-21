import { describe, expect, it } from "vitest";
import { normalizeMeasurementId } from "./GoogleAnalytics";

describe("normalizeMeasurementId", () => {
  // The production value carried a trailing newline, which opened an
  // unterminated string inside the inline gtag config call and killed the
  // whole script on every page.
  it("strips surrounding whitespace and newlines", () => {
    expect(normalizeMeasurementId("G-YC55912QFH\n")).toBe("G-YC55912QFH");
    expect(normalizeMeasurementId("  G-YC55912QFH  ")).toBe("G-YC55912QFH");
    expect(normalizeMeasurementId("G-YC55912QFH\r\n")).toBe("G-YC55912QFH");
  });

  it("accepts the Google tag ID formats", () => {
    for (const id of [
      "G-ABC123",
      "AW-123456",
      "UA-12345-1",
      "GT-ABC123",
      "DC-ABC",
    ]) {
      expect(normalizeMeasurementId(id)).toBe(id);
    }
  });

  it("drops anything that is not a tag ID rather than injecting it", () => {
    expect(normalizeMeasurementId(undefined)).toBeNull();
    expect(normalizeMeasurementId("")).toBeNull();
    expect(normalizeMeasurementId("   ")).toBeNull();
    expect(normalizeMeasurementId("G-ABC'); alert(1); //")).toBeNull();
    expect(normalizeMeasurementId("not-an-id")).toBeNull();
  });
});
