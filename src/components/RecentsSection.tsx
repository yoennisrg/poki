import type { AppItem } from "../types/app";
import { AppGrid } from "./AppGrid";

interface RecentsSectionProps {
  apps: AppItem[];
  recentIds: number[];
  visible: boolean;
  onOpen: (app: AppItem) => void;
  onToggleFavorite: (id: number) => void;
  onClear: () => void;
  favoriteIds: number[];
}

export function RecentsSection({
  apps,
  recentIds,
  visible,
  onOpen,
  onToggleFavorite,
  onClear,
  favoriteIds,
}: RecentsSectionProps) {
  if (!visible || recentIds.length === 0) return null;

  const recentApps = recentIds
    .map((id) => apps.find((app) => app.id === id))
    .filter((app): app is AppItem => Boolean(app));

  return (
    <section className="mb-10" aria-labelledby="recents-title">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h2 id="recents-title" className="text-xl font-semibold">
          🕓 Jugados recientemente
        </h2>
        <button
          type="button"
          onClick={onClear}
          className="rounded-full border border-white/10 bg-transparent px-3 py-1.5 text-xs font-medium text-text-muted transition hover:border-white/20 hover:bg-white/5 hover:text-text"
        >
          Limpiar
        </button>
      </div>
      <AppGrid
        apps={recentApps}
        favoriteIds={favoriteIds}
        onOpen={onOpen}
        onToggleFavorite={onToggleFavorite}
      />
    </section>
  );
}
