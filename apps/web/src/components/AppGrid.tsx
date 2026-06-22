import type { AppItem } from "../types/app";
import { AppCard } from "./AppCard";

interface AppGridProps {
  apps: AppItem[];
  favoriteIds: number[];
  onOpen: (app: AppItem) => void;
  onToggleFavorite: (id: number) => void;
}

export function AppGrid({ apps, favoriteIds, onOpen, onToggleFavorite }: AppGridProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-4 sm:grid-cols-[repeat(auto-fill,minmax(140px,1fr))]">
      {apps.map((app) => (
        <AppCard
          key={app.id}
          app={app}
          isFavorite={favoriteIds.includes(app.id)}
          onOpen={onOpen}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
