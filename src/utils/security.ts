const MAX_SEARCH_LENGTH = 120;
const ALLOWED_PROTOCOLS = ["http:", "https:"];

export function sanitizeSearchInput(input: string): string {
  const trimmed = input.trim();
  if (trimmed.length > MAX_SEARCH_LENGTH) {
    return trimmed.slice(0, MAX_SEARCH_LENGTH);
  }
  return trimmed;
}

export function isValidHttpUrl(url: string): boolean {
  if (!url || typeof url !== "string" || url.trim() === "") return false;

  try {
    const parsed = new URL(url, window.location.href);

    if (parsed.protocol === "javascript:" || parsed.protocol === "data:") {
      return false;
    }

    if (ALLOWED_PROTOCOLS.includes(parsed.protocol)) {
      return true;
    }

    return parsed.origin === window.location.origin;
  } catch {
    return false;
  }
}

export function isLocalUrl(url: string): boolean {
  if (!url || typeof url !== "string") return false;
  return url.startsWith("/") && !url.startsWith("//");
}

export function isPositiveIntegerArray(value: unknown): value is number[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "number" && Number.isFinite(item) && item > 0 && Number.isInteger(item))
  );
}
