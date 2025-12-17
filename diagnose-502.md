# 🔍 Picsur 502 錯誤快速診斷指南

## ⚡ 快速檢查清單

在 Zeabur Dashboard 中按照以下順序檢查：

### 1️⃣ 資料庫服務狀態
```
□ PostgreSQL 服務狀態為 "Running"（綠色）
□ PostgreSQL 沒有錯誤日誌
□ PostgreSQL 已完全啟動（不是剛建立）
```

### 2️⃣ 環境變數設定
在應用程式服務的環境變數中確認：

```bash
# 必須設定的變數
✓ PICSUR_DB_HOST=${POSTGRES_HOST}
✓ PICSUR_DB_PORT=${POSTGRES_PORT}
✓ PICSUR_DB_USERNAME=${POSTGRES_USER}
✓ PICSUR_DB_PASSWORD=${POSTGRES_PASSWORD}
✓ PICSUR_DB_DATABASE=${POSTGRES_DATABASE}
✓ PICSUR_PRODUCTION=true
✓ PICSUR_HOST=0.0.0.0
✓ PICSUR_PORT=${PORT}
```

### 3️⃣ 查看應用程式日誌
在 Zeabur 服務頁面點擊 "Logs"，尋找以下訊息：

#### ✅ 成功的日誌應該包含：
```
Production: true
DB host: [你的資料庫主機]
DB port: 5432
DB database: picsur
Location: http://0.0.0.0:8080
```

#### ❌ 錯誤訊息對照表：

**運行時錯誤：**

| 錯誤訊息 | 原因 | 解決方案 |
|---------|------|---------|
| `Error: connect ECONNREFUSED` | 無法連接到資料庫 | 檢查資料庫是否啟動、環境變數是否正確 |
| `FATAL: database "picsur" does not exist` | 資料庫不存在 | Zeabur 應自動建立，等待或重啟資料庫服務 |
| `password authentication failed` | 資料庫密碼錯誤 | 檢查 PICSUR_DB_PASSWORD 是否正確映射 |
| `listen EADDRINUSE` | Port 被占用 | 檢查 PICSUR_PORT 設定，應該是 ${PORT} |
| `Cannot find module` | 建置失敗或模組遺失 | 查看建置日誌，確認所有套件都已建置 |
| `UnhandledPromiseRejectionWarning` | 通常是資料庫或配置問題 | 查看完整錯誤堆疊 |

**建置錯誤：**

| 錯誤訊息 | 原因 | 解決方案 |
|---------|------|---------|
| `cannot access 'xxx.sh': No such file or directory` | 腳本文件在容器中不存在 | 已修復：使用 zbpack.json 內聯命令 |
| `pnpm: command not found` | pnpm 未安裝 | zbpack.json 已指定 node_version，應自動安裝 |
| `Build timed out` | 建置時間過長 | 可能是依賴安裝問題，重試部署 |
| `ERROR: failed to solve` | Docker 建置失敗 | 檢查 Zeabur 建置日誌的詳細錯誤 |

---

## 🔧 常見 502 場景與解決方案

### 場景 1：建置失敗 - 找不到腳本文件
**錯誤訊息**：`chmod: cannot access 'zeabur-build.sh': No such file or directory`
**原因**：Zeabur 使用 Docker 建置，外部腳本未被複製到容器中
**解決**：✅ 已修復！最新版本的 `zbpack.json` 使用內聯命令，不再依賴外部腳本

**確認修復**：檢查 `zbpack.json` 內容應為：
```json
{
  "build_command": "pnpm install --frozen-lockfile && pnpm --filter picsur-shared build && pnpm --filter picsur-frontend build && pnpm --filter picsur-backend build",
  "start_command": "cd backend && node dist/main.js",
  "node_version": "20"
}
```

### 場景 2：剛創建服務就出現 502
**原因**：資料庫還在初始化中
**解決**：等待 1-2 分鐘，PostgreSQL 需要時間完全啟動

