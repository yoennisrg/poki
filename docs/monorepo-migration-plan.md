# Plan de migración a monorepo Nx

## Estado

En planificación. Aprobado por dirección. Pendiente de ejecución por `atlas`.

## Objetivo

Escalar el marketplace HTML5 desde una SPA independiente hacia un monorepo Nx que permita:

- Convivencia del frontend existente con nuevas aplicaciones (backend, futuras librerías compartidas, etc.).
- Un backend propio con NestJS + TypeORM + SQLite para persistencia centralizada.
- Mejorar la escalabilidad del catálogo y preparar el terreno para features que requieren servidor (usuarios, rankings, sincronización de favoritos, analytics, etc.).

## Alcance

### Dentro del alcance

1. Inicializar un workspace Nx en la raíz del repositorio.
2. Migrar el frontend React + Vite + TypeScript + TailwindCSS v4 actual a `apps/web`.
3. Crear el esqueleto de `apps/api` con NestJS, TypeORM y SQLite.
4. Conservar los scripts de calidad actuales (lint, type-check, tests unitarios, tests E2E, build).
5. Actualizar Docker, docker-compose y CI/CD para el nuevo layout.
6. Documentar la nueva estructura en `AGENTS.md`.

### Fuera del alcance (fases futuras)

- Migración de datos de `localStorage` al backend (fase de `piper`/`kael`).
- Autenticación de usuarios.
- Endpoints de catálogo dinámico (fase de `kael`).
- Optimizaciones de performance específicas del monorepo (fase de `nova`).

## Estructura de carpetas propuesta

```
.
├── apps/
│   ├── web/                    # Frontend actual (React + Vite)
│   │   ├── src/
│   │   ├── public/
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   ├── tsconfig.app.json
│   │   └── project.json        # Targets de Nx para la app web
│   └── api/                    # Backend NestJS
│       ├── src/
│       │   ├── app.module.ts
│       │   ├── main.ts
│       │   └── entities/
│       │       └── app.entity.ts
│       ├── test/
│       ├── tsconfig.app.json
│       └── project.json        # Targets de Nx para la API
├── libs/                       # Librerías compartidas (vacío inicialmente)
├── tools/
├── nx.json
├── package.json                # Root con pnpm workspaces
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── Dockerfile                  # Multi-stage ajustado al monorepo
```

## Stack tecnológico

- **Monorepo**: Nx (latest stable) con integración de pnpm workspaces.
- **Frontend**: React 19, Vite, TypeScript 6, TailwindCSS v4, react-router-dom.
- **Backend**: NestJS, TypeORM, SQLite (`better-sqlite3` o `sqlite3`).
- **Testing**: Vitest (web), Jest/Supertest (api), Playwright (e2e).
- **CI/CD**: GitHub Actions (ajustar paths de triggers y steps).
- **Contenedores**: Docker multi-stage con nginx para `web` y Node para `api`.

## Fases de migración

### Fase 1: Setup del workspace Nx (`atlas`)

1. Crear backup/etiqueta del estado actual.
2. Ejecutar `npx create-nx-workspace@latest` o configurar Nx manualmente sobre el repo existente.
3. Ajustar `package.json` root, `pnpm-workspace.yaml` y `nx.json`.
4. Mover el código del frontend a `apps/web` manteniendo el historial de git (`git mv` preferible).
5. Verificar que `pnpm install`, `nx build web`, `nx test web` y `nx e2e web` funcionen.

### Fase 2: Aplicación NestJS (`atlas` + `kael`)

1. Generar `apps/api` con el plugin de NestJS de Nx.
2. Configurar TypeORM con SQLite.
3. Crear entidad base de ejemplo (p. ej. `App` o `Category`) con migración inicial.
4. Exponer un endpoint de healthcheck (`GET /health`).
5. Verificar que `nx serve api` y `nx test api` funcionen.

### Fase 3: Ajuste de DevOps (`echo`)

1. Actualizar `Dockerfile` para construir ambas apps desde el monorepo.
2. Actualizar `docker-compose.yml` con servicios `web` y `api`.
3. Actualizar `.github/workflows/ci.yml` para usar targets de Nx y ejecutar tests de ambas apps.
4. Actualizar `.github/workflows/release.yml` para publicar imágenes de `web` y `api`.
5. Revisar `.devcontainer/devcontainer.json` si es necesario.

### Fase 4: Limpieza y documentación (`lyra` / `uma`)

1. Eliminar configuraciones duplicadas o archivos obsoletos de la raíz.
2. Actualizar `README.md` y `AGENTS.md` con instrucciones del monorepo.
3. Añadir decisiones recientes y convenciones de Nx.

## Riesgos y mitigaciones

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Ruptura del frontend durante la migración | Alto | Migrar con `git mv`, ejecutar tests en cada paso, mantener rama larga con reviews frecuentes. |
| Conflictos con el PR #13 de `echo` (CI/CD) | Medio | Coordinar con `echo`; aplicar cambios de CI después del setup de Nx. |
| Aumento de complejidad para desarrolladores | Medio | Documentar comandos comunes (`nx serve web`, `nx test api`) y mantener devcontainer actualizado. |
| Degradación de tiempos de build | Medio | Usar Nx cache y afectación de targets; evaluar remote caching si escala. |
| Acoplamiento accidental entre apps | Medio | Definir `libs/` temprano y prohibir imports cruzados entre `apps/web` y `apps/api`. |

## Definición de hecho

- [ ] `nx serve web` levanta el frontend sin regresiones visibles.
- [ ] `nx test web` y `nx e2e web` pasan.
- [ ] `nx serve api` levanta el backend y responde en `/health`.
- [ ] `nx test api` pasa.
- [ ] `nx build web` y `nx build api` generan artefactos correctos.
- [ ] Docker multi-stage construye imágenes de producción para ambas apps.
- [ ] CI/CD ejecuta lint, type-check, tests y build de ambas apps en PR/push.
- [ ] `AGENTS.md` refleja la nueva arquitectura.
- [ ] `.ants/handoff.md` apunta al siguiente responsable.

## Próximos pasos

1. `atlas` ejecuta la Fase 1 y deja el workspace Nx funcional.
2. `kael` toma la Fase 2 para definir entidades y endpoints iniciales.
3. `echo` actualiza DevOps en la Fase 3.
