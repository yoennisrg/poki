# AGENTS.md — Notas técnicas del marketplace HTML5

## Arquitectura

- Frontend: React + Vite + TypeScript + TailwindCSS v4.
- Punto de entrada: `src/main.tsx`, componente raíz `src/App.tsx`.
- Estado global manejado con hooks de React (`useState`, `useMemo`, `useCallback`).
- Routing: `react-router-dom` (`BrowserRouter`) para sincronizar query params (`category`, `query`, `app`).
- Datos estáticos de apps en `src/data/apps.ts`.
- Tipos centralizados en `src/types/app.ts`.
- Persistencia en `localStorage` mediante `src/hooks/useLocalStorage.ts`:
  - `poki-recents`: array de IDs de apps jugadas recientemente (máx. 6).
  - `poki-favorites`: array de IDs de apps marcadas como favoritas.

## Convenciones de UI

- Tema oscuro con variables CSS definidas en `src/index.css` vía `@theme` de Tailwind v4.
- Fuente `Inter` cargada desde Google Fonts.
- Tarjetas son `<article>` con `tabindex="0"` y manejadores de click/keyboard para abrir el preview.
- Modales usan `role="dialog" aria-modal="true"` y gestionan `overflow` del body.
- Botones de favorito usan `aria-pressed` e ícono de corazón (`♡`/`♥`).

## Flujos principales

1. Descubrimiento: hero + categorías + tendencias + catálogo completo.
2. Búsqueda/filtro: actualización en tiempo real del catálogo; empty state accionable si no hay resultados.
3. Preview: modal con metadata de la app, botón de favorito y CTA a jugar; se abre vía query param `?app=<id>`.
4. Player: iframe sandboxed con spinner de carga, mensaje de error tras timeout y fullscreen.
5. Recientes y favoritos: secciones personales renderizadas solo en la vista de inicio (`isHomeView`).
6. Demo local: Retro Snake en `public/games/snake/index.html` corre dentro del iframe sin depender de URLs externas.

## Testing visual

- Levantar dev server con `npm run dev`.
- Verificar con Playwright siguiendo `.ants/pheromones/testing-ui.md`.
- Guardar capturas en `screenshots/` y adjuntarlas al PR como comentario de evidencia.

## Decisiones recientes

- **Hero de quick resume**: cuando el usuario tiene historial reciente, el hero de la homepage se convierte en un acceso directo al último juego, reduciendo el "time to fun" de varios clics a uno solo.
- **Favoritos locales**: evita forzar login, aporta valor inmediato y reduce fricción de redescubrimiento.
- **Empty state accionable**: transforma un callejón sin salida en una vía rápida de regreso al catálogo.
- **Migración a React + Vite + TypeScript + TailwindCSS**: mejora mantenibilidad, tipado y escalabilidad del MVP manteniendo toda la funcionalidad previa.
- **Juego demo local (Snake)**: demuestra que el reproductor ejecuta realmente una app HTML5, no solo muestra una URL.
- **URLs de juegos reales**: los placeholders de `example.com` se reemplazaron por juegos HTML5 open-source con cabeceras que permiten embebido en iframe, eliminando el error de "Example Domain" en el reproductor.
