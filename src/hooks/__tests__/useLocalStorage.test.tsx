import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useLocalStorage } from "../useLocalStorage";
import { isPositiveIntegerArray } from "../../utils/security";

const TEST_KEY = "poki-test";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("uses initial value when localStorage is empty", () => {
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, [1, 2]));
    expect(result.current[0]).toEqual([1, 2]);
  });

  it("reads existing valid localStorage value", () => {
    localStorage.setItem(TEST_KEY, JSON.stringify([3, 4]));
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, [1, 2], Array.isArray));
    expect(result.current[0]).toEqual([3, 4]);
  });

  it("falls back to initial value when stored value fails validation", () => {
    localStorage.setItem(TEST_KEY, JSON.stringify(["malicious"]));
    const { result } = renderHook(() =>
      useLocalStorage<number[]>(TEST_KEY, [1, 2], (value): value is number[] =>
        Array.isArray(value) && value.every((item) => typeof item === "number")
      )
    );
    expect(result.current[0]).toEqual([1, 2]);
  });

  it("falls back to initial value on parse error", () => {
    localStorage.setItem(TEST_KEY, "not-json");
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, [1, 2]));
    expect(result.current[0]).toEqual([1, 2]);
  });

  it("updates value and persists to localStorage", () => {
    const { result } = renderHook(() => useLocalStorage<number[]>(TEST_KEY, []));
    act(() => {
      result.current[1]([5, 6]);
    });
    expect(result.current[0]).toEqual([5, 6]);
    expect(JSON.parse(localStorage.getItem(TEST_KEY) ?? "")).toEqual([5, 6]);
  });

  it("supports functional updates", () => {
    const { result } = renderHook(() => useLocalStorage<number[]>(TEST_KEY, [1]));
    act(() => {
      result.current[1]((prev) => [...prev, 2]);
    });
    expect(result.current[0]).toEqual([1, 2]);
  });

  it("uses the positive-integer validator for recents and favorites", () => {
    localStorage.setItem(TEST_KEY, JSON.stringify([1, 2, 3]));
    const { result } = renderHook(() => useLocalStorage<number[]>(TEST_KEY, [], isPositiveIntegerArray));
    expect(result.current[0]).toEqual([1, 2, 3]);
  });

  it("rejects tampered recents that are not positive integers", () => {
    localStorage.setItem(TEST_KEY, JSON.stringify([1, "<script>alert(1)</script>", 3]));
    const { result } = renderHook(() => useLocalStorage<number[]>(TEST_KEY, [], isPositiveIntegerArray));
    expect(result.current[0]).toEqual([]);
  });

  it("gracefully handles storage quota errors", () => {
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("Quota exceeded", "QuotaExceededError");
    });
    const { result } = renderHook(() => useLocalStorage<number[]>(TEST_KEY, [1]));
    act(() => {
      result.current[1]([2]);
    });
    expect(result.current[0]).toEqual([1]);
    expect(() => localStorage.getItem(TEST_KEY)).not.toThrow();
    setItemSpy.mockRestore();
  });
});