### 場景 3：建置成功但啟動失敗
**原因**：環境變數未正確設定
**解決**：
1. 檢查所有 `PICSUR_*` 環境變數
2. 確認變數使用 `${...}` 語法引用 PostgreSQL 變數
3. 儲存後重新部署

### 場景 4：之前能用現在不能用
**原因**：可能是資料庫連接問題或記憶體不足
**解決**：
1. 重啟 PostgreSQL 服務
2. 重啟應用程式服務
3. 檢查 Zeabur 服務資源使用量

### 場景 5：本地可以運行，Zeabur 不行
**原因**：環境變數差異或建置配置問題
**解決**：
1. 確認 `PICSUR_PRODUCTION=true` 已設定
2. 檢查 Node.js 版本是否一致（應為 20）
3. 確認 pnpm 版本（應為 9.6.0）

---

## 📊 診斷命令

如果 Zeabur 提供 Terminal 訪問，可以執行：

### 檢查環境變數
```bash
env | grep PICSUR
env | grep POSTGRES
```

### 測試資料庫連接
```bash
# 安裝 pg client（如果需要）
apt-get update && apt-get install -y postgresql-client

# 測試連接
psql -h $PICSUR_DB_HOST -p $PICSUR_DB_PORT -U $PICSUR_DB_USERNAME -d $PICSUR_DB_DATABASE
```

### 檢查應用程式狀態
```bash
# 檢查 Node.js 進程
ps aux | grep node

# 檢查 Port 監聽
netstat -tlnp | grep $PICSUR_PORT
```

---

## 🚨 緊急修復步驟

如果以上都無法解決，嘗試以下步驟：

### 步驟 1：完全重置
1. 刪除應用程式服務（保留資料庫）
2. 重新建立應用程式服務
3. 重新設定所有環境變數
4. 連接到同一個 PostgreSQL 服務

### 步驟 2：資料庫重置（⚠️ 會刪除所有資料）
1. 刪除 PostgreSQL 服務
2. 重新建立 PostgreSQL 服務
3. 重新設定應用程式的環境變數
4. 重新部署

### 步驟 3：本地測試（複製 Zeabur 建置流程）
```bash
# Clone repository
git clone [your-repo]
cd picsur

# 啟動本地資料庫
docker-compose -f support/dev.docker-compose.yml up -d

# 完全按照 Zeabur 的建置命令
pnpm install --frozen-lockfile
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

# 啟動（與 Zeabur 相同的命令）
cd backend
node dist/main.js
```

如果本地測試成功但 Zeabur 失敗，問題通常是環境變數配置。

---

## ✅ 成功部署的標誌

當部署成功時，你應該看到：

### 日誌輸出
```
[NestApplication] Nest application successfully started
Production: true
DB host: [database-host]
Location: http://0.0.0.0:8080
```

### 網頁訪問
- ✅ 訪問域名可以看到 Picsur 首頁
- ✅ 可以看到 Logo 和登入按鈕
- ✅ 語言切換按鈕可以使用（地球圖示）
- ✅ 可以切換繁體中文和 English

---

## 📞 仍然需要幫助？

如果以上步驟都無法解決問題，請提供以下資訊：

1. ✅ 完整的錯誤日誌（從 Zeabur Logs）
2. ✅ 環境變數設定截圖（記得隱藏敏感資訊）
3. ✅ PostgreSQL 服務狀態
4. ✅ 建置日誌
5. ✅ 嘗試過的解決步驟

將這些資訊提供給支援團隊可以更快速地診斷問題。

---

## 🎯 預防措施

為了避免未來出現 502 錯誤：

1. **環境變數範本**：保存一份正確的環境變數設定作為範本
2. **定期備份**：定期備份 PostgreSQL 資料庫
3. **監控**：設定 Zeabur 的監控和告警
4. **版本控制**：記錄每次部署的版本和配置變更
5. **測試環境**：在正式環境之外維護一個測試環境

記住：大部分 502 錯誤都是由於環境變數配置不正確或資料庫連接問題造成的！
