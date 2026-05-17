# =========================================================
# Mr KN Portfolio — Production Dockerfile
# Multi-stage build: Node builder + Nginx Alpine runtime
# =========================================================

# ----- Stage 1: Build -----
# Pin to specific minor for reproducible builds
FROM node:20.19-alpine AS builder

# Set non-interactive npm and disable telemetry
ENV NODE_ENV=development \
    NPM_CONFIG_LOGLEVEL=warn \
    NG_CLI_ANALYTICS=false \
    CI=true

WORKDIR /build

# Copy only manifest first to maximise Docker layer cache
COPY package.json package-lock.json* ./

# Use npm ci for reproducible installs; --no-audit/--no-fund speed up CI
# --ignore-scripts protects against post-install supply-chain attacks
RUN npm ci --no-audit --no-fund --ignore-scripts

# Copy source after deps (better cache)
COPY tsconfig*.json angular.json karma.conf.js eslint.config.js ./
COPY src ./src
COPY public ./public

# Production build, base-href = / for the container deploy
RUN npm run build:docker

# Strip source maps and dev artifacts if any slipped through
RUN find dist/mr-kn-portfolio/browser -name "*.map" -type f -delete

# ----- Stage 2: Runtime -----
# nginxinc/nginx-unprivileged runs as non-root by default (UID 101).
# Pin the image digest in production for supply-chain integrity.
FROM nginxinc/nginx-unprivileged:1.27-alpine AS runtime

# Add image metadata (OCI labels)
LABEL org.opencontainers.image.title="Mr KN Portfolio" \
      org.opencontainers.image.description="Full-stack engineer portfolio (Angular 21)" \
      org.opencontainers.image.licenses="MIT" \
      org.opencontainers.image.source="https://github.com/mrkn/mr-kn-portfolio"

# Switch to root only to copy config, then back to nginx user
USER root

# Remove default nginx config and html
RUN rm -rf /etc/nginx/conf.d/default.conf /usr/share/nginx/html/*

# Copy our hardened nginx config
COPY --chown=nginx:nginx nginx/nginx.conf /etc/nginx/nginx.conf
COPY --chown=nginx:nginx nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder --chown=nginx:nginx /build/dist/mr-kn-portfolio/browser /usr/share/nginx/html

# SPA fallback: copy index.html as 404.html for Angular client-side routing
RUN cp /usr/share/nginx/html/index.html /usr/share/nginx/html/404.html \
    && chown nginx:nginx /usr/share/nginx/html/404.html

# Drop privileges
USER nginx

# Unprivileged image listens on 8080 (not 80) — no NET_BIND_SERVICE capability needed
EXPOSE 8080

# Healthcheck: hit the SPA fallback to confirm Nginx is serving
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:8080/ || exit 1

# Use exec form so nginx receives signals correctly (graceful shutdown)
CMD ["nginx", "-g", "daemon off;"]
