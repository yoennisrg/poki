interface EmptyStateProps {
  onClear: () => void;
}

export function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <div className="px-5 py-12 text-center">
      <p className="mb-2 text-lg font-semibold text-text">No encontramos resultados</p>
      <p className="mb-5 text-text-muted">
        Prueba con otra búsqueda o selecciona una categoría diferente.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="rounded-full border border-white/10 bg-surface-hover px-5 py-2.5 text-sm font-medium text-text transition hover:border-white/20 hover:bg-white/[0.08]"
      >
        Limpiar filtros
      </button>
    </div>
  );
}
