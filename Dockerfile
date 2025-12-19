# === STAGE 1: Build Javascript assets ===
FROM node:20-bookworm AS builder_stage1

RUN npm install -g pnpm
SHELL ["/bin/bash", "-c"]

ADD . /picsur
WORKDIR /picsur

# Install dependencies and build all packages
RUN pnpm install --frozen-lockfile
RUN pnpm --filter picsur-shared build
RUN pnpm --filter picsur-frontend build
RUN pnpm --filter picsur-backend build

# Prepare trimmed project structure
RUN mkdir -p /trimmed
RUN cp -r --parents ./{package.json,pnpm-lock.yaml,pnpm-workspace.yaml,branding} /trimmed
RUN cp -r --parents ./{frontend,backend,shared}/{dist,package.json} /trimmed

# === STAGE 2: Final runtime image ===
FROM node:20-bookworm-slim

# Install libvips and production dependencies
# Debian's libvips is well-optimized with glibc
RUN apt-get update && apt-get install -y \
    libvips-dev \
    python3 \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g pnpm

ENV PICSUR_PRODUCTION=true
WORKDIR /picsur

COPY --from=builder_stage1 /trimmed ./

# Install production dependencies
RUN pnpm install --frozen-lockfile --prod

EXPOSE 8080

# 優化影像處理併發與 API 回應速度
# UV_THREADPOOL_SIZE 設為 4 是在低配伺服器下平衡效能與穩定性的推薦值
CMD ["sh", "-c", "export PICSUR_PORT=${PORT:-8080} && export PICSUR_HOST=0.0.0.0 && export UV_THREADPOOL_SIZE=4 && pnpm --filter picsur-backend start:prod"]
