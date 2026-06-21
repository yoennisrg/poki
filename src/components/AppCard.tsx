import type { AppItem } from "../types/app";

interface AppCardProps {
  app: AppItem;
  isFavorite: boolean;
  onOpen: (app: AppItem) => void;
  onToggleFavorite: (id: number) => void;
}

export function AppCard({ app, isFavorite, onOpen, onToggleFavorite }: AppCardProps) {
  const label = isFavorite ? "Quitar de favoritos" : "Añadir a favoritos";

  return (
    <article
      tabIndex={0}
      aria-label={`Ver detalles de ${app.title}`}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-[14px] border border-white/[0.06] bg-surface transition hover:-translate-y-1 hover:border-accent/45 hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)] focus:border-accent/45 focus:outline-none"
      onClick={() => onOpen(app)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(app);
        }
      }}
    >
      <button
        type="button"
        aria-pressed={isFavorite}
        aria-label={label}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(app.id);
        }}
        className="absolute top-2.5 right-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-surface/85 text-base transition active:scale-[0.92] hover:bg-surface-hover hover:text-text text-text-muted aria-pressed:text-danger"
      >
        {isFavorite ? "♥" : "♡"}
      </button>
      <div
        className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-4xl"
        aria-hidden="true"
      >
        {app.icon}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <h3 className="text-[0.98rem] font-semibold leading-tight">{app.title}</h3>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wide text-text-muted">
            {app.category}
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-star">
            ★ {app.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </article>
  );
}
