#!/bin/bash

# Zeabur 建置腳本
# 這個腳本會在 Zeabur 部署時執行建置

set -e

echo "=== Picsur Zeabur Build Script ==="
echo "Node version: $(node --version)"
echo "pnpm version: $(pnpm --version)"

# 安裝依賴
echo "=== Installing dependencies ==="
pnpm install --frozen-lockfile

# 建置 shared
echo "=== Building picsur-shared ==="
pnpm --filter picsur-shared build

# 建置 frontend
echo "=== Building picsur-frontend ==="
pnpm --filter picsur-frontend build

# 建置 backend
echo "=== Building picsur-backend ==="
pnpm --filter picsur-backend build

echo "=== Build completed successfully ==="
