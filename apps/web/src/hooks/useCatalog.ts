import { useCallback, useSyncExternalStore } from "react";
import { fetchApps } from "../lib/api";
import type { AppItem } from "../types/app";

export interface UseCatalogResult {
  apps: AppItem[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface CatalogState {
  apps: AppItem[];
  loading: boolean;
  error: string | null;
}

export class CatalogStore {
  private state: CatalogState = { apps: [], loading: true, error: null };
  private listeners = new Set<() => void>();
  private started = false;

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    if (!this.started) {
      this.started = true;
      void this.load();
    }
    return () => {
      this.listeners.delete(listener);
    };
  }

  reset(): void {
    this.started = false;
    this.state = { apps: [], loading: true, error: null };
  }

  getSnapshot(): CatalogState {
    return this.state;
  }

  refetch(): void {
    void this.load();
  }

  private setState(next: Partial<CatalogState>): void {
    this.state = { ...this.state, ...next };
    this.listeners.forEach((listener) => listener());
  }

  private async load(): Promise<void> {
    this.setState({ loading: true, error: null });
    try {
      const result = await fetchApps({ limit: 100 });
      this.setState({ apps: result.data, loading: false, error: null });
    } catch (err) {
      const message = err instanceof Error ? err.message : "No pudimos cargar el catálogo";
      this.setState({ loading: false, error: message });
    }
  }
}

export const catalogStore = new CatalogStore();

export function useCatalog(): UseCatalogResult {
  const state = useSyncExternalStore(
    useCallback((listener: () => void) => catalogStore.subscribe(listener), []),
    () => catalogStore.getSnapshot()
  );

  const refetch = useCallback(() => catalogStore.refetch(), []);

  return { ...state, refetch };
}
