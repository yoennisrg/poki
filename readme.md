# 🎮 Proyecto: Marketplace de Aplicaciones HTML5

El proyecto es un Marketplace de Aplicaciones HTML5 cuyo foco principal es permitir que los usuarios puedan descubrir y ejecutar miles de juegos y aplicaciones HTML5 directamente desde el navegador, sin necesidad de instalaciones ni descargas.

## 🎯 Propuesta de valor

- Acceso instantáneo a juegos y apps desde cualquier dispositivo.
- Experiencia "click & play" sin fricción.
- Descubrimiento fácil de contenido mediante categorías, búsqueda y recomendaciones.
- Plataforma centralizada para consumir y distribuir aplicaciones HTML5.

## 👤 Experiencia del usuario (core)

1. El usuario entra a la plataforma.
2. Explora juegos/apps por:
   - categorías
   - tendencias
   - recomendados
   - búsqueda
3. Selecciona un juego.
4. Se ejecuta directamente en el navegador (normalmente en iframe o sandbox).
5. Juega sin instalaciones ni registros obligatorios (opcional login para progreso o favoritos).

## 🧱 Concepto clave del sistema

- Todo el contenido son apps HTML5 embebidas.
- Cada app es un paquete independiente:
  - HTML
  - JS
  - CSS
  - assets
- Ejecutadas en un entorno aislado (sandboxed iframe).

## 📦 Rol de la plataforma

La plataforma actúa como:

- Distribuidor de aplicaciones HTML5
- Motor de descubrimiento
- Runtime host (via CDN + iframe)
- Sistema de monetización y analítica

## 🌐 Idea central simplificada

> "Un App Store web donde todo se ejecuta instantáneamente en el navegador."

## 🚀 Cómo ejecutar el proyecto localmente

El proyecto usa **React + Vite + TypeScript + TailwindCSS v4**. El gestor de paquetes oficial es **pnpm**.

### Requisitos

- [Node.js 22+](https://nodejs.org/)
- [pnpm](https://pnpm.io/) (se habilita automáticamente con `corepack enable`)
- [Docker](https://www.docker.com/) (opcional, para entornos containerizados)

### Opción 1: Instalación local con pnpm

```bash
# Instalar dependencias
pnpm install

# Servidor de desarrollo con hot reload
pnpm dev
```

Visita `http://localhost:5173`.

### Opción 2: Docker Compose (un solo comando)

```bash
# Entorno de desarrollo con live reload
docker compose up dev

# Build de producción servido por nginx
docker compose up app
```

### Opción 3: Devcontainer / GitHub Codespaces

Abre el repositorio en VS Code con la extensión Dev Containers o en GitHub Codespaces. El contenedor instalará las dependencias y expondrá el puerto `5173` automáticamente.

## 🧪 Scripts disponibles

```bash
pnpm dev          # Servidor de desarrollo
pnpm build        # Build de producción
pnpm preview      # Previsualizar build de producción
pnpm lint         # ESLint
pnpm test         # Tests unitarios con Vitest
pnpm test:e2e     # Tests E2E con Playwright
```

## 🗂️ Estructura del proyecto

```
.
├── src/                  # Código fuente React + TypeScript
├── public/               # Assets estáticos y juegos locales
├── e2e/                  # Tests E2E con Playwright
├── .github/workflows/    # CI/CD con GitHub Actions
├── .devcontainer/        # Configuración de devcontainer
├── Dockerfile            # Imagen de producción multi-stage
├── docker-compose.yml    # Orquestación local
├── nginx.conf            # Configuración de nginx para SPA
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── vite.config.ts
└── readme.md
```

## ✨ Funcionalidades actuales

- Catálogo de ejemplo con 12 apps/juegos.
- Búsqueda en tiempo real (título, categoría y descripción).
- Filtro por categoría.
- Sección de tendencias.
- Vista previa de app con descripción antes de ejecutar.
- Reproductor embebido en iframe sandboxed con indicador de carga y mensaje de fallback.
- Pantalla completa y cierre con tecla `Esc`.
- Historial de "Jugados recientemente" persistido en localStorage.
- Lista de "Favoritos" local para guardar apps y volver a ellas rápidamente.
- Empty state accionable con botón para limpiar filtros cuando no hay resultados.
- Diseño responsive para móvil y escritorio.
