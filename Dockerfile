# syntax=docker/dockerfile:1

# --- Build stage ---
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies first to leverage Docker layer caching
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

# Copy source and build the production bundle
COPY . .
RUN pnpm run build

# --- Production stage ---
FROM nginx:1.27-alpine AS production

# Copy the built assets and SPA nginx configuration
COPY --from=builder /app/dist/apps/web /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
