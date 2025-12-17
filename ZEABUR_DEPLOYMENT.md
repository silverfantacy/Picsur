# Zeabur 部署指南

## 🔍 502 錯誤診斷與解決方案

### 常見 502 錯誤原因

1. **資料庫連接失敗** ⚠️ 最常見原因
2. **環境變數未正確設定**
3. **Port 綁定錯誤**
4. **建置失敗**
5. **記憶體不足**

---

## ✅ 部署檢查清單

### 1. PostgreSQL 資料庫設定

在 Zeabur 中：
1. 新增 **PostgreSQL** 服務
2. 等待資料庫完全啟動（狀態為 Running）
3. 資料庫會自動設定以下環境變數：
   - `POSTGRES_HOST`
   - `POSTGRES_PORT`
   - `POSTGRES_USER`
   - `POSTGRES_PASSWORD`
   - `POSTGRES_DATABASE`

### 2. 環境變數映射

Picsur 使用 `PICSUR_` 前綴，需要手動映射 Zeabur 的環境變數：

```bash
# 在 Zeabur 環境變數設定中添加：

# 資料庫連接（映射 PostgreSQL 服務的變數）
PICSUR_DB_HOST=${POSTGRES_HOST}
PICSUR_DB_PORT=${POSTGRES_PORT}
PICSUR_DB_USERNAME=${POSTGRES_USER}
PICSUR_DB_PASSWORD=${POSTGRES_PASSWORD}
PICSUR_DB_DATABASE=${POSTGRES_DATABASE}

# 應用程式設定
PICSUR_PRODUCTION=true
PICSUR_HOST=0.0.0.0
PICSUR_PORT=${PORT}

# 可選設定
PICSUR_VERBOSE=false
PICSUR_TELEMETRY=true
```

### 3. 建置設定

專案已配置 `zbpack.json` 文件，Zeabur 會自動使用：

```json
{
  "build_command": "pnpm install --frozen-lockfile && pnpm --filter picsur-shared build && pnpm --filter picsur-frontend build && pnpm --filter picsur-backend build",
  "start_command": "cd backend && node dist/main.js",
  "node_version": "20"
}
```

建置流程：
1. 安裝所有依賴（使用 pnpm workspace）
2. 依序建置：shared → frontend → backend
3. 啟動後端服務

**無需手動配置建置命令**，Zeabur 會自動讀取 `zbpack.json`

### 4. 檢查 Node.js 版本

確保使用正確的 Node.js 版本。在 Zeabur 中可以透過環境變數設定：

```bash
NODE_VERSION=20
```

或在專案根目錄創建 `.nvmrc`：

```
20
```

---

## 🔧 502 錯誤偵錯步驟

### 步驟 1：檢查日誌

在 Zeabur Dashboard 中：
1. 點擊服務查看 **Logs**
2. 尋找錯誤訊息：
   - `Error: connect ECONNREFUSED` → 資料庫連接失敗
   - `UnhandledPromiseRejectionWarning` → 可能是資料庫或配置問題
   - `FATAL: database does not exist` → 資料庫尚未建立
   - `Error: listen EADDRINUSE` → Port 已被佔用

### 步驟 2：驗證環境變數

執行以下命令檢查環境變數（在 Zeabur Terminal）：

```bash
echo $PICSUR_DB_HOST
echo $PICSUR_DB_PORT
echo $PICSUR_PRODUCTION
echo $PICSUR_PORT
```

### 步驟 3：檢查資料庫連接

確認 PostgreSQL 服務：
1. 狀態為 **Running**
2. 沒有錯誤日誌
3. 可以從應用程式容器連接到資料庫

### 步驟 4：手動測試建置

在本地測試建置（複製 Zeabur 的建置流程）：

```bash
# 安裝依賴
pnpm install --frozen-lockfile

# 建置專案（與 Zeabur 相同的順序）
pnpm --filter picsur-shared build
pnpm --filter picsur-frontend build
pnpm --filter picsur-backend build

# 設定環境變數
export PICSUR_PRODUCTION=true
export PICSUR_DB_HOST=localhost
export PICSUR_DB_PORT=5432
export PICSUR_DB_USERNAME=picsur
export PICSUR_DB_PASSWORD=picsur
export PICSUR_DB_DATABASE=picsur
export PICSUR_PORT=8080

# 啟動後端（與 Zeabur 相同的命令）
cd backend
node dist/main.js
```

