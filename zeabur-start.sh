#!/bin/bash

# Zeabur 啟動腳本
# 這個腳本會在 Zeabur 部署時執行

set -e

echo "=== Picsur Zeabur Startup Script ==="
echo "Node version: $(node --version)"
echo "pnpm version: $(pnpm --version)"

# 檢查必要的環境變數
echo "=== Checking Environment Variables ==="

if [ -z "$PICSUR_DB_HOST" ]; then
    echo "❌ ERROR: PICSUR_DB_HOST is not set"
    echo "Please set database environment variables in Zeabur dashboard"
    exit 1
fi

echo "✅ PICSUR_DB_HOST: $PICSUR_DB_HOST"
echo "✅ PICSUR_DB_PORT: ${PICSUR_DB_PORT:-5432}"
echo "✅ PICSUR_DB_DATABASE: ${PICSUR_DB_DATABASE:-picsur}"
echo "✅ PICSUR_PRODUCTION: ${PICSUR_PRODUCTION:-false}"
echo "✅ PICSUR_PORT: ${PICSUR_PORT:-8080}"

# 進入後端目錄
cd backend

echo "=== Starting Picsur Backend ==="
exec node dist/main.js
