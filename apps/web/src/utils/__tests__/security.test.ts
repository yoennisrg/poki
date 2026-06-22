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

  it("returns empty string for whitespace-only input", () => {
    expect(sanitizeSearchInput("   ")).toBe("");
  });

  it("does not interpret HTML or script tags", () => {
    const xss = "<script>alert(1)</script>";
    expect(sanitizeSearchInput(xss)).toBe(xss);
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

  it("rejects vbscript: URLs", () => {
    expect(isValidHttpUrl("vbscript:msgbox(1)")).toBe(false);
  });

  it("rejects file: URLs", () => {
    expect(isValidHttpUrl("file:///etc/passwd")).toBe(false);
  });

  it("rejects ftp: URLs", () => {
    expect(isValidHttpUrl("ftp://example.com/game")).toBe(false);
  });

  it("rejects empty values", () => {
    expect(isValidHttpUrl("")).toBe(false);
    expect(isValidHttpUrl("   ")).toBe(false);
  });

  it("accepts local absolute URLs", () => {
    expect(isValidHttpUrl("/games/snake/index.html")).toBe(true);
  });

  it("rejects protocol-relative URLs", () => {
    expect(isValidHttpUrl("//evil.com/game")).toBe(false);
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

  it("returns false for empty or non-string values", () => {
    expect(isLocalUrl("")).toBe(false);
    expect(isLocalUrl("   ")).toBe(false);
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

  it("rejects arrays with negative numbers", () => {
    expect(isPositiveIntegerArray([1, -1, 3])).toBe(false);
  });

  it("rejects arrays with Infinity or NaN", () => {
    expect(isPositiveIntegerArray([1, Infinity])).toBe(false);
    expect(isPositiveIntegerArray([1, NaN])).toBe(false);
  });

  it("rejects non-arrays", () => {
    expect(isPositiveIntegerArray("[1,2,3]")).toBe(false);
    expect(isPositiveIntegerArray({})).toBe(false);
  });
});
