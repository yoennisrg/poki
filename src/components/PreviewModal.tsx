import { useEffect, useRef } from "react";
import type { AppItem } from "../types/app";

interface PreviewModalProps {
  app: AppItem | null;
  isFavorite: boolean;
  onClose: () => void;
  onPlay: (app: AppItem) => void;
  onToggleFavorite: (id: number) => void;
}

export function PreviewModal({
  app,
  isFavorite,
  onClose,
  onPlay,
  onToggleFavorite,
}: PreviewModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const label = isFavorite ? "Quitar de favoritos" : "Añadir a favoritos";

  useEffect(() => {
    if (app) {
      document.body.style.overflow = "hidden";
      closeRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [app]);

  if (!app) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Vista previa de app"
    >
      <div
        className="absolute inset-0 bg-black/82 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-md rounded-[14px] border border-white/[0.08] bg-surface p-7 text-center shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
        <button
          ref={closeRef}
          type="button"
          aria-label="Cerrar vista previa"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-surface-hover text-text transition hover:bg-white/10"
        >
          ✕
        </button>
        <div className="mb-2 text-7xl leading-none" aria-hidden="true">
          {app.icon}
        </div>
        <div className="mb-3 flex items-center justify-center gap-3">
          <h2 className="text-2xl font-bold">{app.title}</h2>
          <button
            type="button"
            aria-pressed={isFavorite}
            aria-label={label}
            onClick={() => onToggleFavorite(app.id)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-surface-hover text-lg text-text-muted transition active:scale-[0.92] hover:bg-white/[0.08] hover:text-text aria-pressed:text-danger"
          >
            {isFavorite ? "♥" : "♡"}
          </button>
        </div>
        <div className="mb-3 flex flex-wrap items-center justify-center gap-2 text-sm font-medium text-text-muted">
          <span className="uppercase tracking-wide">{app.category}</span>
          <span className="text-star">★ {app.rating.toFixed(1)}</span>
          {app.isLocal && (
            <span className="rounded-full bg-success/20 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-success">
              Demo local
            </span>
          )}
        </div>
        <p className="mb-4 text-sm leading-relaxed text-text-muted">{app.description}</p>
        <button
          type="button"
          onClick={() => onPlay(app)}
          className="w-full rounded-full bg-accent px-5 py-3.5 font-semibold text-white transition hover:bg-accent-hover hover:-translate-y-0.5 focus:outline-none"
        >
          ▶ Jugar ahora
        </button>
      </div>
    </div>
  );
}
