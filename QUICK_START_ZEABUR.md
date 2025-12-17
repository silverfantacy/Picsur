# ⚡ Zeabur 快速部署指南

> 5 分鐘內完成 Picsur 部署！

## 📋 前置準備

- ✅ Zeabur 帳號
- ✅ GitHub Repository（已 fork 或 clone）

---

## 🚀 部署步驟

### 第 1 步：創建新專案

1. 登入 [Zeabur Dashboard](https://zeabur.com)
2. 點擊 **Create Project**
3. 輸入專案名稱，例如 "picsur"

### 第 2 步：新增 PostgreSQL 服務

1. 在專案中點擊 **Add Service**
2. 選擇 **Marketplace**
3. 搜尋並選擇 **PostgreSQL**
4. 等待服務完全啟動（狀態變為綠色 Running）

### 第 3 步：新增 Git 服務

1. 點擊 **Add Service** → **Git**
2. 選擇你的 Picsur Repository
3. Zeabur 會自動檢測並開始建置

### 第 4 步：設定環境變數

在 Git 服務的 **Variables** 頁籤中，添加以下環境變數：

```bash
# 資料庫連接（必須）
PICSUR_DB_HOST=${POSTGRES_HOST}
PICSUR_DB_PORT=${POSTGRES_PORT}
PICSUR_DB_USERNAME=${POSTGRES_USER}
PICSUR_DB_PASSWORD=${POSTGRES_PASSWORD}
PICSUR_DB_DATABASE=${POSTGRES_DATABASE}

# 應用程式設定（必須）
PICSUR_PRODUCTION=true
PICSUR_HOST=0.0.0.0
PICSUR_PORT=${PORT}

# 可選設定
PICSUR_VERBOSE=false
PICSUR_TELEMETRY=true
```

**重要提示**：
- ✅ 變數名稱完全照抄，包括 `${...}` 部分
- ✅ `${POSTGRES_HOST}` 會自動引用 PostgreSQL 服務的主機名稱
- ✅ `${PORT}` 會自動設定為 Zeabur 分配的端口

### 第 5 步：儲存並部署

1. 點擊 **Save** 儲存環境變數
2. Zeabur 會自動重新部署
3. 等待建置完成（約 2-3 分鐘）

### 第 6 步：綁定域名

1. 在服務的 **Networking** 頁籤
2. 點擊 **Generate Domain** 或綁定自定義域名
3. 訪問生成的域名

---

## ✅ 驗證部署成功

訪問你的域名，應該看到：

- ✅ Picsur Logo 和首頁
- ✅ 登入/註冊按鈕
- ✅ 語言切換器（地球圖示 🌐）
- ✅ 可以切換繁體中文和 English

---

## 🔧 如果遇到問題

### 問題 1：顯示 502 Bad Gateway

**可能原因**：環境變數未正確設定或資料庫未啟動

**解決方案**：
1. 檢查 PostgreSQL 服務狀態是否為 Running
2. 確認所有環境變數都已設定
3. 查看服務的 Logs 頁籤，找出錯誤訊息
4. 參考 `diagnose-502.md` 進行詳細診斷

### 問題 2：建置失敗

**可能原因**：依賴安裝或建置過程出錯

**解決方案**：
1. 查看 Build Logs
2. 確認 `zbpack.json` 文件存在且內容正確
3. 重試部署

### 問題 3：語言無法切換

**可能原因**：前端建置不完整

**解決方案**：
1. 檢查建置日誌中 frontend 建置是否成功
2. 重新部署

---

## 📚 詳細文檔

遇到問題？查看完整文檔：

- 📖 **完整部署指南**：`ZEABUR_DEPLOYMENT.md`
- 🔍 **502 錯誤診斷**：`diagnose-502.md`
- 🔧 **環境變數說明**：`.env.example`

---

## 💡 進階設定

### 自定義域名

在 Networking 頁籤中：
1. 點擊 **Add Custom Domain**
2. 輸入你的域名
3. 按照指示設定 DNS

### 備份資料庫

定期備份 PostgreSQL 資料：
1. 使用 Zeabur 的備份功能
2. 或使用 `pg_dump` 手動備份

### 監控和告警

設定 Zeabur 監控：
1. 在專案設定中啟用監控
2. 設定告警條件
3. 接收異常通知

---

## 🎉 部署完成！

恭喜！你的 Picsur 已成功部署到 Zeabur。

**下一步**：
- 🔐 建立管理員帳號（查看日誌獲取初始密碼）
- 📸 開始上傳圖片
- 🌐 測試語言切換功能
- 📱 分享你的圖片連結

---

## ❓ 需要幫助？

如果仍有問題：

1. 📋 複製完整的錯誤日誌
2. 📸 截圖環境變數設定
3. 📊 檢查服務狀態
4. 📖 查看詳細文檔

記住：**90% 的 502 錯誤都是環境變數配置問題**！
