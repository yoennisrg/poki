import type { AppItem } from "../types/app";
import { AppGrid } from "./AppGrid";

interface TrendingSectionProps {
  apps: AppItem[];
  visible: boolean;
  favoriteIds: number[];
  onOpen: (app: AppItem) => void;
  onToggleFavorite: (id: number) => void;
}

export function TrendingSection({
  apps,
  visible,
  favoriteIds,
  onOpen,
  onToggleFavorite,
}: TrendingSectionProps) {
  if (!visible || apps.length === 0) return null;

  return (
    <section className="mb-10" aria-labelledby="trending-title">
      <h2 id="trending-title" className="mb-4 text-xl font-semibold">
        🔥 Tendencias
      </h2>
      <AppGrid
        apps={apps}
        favoriteIds={favoriteIds}
        onOpen={onOpen}
        onToggleFavorite={onToggleFavorite}
      />
    </section>
  );
}
