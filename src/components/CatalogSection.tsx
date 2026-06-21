import type { AppItem } from "../types/app";
import { AppGrid } from "./AppGrid";
import { EmptyState } from "./EmptyState";

interface CatalogSectionProps {
  apps: AppItem[];
  filteredCount: number;
  favoriteIds: number[];
  onOpen: (app: AppItem) => void;
  onToggleFavorite: (id: number) => void;
  onClearFilters: () => void;
}

export function CatalogSection({
  apps,
  filteredCount,
  favoriteIds,
  onOpen,
  onToggleFavorite,
  onClearFilters,
}: CatalogSectionProps) {
  return (
    <section className="mb-10" aria-labelledby="catalog-title">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h2 id="catalog-title" className="text-xl font-semibold">
          Explorar todo
        </h2>
        <p className="text-sm text-text-muted">{filteredCount} resultado{filteredCount === 1 ? "" : "s"}</p>
      </div>
      {apps.length === 0 ? (
        <EmptyState onClear={onClearFilters} />
      ) : (
        <AppGrid
          apps={apps}
          favoriteIds={favoriteIds}
          onOpen={onOpen}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </section>
  );
}
