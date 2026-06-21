import { useEffect, useRef, useState } from "react";
import type { AppItem } from "../types/app";

interface PlayerModalProps {
  app: AppItem | null;
  onClose: () => void;
}

const PLAYER_LOAD_TIMEOUT_MS = 4000;

export function PlayerModal({ app, onClose }: PlayerModalProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!app) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    timerRef.current = window.setTimeout(() => {
      setLoading(false);
      setError(true);
    }, PLAYER_LOAD_TIMEOUT_MS);

    return () => {
      document.body.style.overflow = "";
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [app]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && app) {
        onClose();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [app, onClose]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      wrapperRef.current?.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  if (!app) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Reproductor de app"
    >
      <div
        className="absolute inset-0 bg-black/82 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 flex h-full w-full max-w-[980px] flex-col overflow-hidden rounded-none border border-white/[0.08] bg-surface shadow-[0_10px_30px_rgba(0,0,0,0.35)] sm:h-[min(86vh,720px)] sm:rounded-[14px]">
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3">
          <h3 className="truncate text-base font-semibold">{app.title}</h3>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Pantalla completa"
              onClick={toggleFullscreen}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-surface-hover text-text transition hover:bg-white/10"
            >
              ⛶
            </button>
            <button
              ref={closeRef}
              type="button"
              aria-label="Cerrar reproductor"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-surface-hover text-text transition hover:bg-white/10"
            >
              ✕
            </button>
          </div>
        </div>
        <div ref={wrapperRef} className="relative flex-1 bg-black">
          {loading && !error && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3.5 text-sm text-text-muted">
              <span className="h-10 w-10 animate-spin rounded-full border-[3px] border-white/12 border-t-accent" />
              <span>Cargando juego…</span>
            </div>
          )}
          {error && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-black/70 p-5 text-center">
              <p className="text-base font-semibold text-text">No pudimos cargar el juego.</p>
              <p className="max-w-md text-sm text-text-muted">
                Puede deberse a restricciones del sitio externo. Prueba con otro título.
              </p>
            </div>
          )}
          <iframe
            src={app.url}
            title="App embebida"
            loading="lazy"
            allow="fullscreen"
            sandbox="allow-scripts allow-same-origin allow-popups"
            onLoad={() => {
              setLoading(false);
              if (timerRef.current) {
                clearTimeout(timerRef.current);
              }
            }}
            className="h-full w-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
