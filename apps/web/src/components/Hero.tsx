import type { AppItem } from "../types/app";

interface HeroProps {
  lastPlayedApp: AppItem | null;
  onResume: (app: AppItem) => void;
}

export function Hero({ lastPlayedApp, onResume }: HeroProps) {
  if (lastPlayedApp) {
    return (
      <section
        className="mb-9 rounded-[14px] border border-white/[0.06] bg-gradient-to-br from-accent/25 to-success/12 px-6 py-7 sm:px-8 sm:py-9"
        aria-labelledby="hero-title"
      >
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="mb-1.5 text-sm font-medium uppercase tracking-wide text-text-muted">
              Continua donde lo dejaste
            </p>
            <h1
              id="hero-title"
              className="mb-2.5 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl"
            >
              ¿Seguimos con {lastPlayedApp.title}?
            </h1>
            <div className="mb-4 flex items-center justify-center gap-3 text-sm font-medium text-text-muted sm:justify-start">
              <span className="uppercase tracking-wide">{lastPlayedApp.category}</span>
              <span className="text-star">★ {lastPlayedApp.rating.toFixed(1)}</span>
            </div>
            <button
              type="button"
              onClick={() => onResume(lastPlayedApp)}
              className="rounded-full bg-accent px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-accent-hover focus:outline-none"
            >
              ▶ Seguir jugando
            </button>
          </div>
          <div
            className="flex h-28 w-28 shrink-0 items-center justify-center rounded-[14px] border border-white/[0.08] bg-surface text-6xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] sm:h-32 sm:w-32 sm:text-7xl"
            aria-hidden="true"
          >
            {lastPlayedApp.icon}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="mb-9 rounded-[14px] border border-white/[0.06] bg-gradient-to-br from-accent/25 to-success/12 px-8 py-9"
      aria-labelledby="hero-title"
    >
      <h1
        id="hero-title"
        className="mb-2.5 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl"
      >
        Juega al instante, sin instalaciones
      </h1>
      <p className="max-w-xl text-text-muted">
        Descubre miles de juegos y apps HTML5 que corren directamente en tu navegador.
      </p>
    </section>
  );
}