---

## 📋 完整環境變數列表

### 必需的環境變數

| 變數名稱 | 說明 | 預設值 | Zeabur 設定 |
|---------|------|--------|-------------|
| `PICSUR_DB_HOST` | 資料庫主機 | localhost | `${POSTGRES_HOST}` |
| `PICSUR_DB_PORT` | 資料庫 Port | 5432 | `${POSTGRES_PORT}` |
| `PICSUR_DB_USERNAME` | 資料庫用戶 | picsur | `${POSTGRES_USER}` |
| `PICSUR_DB_PASSWORD` | 資料庫密碼 | picsur | `${POSTGRES_PASSWORD}` |
| `PICSUR_DB_DATABASE` | 資料庫名稱 | picsur | `${POSTGRES_DATABASE}` |
| `PICSUR_PRODUCTION` | 生產模式 | false | `true` |
| `PICSUR_HOST` | 綁定主機 | 0.0.0.0 | `0.0.0.0` |
| `PICSUR_PORT` | 應用程式 Port | 8080 | `${PORT}` |

### 可選的環境變數

| 變數名稱 | 說明 | 預設值 |
|---------|------|--------|
| `PICSUR_VERBOSE` | 詳細日誌 | false |
| `PICSUR_TELEMETRY` | 遙測統計 | true |
| `PICSUR_DEMO` | Demo 模式 | false |
| `PICSUR_DEMO_INTERVAL` | 清理間隔 | 300000 |

---

## 🚀 快速部署步驟

### 方法 1：使用 Zeabur Template（推薦）

1. 在 Zeabur 創建新專案
2. 新增 **PostgreSQL** 服務
3. 新增 **Git** 服務，連接你的 Repository
4. 在 Git 服務的環境變數中設定：

```env
PICSUR_DB_HOST=${POSTGRES_HOST}
PICSUR_DB_PORT=${POSTGRES_PORT}
PICSUR_DB_USERNAME=${POSTGRES_USER}
PICSUR_DB_PASSWORD=${POSTGRES_PASSWORD}
PICSUR_DB_DATABASE=${POSTGRES_DATABASE}
PICSUR_PRODUCTION=true
PICSUR_HOST=0.0.0.0
PICSUR_PORT=${PORT}
```

5. 儲存並等待自動部署

### 方法 2：手動設定

1. Fork 或 Clone 此 Repository
2. 在 Zeabur 新增服務
3. 選擇 PostgreSQL 並等待啟動完成
4. 選擇 Git Repository
5. 設定環境變數（參考上方）
6. 手動觸發部署

---

## ⚠️ 常見問題

### Q1: 為什麼一直顯示 502？

**A**: 最常見的原因是資料庫連接失敗。檢查：
1. PostgreSQL 服務是否正常運行
2. 環境變數 `PICSUR_DB_*` 是否正確設定
3. 查看應用程式日誌中的錯誤訊息

### Q2: 建置成功但無法啟動

**A**: 檢查：
1. `PICSUR_PRODUCTION` 是否設為 `true`
2. Port 綁定是否正確（`PICSUR_PORT=${PORT}`）
3. 資料庫 migration 是否執行成功

### Q3: 資料庫連接超時

**A**: Zeabur 的 PostgreSQL 可能需要一些時間啟動。解決方案：
1. 等待資料庫完全啟動
2. 重新部署應用程式
3. 確認網路連接沒有被防火牆阻擋

### Q4: Migration 失敗

**A**:
1. 確認 `PICSUR_PRODUCTION=true` 已設定
2. 檢查資料庫權限
3. 手動執行 migration（如果需要）

---

## 📞 需要幫助？

如果仍然遇到問題：

1. **檢查日誌**：複製完整的錯誤日誌
2. **驗證環境變數**：截圖環境變數設定
3. **資料庫狀態**：確認 PostgreSQL 服務狀態
4. **建置輸出**：查看建置過程是否有錯誤

---

## ✨ 成功部署後

部署成功後，你應該能夠：

1. 訪問應用程式首頁
2. 看到 Picsur Logo
3. 可以註冊/登入
4. 可以上傳圖片
5. 語言切換功能正常（繁體中文/English）

預設管理員帳號會在首次啟動時建立，請查看日誌獲取初始密碼。
