interface CatalogStatusProps {
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

export function CatalogStatus({ loading, error, onRetry }: CatalogStatusProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3.5 py-16 text-sm text-text-muted">
        <span className="h-10 w-10 animate-spin rounded-full border-[3px] border-white/12 border-t-accent" />
        <span>Cargando catálogo…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-[14px] border border-white/[0.06] bg-surface px-6 py-10 text-center">
        <p className="text-base font-semibold text-text">No pudimos cargar el catálogo</p>
        <p className="max-w-md text-sm text-text-muted">{error}</p>
        <button
          type="button"
          onClick={onRetry}
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-hover"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return null;
}
