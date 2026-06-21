import type { AppItem } from "../types/app";
import { AppGrid } from "./AppGrid";

interface FavoritesSectionProps {
  apps: AppItem[];
  favoriteIds: number[];
  visible: boolean;
  onOpen: (app: AppItem) => void;
  onToggleFavorite: (id: number) => void;
  onClear: () => void;
}

export function FavoritesSection({
  apps,
  favoriteIds,
  visible,
  onOpen,
  onToggleFavorite,
  onClear,
}: FavoritesSectionProps) {
  if (!visible || favoriteIds.length === 0) return null;

  const favoriteApps = favoriteIds
    .map((id) => apps.find((app) => app.id === id))
    .filter((app): app is AppItem => Boolean(app));

  return (
    <section className="mb-10" aria-labelledby="favorites-title">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h2 id="favorites-title" className="text-xl font-semibold">
          ❤️ Tus favoritos
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
        apps={favoriteApps}
        favoriteIds={favoriteIds}
        onOpen={onOpen}
        onToggleFavorite={onToggleFavorite}
      />
    </section>
  );
}
