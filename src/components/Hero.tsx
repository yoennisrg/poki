export function Hero() {
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
