interface HeaderProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export function Header({ query, onQueryChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-bg/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-3.5">
        <a
          href="/"
          className="flex shrink-0 items-center gap-2.5 text-xl font-bold tracking-tight text-text no-underline"
          aria-label="Poki inicio"
        >
          <span aria-hidden="true">🎮</span>
          <span>Poki</span>
        </a>
        <div className="flex-1" style={{ maxWidth: 460 }} role="search">
          <label htmlFor="search-input" className="sr-only">
            Buscar juegos y apps
          </label>
          <input
            id="search-input"
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Buscar juegos, apps, géneros..."
            autoComplete="off"
            className="w-full rounded-full border border-white/[0.08] bg-surface px-4 py-2.5 text-sm text-text placeholder:text-text-muted outline-none transition focus:border-accent focus:ring-[3px] focus:ring-accent/25"
          />
        </div>
      </div>
    </header>
  );
}
