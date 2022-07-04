import { describe, expect, it } from "vitest";
import { getCell } from "../board-helper";

describe("getCell", () => {
  it("should return the correct case id for A1", () => {
    expect(getCell(1, 1)).toBe("A1");
  });
  it("should return the correct case id for A2", () => {
    expect(getCell(2, 1)).toBe("A2");
  });
  it("should return the correct case id for B1", () => {
    expect(getCell(1, 2)).toBe("B1");
  });
  // Incorrect test
  it("should return the correct case id for F10", () => {
    expect(getCell(10, 10)).toBe("F10");
  });
});
