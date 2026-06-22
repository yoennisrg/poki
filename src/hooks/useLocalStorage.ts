import { useCallback, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  validator?: (value: unknown) => value is T
) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw) as unknown;
        if (validator ? validator(parsed) : true) {
          return parsed as T;
        }
      }
    } catch {
      // Ignore storage/parse errors (e.g. private mode).
    }
    return initialValue;
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next = typeof value === "function" ? (value as (prev: T) => T)(prev) : value;
        try {
          localStorage.setItem(key, JSON.stringify(next));
        } catch {
          // Ignore storage errors (e.g. quota exceeded, private mode).
          return prev;
        }
        return next;
      });
    },
    [key]
  );

  return [storedValue, setValue] as const;
}
