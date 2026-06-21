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

## 🚀 Cómo ejecutar el MVP localmente

El MVP es una aplicación frontend pura (HTML, CSS y JavaScript) sin dependencias externas obligatorias.

### Opción 1: Abrir directamente

Abre `index.html` en tu navegador.

### Opción 2: Servidor local

```bash
# Con Python
python3 -m http.server 8080

# O con Node.js
npx serve .
```

Luego visita `http://localhost:8080`.

## 🗂️ Estructura del MVP

```
.
├── index.html   # Estructura y accesibilidad
├── styles.css   # Tema, layout responsive y componentes
├── app.js       # Catálogo, filtros, búsqueda y reproductor
└── readme.md    # Este archivo
```

## ✨ Funcionalidades actuales

- Catálogo de ejemplo con 12 apps/juegos.
- Búsqueda en tiempo real.
- Filtro por categoría.
- Sección de tendencias.
- Reproductor embebido en iframe sandboxed.
- Pantalla completa y cierre con tecla `Esc`.
- Diseño responsive para móvil y escritorio.
