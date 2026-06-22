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
- **Dirección futura (en planificación)**: migrar el repositorio a un monorepo administrado con Nx. El frontend actual se convertirá en la app `apps/web` y se añadirá una app `apps/api` con NestJS + TypeORM + SQLite para soportar persistencia centralizada. Ver `docs/monorepo-migration-plan.md` para el plan detallado.

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

## Seguridad

- **Sanitización de entradas**: `src/utils/security.ts` recorta y limita la longitud de búsquedas y query params; rechaza protocolos no permitidos (`javascript:`, `data:`, `vbscript:`, `file:`, `ftp:`) y URLs protocol-relative (`//`).
- **Persistencia defensiva**: `src/hooks/useLocalStorage.ts` valida valores con type guards, ignora errores de parseo y conserva el estado previo ante fallos de escritura (p. ej. quota exceeded o modo privado).
- **Iframe sandboxed**: `PlayerModal` usa `sandbox="allow-scripts allow-same-origin"`, `referrerPolicy="no-referrer"` y `allow="fullscreen"`; solo carga URLs locales o HTTP(S) validadas.
- **CSP y headers**: `index.html` declara una Content-Security-Policy restrictiva; `nginx.conf` añade headers de seguridad esenciales (HSTS, X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy) en la imagen de producción.
- **Auditoría de dependencias**: el script `pnpm audit` verifica vulnerabilidades conocidas; se recomienda integrarlo en el workflow de CI para ejecutarlo en cada cambio.

## DevOps y entrega continua

- **Gestor de paquetes normalizado**: `pnpm` es el gestor oficial. El campo `packageManager` en `package.json` fija la versión y se eliminó el `package-lock.json` duplicado.
- **CI en GitHub Actions**: el workflow `.github/workflows/ci.yml` ejecuta lint, type-check, `pnpm audit`, tests unitarios y tests E2E de Playwright en cada PR y push a `main`.
- **Release automatizado**: el workflow `.github/workflows/release.yml` construye y publica una imagen Docker en GHCR con tags semánticos cada vez que se empuja un tag `v*`.
- **Docker multi-stage**: `Dockerfile` usa una etapa de build con Node.js + pnpm y una etapa de producción con nginx alpine para servir la SPA.
- **Entorno local containerizado**: `docker-compose.yml` ofrece los servicios `app` (producción) y `dev` (desarrollo con live reload).
- **Devcontainer**: `.devcontainer/devcontainer.json` permite abrir el proyecto en VS Code o GitHub Codespaces con dependencias y extensiones preinstaladas.

## Decisiones recientes

- **Hero de quick resume**: cuando el usuario tiene historial reciente, el hero de la homepage se convierte en un acceso directo al último juego, reduciendo el "time to fun" de varios clics a uno solo.
- **Favoritos locales**: evita forzar login, aporta valor inmediato y reduce fricción de redescubrimiento.
- **Empty state accionable**: transforma un callejón sin salida en una vía rápida de regreso al catálogo.
- **Migración a React + Vite + TypeScript + TailwindCSS**: mejora mantenibilidad, tipado y escalabilidad del MVP manteniendo toda la funcionalidad previa.
- **Juego demo local (Snake)**: demuestra que el reproductor ejecuta realmente una app HTML5, no solo muestra una URL.
- **URLs de juegos reales**: los placeholders de `example.com` se reemplazaron por juegos HTML5 open-source con cabeceras que permiten embebido en iframe, eliminando el error de "Example Domain" en el reproductor.
- **CI/CD y dockerización**: se añadieron pipelines de integración continua, release automatizado de imagen Docker y entornos de desarrollo reproducibles para reducir la fricción del equipo.
- **Endurecimiento de seguridad del servidor**: `nginx.conf` añade headers de seguridad esenciales en la imagen de producción (HSTS, X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy).
- **Auditoría de dependencias**: se añadió el script `pnpm audit --audit-level moderate` para detectar vulnerabilidades conocidas; queda pendiente su integración en el workflow de CI.
- **Validación de integridad de datos**: `src/data/__tests__/apps.test.ts` valida que cada app tenga campos requeridos, IDs únicos, categorías conocidas, ratings válidos y URLs seguras (locales o HTTP/S).
- **Robustez de localStorage ante escrituras fallidas**: `useLocalStorage` conserva el estado previo cuando `localStorage.setItem` falla (quota exceeded, modo privado), evitando crashes silenciosos.
- **Rechazo de URLs protocol-relative**: `isValidHttpUrl` rechaza explícitamente URLs que empiecen con `//`, cerrando un vector de redirección a orígenes arbitrarios.
- **Controles de entrada por juego**: cada app en `src/data/apps.ts` declara un esquema de controles (`keyboard`, `touch`, `mouse`, `hybrid`) y, opcionalmente, las teclas/acciones. El `PlayerModal` usa `ControlBar` y `useIsTouchDevice` para mostrar ayuda contextual solo cuando aporta valor: los juegos de teclado no muestran overlay en desktop, pero advierten en dispositivos táctiles; los juegos híbridos o táctiles muestran pistas de toque en móvil. El `PreviewModal` muestra el esquema antes de jugar para reducir la fricción.
- **Monorepo Nx con backend NestJS + TypeORM + SQLite**: se decide escalar la arquitectura desde SPA independiente a monorepo para separar frontend (`apps/web`) y backend (`apps/api`), permitiendo persistencia centralizada, APIs propias y escalabilidad futura del catálogo.
