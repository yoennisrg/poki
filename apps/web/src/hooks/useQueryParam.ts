import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const MAX_QUERY_PARAM_LENGTH = 200;

function sanitizeParam(input: string): string {
  const trimmed = input.trim();
  if (trimmed.length > MAX_QUERY_PARAM_LENGTH) {
    return trimmed.slice(0, MAX_QUERY_PARAM_LENGTH);
  }
  return trimmed;
}

export function useQueryParam(key: string) {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = useMemo(() => {
    const raw = searchParams.get(key);
    if (!raw) return undefined;
    return sanitizeParam(raw);
  }, [searchParams, key]);

  const setValue = useCallback(
    (next: string | undefined) => {
      setSearchParams(
        (prev) => {
          const updated = new URLSearchParams(prev);
          if (next === undefined || next === "") {
            updated.delete(key);
          } else {
            updated.set(key, sanitizeParam(next));
          }
          return updated;
        },
        { replace: true }
      );
    },
    [key, setSearchParams]
  );

  return [value, setValue] as const;
}
