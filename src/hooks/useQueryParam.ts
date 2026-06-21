import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export function useQueryParam(key: string) {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = useMemo(() => searchParams.get(key) ?? undefined, [searchParams, key]);

  const setValue = useCallback(
    (next: string | undefined) => {
      setSearchParams(
        (prev) => {
          const updated = new URLSearchParams(prev);
          if (next === undefined || next === "") {
            updated.delete(key);
          } else {
            updated.set(key, next);
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
