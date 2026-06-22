import type { AppControls, AppItem } from "../types/app";

export interface PaginatedAppsResult {
  data: AppItem[];
  total: number;
  limit: number;
  offset: number;
}

interface RawApp {
  id: number;
  title: string;
  category: string;
  description: string;
  url: string;
  icon?: string;
  rating: number;
  trending: boolean;
  isLocal: boolean;
  controls?: AppControls | null;
}

function getApiBaseUrl(): string {
  return (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "/api";
}

function normalizeApp(raw: RawApp): AppItem {
  return {
    id: raw.id,
    title: raw.title,
    category: raw.category,
    description: raw.description,
    url: raw.url,
    icon: raw.icon ?? "🎮",
    rating: raw.rating,
    trending: raw.trending,
    isLocal: raw.isLocal,
    controls: raw.controls ?? undefined,
  };
}

function buildUrl(base: string, path: string, params?: Record<string, string | number | undefined>): string {
  const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}${buildQueryString(params)}`;
}

function buildQueryString(params?: Record<string, string | number | undefined>): string {
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(params ?? {})) {
    if (value !== undefined && value !== "") {
      qs.set(key, String(value));
    }
  }
  return qs.toString() ? `?${qs.toString()}` : "";
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = `HTTP ${response.status}`;
    try {
      const body = (await response.json()) as { message?: string };
      if (body.message) {
        message = body.message;
      }
    } catch {
      // Ignorar body no JSON.
    }
    throw new Error(message);
  }
  return response.json() as Promise<T>;
}

export interface FindAppsOptions {
  category?: string;
  limit?: number;
  offset?: number;
}

export async function fetchApps(options: FindAppsOptions = {}): Promise<PaginatedAppsResult> {
  const base = getApiBaseUrl();
  const url = buildUrl(base, "/apps", {
    category: options.category,
    limit: options.limit ?? 100,
    offset: options.offset ?? 0,
  });

  const response = await fetch(url);
  const result = await handleResponse<{ data: RawApp[]; total: number; limit: number; offset: number }>(response);

  return {
    data: result.data.map(normalizeApp),
    total: result.total,
    limit: result.limit,
    offset: result.offset,
  };
}

export async function fetchApp(id: number): Promise<AppItem> {
  const base = getApiBaseUrl();
  const url = buildUrl(base, `/apps/${id}`);
  const response = await fetch(url);
  const raw = await handleResponse<RawApp>(response);
  return normalizeApp(raw);
}
