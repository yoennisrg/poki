import { useEffect, useRef, useState } from "react";
import { ControlBar } from "./ControlBar";
import { isLocalUrl, isValidHttpUrl } from "../utils/security";
import type { AppItem } from "../types/app";

interface PlayerModalProps {
  app: AppItem | null;
  onClose: () => void;
  onBrowseCatalog?: () => void;
  onOpenApp?: (app: AppItem) => void;
  localApps?: AppItem[];
}

const PLAYER_LOAD_TIMEOUT_MS = 4000;
const IFRAME_SANDBOX = "allow-scripts allow-same-origin";

function isPlayableUrl(url: string): boolean {
  return isLocalUrl(url) || isValidHttpUrl(url);
}

export function PlayerModal({ app, onClose, onBrowseCatalog, onOpenApp, localApps = [] }: PlayerModalProps) {
  const initialUrlValid = app ? isPlayableUrl(app.url) : true;
  const [loading, setLoading] = useState(initialUrlValid);
  const [error, setError] = useState(!initialUrlValid);
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

    if (!isPlayableUrl(app.url)) {
      return;
    }

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
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 overflow-y-auto bg-black/80 p-6 text-center">
              <p className="text-lg font-semibold text-text">No pudimos cargar el juego</p>
              <p className="max-w-md text-sm text-text-muted">
                {app.isLocal
                  ? "El juego demo no está disponible en este momento. Puedes volver al catálogo y probar otro título."
                  : "Este juego depende de un sitio externo que no respondió. Te recomendamos probar uno de nuestros demos locales."}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="rounded-full border border-white/10 bg-surface-hover px-4 py-2 text-sm font-medium text-text transition hover:bg-white/[0.08]"
                >
                  Reintentar
                </button>
                {onBrowseCatalog && (
                  <button
                    type="button"
                    onClick={onBrowseCatalog}
                    className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-hover"
                  >
                    Volver al catálogo
                  </button>
                )}
              </div>
              {localApps.length > 0 && (
                <div className="mt-2 w-full max-w-md">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
                    Demos que funcionan ahora
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {localApps.map((localApp) => (
                      <button
                        key={localApp.id}
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenApp?.(localApp);
                        }}
                        className="flex items-center gap-2 rounded-full border border-white/10 bg-surface px-3 py-1.5 text-sm text-text transition hover:border-accent/45 hover:bg-surface-hover"
                        title={`Ver ${localApp.title}`}
                      >
                        <span aria-hidden="true">{localApp.icon}</span>
                        <span className="max-w-[140px] truncate">{localApp.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          <iframe
            src={app.url}
            title="App embebida"
            loading="lazy"
            allow="fullscreen"
            sandbox={IFRAME_SANDBOX}
            referrerPolicy="no-referrer"
            onLoad={() => {
              setLoading(false);
              if (timerRef.current) {
                clearTimeout(timerRef.current);
              }
            }}
            className="h-full w-full border-0"
          />
          <ControlBar controls={app.controls} />
        </div>
      </div>
    </div>
  );
}
