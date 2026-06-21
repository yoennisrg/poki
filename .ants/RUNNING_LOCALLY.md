# Correr Hormigas Localmente

## Prerequisitos

- Docker instalado y corriendo
- Acceso SSH configurado (`~/.ssh/`)
- Cuenta de GitHub con permisos al repo

## 1. Crear el archivo `.env`

Crea un archivo `.env` en la raíz del proyecto (`poki/.env`):

```env
REPOSITORY=yoennisrg/poki
BRANCH=main
ANTS_MODEL=opencode-go/kimi-k2.7-code
OPENCODE_API_KEY=sk-...
BRAVE_API_KEY=...
```

Variables disponibles:
- `REPOSITORY` — owner/repo de GitHub (sin https://)
- `BRANCH` — rama base desde donde trabaja la hormiga (default: main)
- `ANTS_MODEL` — modelo a usar. Opciones Go disponibles:
  - `opencode-go/kimi-k2.7-code` (recomendado para código)
  - `opencode-go/deepseek-v4-pro`
  - `opencode-go/qwen3.7-plus`
  - `opencode-go/deepseek-v4-flash` (más rápido, más barato)
- `OPENCODE_API_KEY` — tu API key de opencode.ai/auth (plan Go)
- `BRAVE_API_KEY` — API key de Brave Search (opcional)

## 2. Construir la imagen base

Solo necesitas hacerlo la primera vez o cuando cambies el `body` o `awaken.sh`:

```bash
docker build -t ants-base -f .ants/body .ants
```

## 3. Lanzar una hormiga

```bash
bash .ants/spawn.sh <nombre>
```

Ejemplos:
```bash
bash .ants/spawn.sh uma
bash .ants/spawn.sh carol
bash .ants/spawn.sh kael
```

Hormigas disponibles: `atlas`, `carol`, `echo`, `fiona`, `kael`, `lyra`, `nova`, `piper`, `uma`, `vesper`

## 4. Ver logs en tiempo real

```bash
docker logs -f ants-<nombre>-<timestamp>
```

O busca el ID del contenedor:
```bash
docker ps | grep ants
docker logs -f <container-id>
```

## 5. Limpiar contenedores terminados

```bash
docker rm $(docker ps -a --filter "name=ants-" --filter "status=exited" -q)
```

## Notas

- Cada hormiga clona el repo fresco en el contenedor — necesita acceso SSH o token de GitHub
- `spawn.sh` monta `~/.ssh` como volumen read-only para el clone inicial
- La hormiga crea su propia rama y abre un draft PR antes de tocar código (protocolo instinct.md)
- Si la hormiga ya tiene 2 PRs abiertos, el kill-switch la detiene automáticamente
