# AGENTS.md — Notas técnicas del marketplace HTML5

## Arquitectura

- Frontend puro: `index.html`, `styles.css`, `app.js`. Sin framework ni build step.
- `app.js` expone una única IIFE que mantiene estado, datos estáticos (`APPS`) y funciones de renderizado manual.
- Estado central: `category`, `query`, `recents`, `favorites`, `playerLoadTimer`.
- Persistencia en `localStorage`:
  - `poki-recents`: array de IDs de apps jugadas recientemente (máx. 6).
  - `poki-favorites`: array de IDs de apps marcadas como favoritas.

## Convenciones de UI

- CSS con variables en `:root` para tema oscuro, usando `Inter` desde Google Fonts.
- Tarjetas `.card` son `<article>` con `tabindex="0"` y manejadores de click/keyboard para abrir el preview.
- Modales usan atributo `hidden` y `role="dialog" aria-modal="true"`.
- Botones de favorito usan `aria-pressed` y un ícono de corazón (`♡`/`♥`).

## Flujos principales

1. Descubrimiento: hero + categorías + tendencias + catálogo completo.
2. Búsqueda/filtro: actualización en tiempo real del DOM; empty state accionable si no hay resultados.
3. Preview: modal con metadata de la app, botón de favorito y CTA a jugar.
4. Player: iframe sandboxed con spinner de carga, mensaje de error y fullscreen.
5. Recientes y favoritos: secciones personales renderizadas solo en la vista de inicio (`isHomeView`).

## Testing visual

- Servir la app con `python3 -m http.server 8080`.
- Verificar con Playwright siguiendo `.ants/pheromones/testing-ui.md`.
- Guardar capturas en `screenshots/` y adjuntarlas al PR como comentario de evidencia.

## Decisiones recientes

- **Favoritos locales**: evita forzar login, aporta valor inmediato y reduce fricción de redescubrimiento.
- **Empty state accionable**: transforma un callejón sin salida en una vía rápida de regreso al catálogo.
