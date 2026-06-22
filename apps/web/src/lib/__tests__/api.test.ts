import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { fetchApps, fetchApp } from "../api";

function mockFetch(response: Response) {
  return vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response));
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

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

describe("fetchApps", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("fetches /api/apps with default limit", async () => {
    mockFetch(jsonResponse({ data: [rawApp], total: 1, limit: 100, offset: 0 }));
    const result = await fetchApps();
    expect(fetch).toHaveBeenCalledWith("/api/apps?limit=100&offset=0");
    expect(result.data).toHaveLength(1);
    expect(result.data[0].title).toBe("HexGL");
  });

  it("passes category filter", async () => {
    mockFetch(jsonResponse({ data: [], total: 0, limit: 100, offset: 0 }));
    await fetchApps({ category: "acción" });
    expect(fetch).toHaveBeenCalledWith("/api/apps?category=acci%C3%B3n&limit=100&offset=0");
  });

  it("passes limit and offset", async () => {
    mockFetch(jsonResponse({ data: [], total: 0, limit: 20, offset: 20 }));
    await fetchApps({ limit: 20, offset: 20 });
    expect(fetch).toHaveBeenCalledWith("/api/apps?limit=20&offset=20");
  });

  it("normalizes null controls to undefined", async () => {
    mockFetch(
      jsonResponse({
        data: [{ ...rawApp, id: 2, controls: null }],
        total: 1,
        limit: 100,
        offset: 0,
      })
    );
    const result = await fetchApps();
    expect(result.data[0].controls).toBeUndefined();
  });

  it("throws on HTTP error", async () => {
    mockFetch(jsonResponse({ message: "Bad Request" }, 400));
    await expect(fetchApps()).rejects.toThrow("Bad Request");
  });

  it("throws generic message when body has no message", async () => {
    mockFetch(jsonResponse({}, 500));
    await expect(fetchApps()).rejects.toThrow("HTTP 500");
  });
});

describe("fetchApp", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("fetches /api/apps/:id", async () => {
    mockFetch(jsonResponse(rawApp));
    const app = await fetchApp(1);
    expect(fetch).toHaveBeenCalledWith("/api/apps/1");
    expect(app.title).toBe("HexGL");
    expect(app.controls?.scheme).toBe("keyboard");
  });
});
