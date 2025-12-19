# Zeabur 部署指南 (合併 Docker 方案)

本專案提供了一個專為 Zeabur 雲端部署設計的合併版 Dockerfile，解決了原先多階段建置依賴本地映像的問題。

## 部署說明

### 1. 使用 Dockerfile.zeabur
由於 Zeabur 需要在自身的環境中完成完整建置，請務必使用根目錄下的 `Dockerfile.zeabur`。

### 2. Zeabur 設定步驟
1. 在 Zeabur 服務面板中，進入 **Settings** -> **Build**。
2. **Docker Path**: 設定為 `Dockerfile.zeabur`。
3. **Docker Root**: 設定為 `/`。
4. 儲存設定並觸發 **Redeploy**。

## 為什麼要合併？
* **獨立性**：Zeabur 無法存取您本地建置的 `picsur-stage1` 映像，合併版能讓 Zeabur 自行完成編譯。
* **穩定性**：針對 Alpine 環境優化了 `sharp` 的安裝，避免了 C++ 連結錯誤。
* **高性能**：保留了從原始碼編譯 `libvips` 的邏輯，確保影像處理效能。

---
*上次更新日期: 2025-12-19*
