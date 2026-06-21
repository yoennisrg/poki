import { useCallback, useMemo, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { APPS } from "./data/apps";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useQueryParam } from "./hooks/useQueryParam";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { CategoryFilter } from "./components/CategoryFilter";
import { FavoritesSection } from "./components/FavoritesSection";
import { RecentsSection } from "./components/RecentsSection";
import { TrendingSection } from "./components/TrendingSection";
import { CatalogSection } from "./components/CatalogSection";
import { PreviewModal } from "./components/PreviewModal";
import { PlayerModal } from "./components/PlayerModal";
import type { AppItem } from "./types/app";

const MAX_RECENTS = 6;
const RECENTS_KEY = "poki-recents";
const FAVORITES_KEY = "poki-favorites";

function Marketplace() {
  const [category, setCategory] = useQueryParam("category");
  const [query, setQuery] = useQueryParam("query");
  const [appParam, setAppParam] = useQueryParam("app");
  const [recentIds, setRecentIds] = useLocalStorage<number[]>(RECENTS_KEY, []);
  const [favoriteIds, setFavoriteIds] = useLocalStorage<number[]>(FAVORITES_KEY, []);

  const activeCategory = category ?? "all";
  const activeQuery = query ?? "";
  const isHomeView = activeCategory === "all" && activeQuery === "";

  const filteredApps = useMemo(() => {
    const q = activeQuery.trim().toLowerCase();
    return APPS.filter((app) => {
      const matchesCategory = activeCategory === "all" || app.category === activeCategory;
      const matchesQuery =
        !q ||
        app.title.toLowerCase().includes(q) ||
        app.category.toLowerCase().includes(q) ||
        app.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, activeQuery]);

  const trendingApps = useMemo(
    () => filteredApps.filter((app) => app.trending),
    [filteredApps]
  );

  const previewApp = useMemo(() => {
    if (!appParam) return null;
    const id = Number(appParam);
    return APPS.find((app) => app.id === id) ?? null;
  }, [appParam]);

  const [playerApp, setPlayerApp] = useState<AppItem | null>(null);

  const addRecent = useCallback(
    (app: AppItem) => {
      setRecentIds((prev) => {
        const next = [app.id, ...prev.filter((id) => id !== app.id)];
        return next.slice(0, MAX_RECENTS);
      });
    },
    [setRecentIds]
  );

  const toggleFavorite = useCallback(
    (id: number) => {
      setFavoriteIds((prev) =>
        prev.includes(id) ? prev.filter((fav) => fav !== id) : [id, ...prev]
      );
    },
    [setFavoriteIds]
  );

  const clearRecents = useCallback(() => setRecentIds([]), [setRecentIds]);
  const clearFavorites = useCallback(() => setFavoriteIds([]), [setFavoriteIds]);

  const clearFilters = useCallback(() => {
    setQuery(undefined);
    setCategory(undefined);
  }, [setQuery, setCategory]);

  const openPreview = useCallback(
    (app: AppItem) => {
      setAppParam(String(app.id));
    },
    [setAppParam]
  );

  const closePreview = useCallback(() => {
    setAppParam(undefined);
  }, [setAppParam]);

  const playApp = useCallback(
    (app: AppItem) => {
      setPlayerApp(app);
      addRecent(app);
      setAppParam(undefined);
    },
    [addRecent, setAppParam]
  );

  const closePlayer = useCallback(() => {
    setPlayerApp(null);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header query={activeQuery} onQueryChange={setQuery} onHomeClick={clearFilters} />
      <CategoryFilter activeCategory={activeCategory} onCategoryChange={setCategory} />
      <main className="flex-1 px-5 py-7">
        <div className="mx-auto max-w-[1200px]">
          {isHomeView && <Hero />}
          <FavoritesSection
            apps={APPS}
            favoriteIds={favoriteIds}
            visible={isHomeView}
            onOpen={openPreview}
            onToggleFavorite={toggleFavorite}
            onClear={clearFavorites}
          />
          <RecentsSection
            apps={APPS}
            recentIds={recentIds}
            visible={isHomeView}
            favoriteIds={favoriteIds}
            onOpen={openPreview}
            onToggleFavorite={toggleFavorite}
            onClear={clearRecents}
          />
          <TrendingSection
            apps={trendingApps}
            visible={isHomeView}
            favoriteIds={favoriteIds}
            onOpen={openPreview}
            onToggleFavorite={toggleFavorite}
          />
          <CatalogSection
            apps={filteredApps}
            filteredCount={filteredApps.length}
            favoriteIds={favoriteIds}
            onOpen={openPreview}
            onToggleFavorite={toggleFavorite}
            onClearFilters={clearFilters}
          />
        </div>
      </main>
      <footer className="border-t border-white/[0.06] px-5 py-6 text-center text-sm text-text-muted">
        <p>Marketplace de Apps HTML5 · MVP de producto</p>
      </footer>

      <PreviewModal
        app={previewApp}
        isFavorite={previewApp ? favoriteIds.includes(previewApp.id) : false}
        onClose={closePreview}
        onPlay={playApp}
        onToggleFavorite={toggleFavorite}
      />
      <PlayerModal key={playerApp?.id ?? "closed"} app={playerApp} onClose={closePlayer} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Marketplace />
    </BrowserRouter>
  );
}
