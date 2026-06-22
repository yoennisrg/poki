import { renderHook, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { useQueryParam } from "../useQueryParam";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
);

describe("useQueryParam", () => {
  it("returns undefined when param is absent", () => {
    const { result } = renderHook(() => useQueryParam("app"), { wrapper });
    expect(result.current[0]).toBeUndefined();
  });

  it("reads existing param", () => {
    const { result } = renderHook(() => useQueryParam("app"), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={["/?app=13"]}>{children}</MemoryRouter>
      ),
    });
    expect(result.current[0]).toBe("13");
  });

  it("sets param and trims value", () => {
    const { result } = renderHook(() => useQueryParam("query"), { wrapper });
    act(() => {
      result.current[1]("  carreras  ");
    });
    expect(result.current[0]).toBe("carreras");
  });

  it("deletes param when setting empty string", () => {
    const { result } = renderHook(() => useQueryParam("query"), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={["/?query=snake"]}>{children}</MemoryRouter>
      ),
    });
    act(() => {
      result.current[1]("");
    });
    expect(result.current[0]).toBeUndefined();
  });

  it("caps param length", () => {
    const { result } = renderHook(() => useQueryParam("query"), { wrapper });
    const long = "a".repeat(300);
    act(() => {
      result.current[1](long);
    });
    expect(result.current[0]).toHaveLength(200);
  });
});
