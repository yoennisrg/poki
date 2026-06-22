import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { catalogStore, useCatalog } from "../useCatalog";

const rawApp = {
  id: 1,
  title: "HexGL",
  category: "carreras",
  description: "Carrera futurista.",
  url: "https://hexgl.bkcore.com/",
  icon: "🏎️",
  rating: 4.7,
  trending: true,
  isLocal: false,
  controls: { scheme: "keyboard", keys: "← →" },
};

describe("useCatalog", () => {
  beforeEach(() => {
    catalogStore.reset();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ data: [rawApp], total: 1, limit: 100, offset: 0 }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      )
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("starts loading and then exposes apps", async () => {
    const { result } = renderHook(() => useCatalog());
    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.apps).toHaveLength(1);
    expect(result.current.error).toBeNull();
  });

  it("sets error when fetch fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network error")));
    const { result } = renderHook(() => useCatalog());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe("Network error");
    expect(result.current.apps).toHaveLength(0);
  });

  it("refetch reloads the catalog", async () => {
    const { result } = renderHook(() => useCatalog());
    await waitFor(() => expect(result.current.loading).toBe(false));
    vi.clearAllMocks();
    result.current.refetch();
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  });
});
