import { describe, expect, it } from "vitest";
import { isLocalUrl, isPositiveIntegerArray, isValidHttpUrl, sanitizeSearchInput } from "../security";

describe("sanitizeSearchInput", () => {
  it("trims whitespace", () => {
    expect(sanitizeSearchInput("  carreras  ")).toBe("carreras");
  });

  it("limits length to 120 characters", () => {
    const long = "a".repeat(200);
    expect(sanitizeSearchInput(long)).toHaveLength(120);
  });
});

describe("isValidHttpUrl", () => {
  it("accepts https URLs", () => {
    expect(isValidHttpUrl("https://example.com/game")).toBe(true);
  });

  it("accepts http URLs", () => {
    expect(isValidHttpUrl("http://example.com/game")).toBe(true);
  });

  it("rejects javascript: URLs", () => {
    expect(isValidHttpUrl("javascript:alert(1)")).toBe(false);
  });

  it("rejects data: URLs", () => {
    expect(isValidHttpUrl("data:text/html,<script>alert(1)</script>")).toBe(false);
  });

  it("rejects empty values", () => {
    expect(isValidHttpUrl("")).toBe(false);
    expect(isValidHttpUrl("   ")).toBe(false);
  });

  it("accepts local absolute URLs", () => {
    expect(isValidHttpUrl("/games/snake/index.html")).toBe(true);
  });
});

describe("isLocalUrl", () => {
  it("returns true for relative paths", () => {
    expect(isLocalUrl("/games/snake/index.html")).toBe(true);
  });

  it("returns false for protocol-relative URLs", () => {
    expect(isLocalUrl("//evil.com")).toBe(false);
  });

  it("returns false for absolute external URLs", () => {
    expect(isLocalUrl("https://example.com")).toBe(false);
  });
});

describe("isPositiveIntegerArray", () => {
  it("accepts arrays of positive integers", () => {
    expect(isPositiveIntegerArray([1, 2, 3])).toBe(true);
  });

  it("rejects arrays with non-integers", () => {
    expect(isPositiveIntegerArray([1, 2.5, 3])).toBe(false);
  });

  it("rejects arrays with non-positive numbers", () => {
    expect(isPositiveIntegerArray([1, 0, 3])).toBe(false);
  });

  it("rejects non-arrays", () => {
    expect(isPositiveIntegerArray("[1,2,3]")).toBe(false);
    expect(isPositiveIntegerArray({})).toBe(false);
  });
});
