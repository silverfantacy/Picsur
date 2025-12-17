# Picsur 多國語言實作說明

本專案已實作多國語言支援，預設語言為**繁體中文（zh-TW）**，並支援**英文（en）**切換。

## 📦 安裝的套件

- `@ngx-translate/core` ^17.0.0 - Angular 翻譯核心
- `@ngx-translate/http-loader` ^17.0.0 - HTTP 載入器

## 🗂️ 檔案結構

```
frontend/
├── src/
│   ├── app/
│   │   ├── app.module.ts                    # 已設定 TranslateModule
│   │   ├── app.component.ts                  # 已初始化預設語言
│   │   ├── i18n/
│   │   │   ├── permissions.i18n.ts          # 權限翻譯 key
│   │   │   ├── sys-pref.i18n.ts            # 系統偏好設定翻譯 key
│   │   │   └── usr-pref.i18n.ts            # 使用者偏好設定翻譯 key
│   │   └── services/
│   │       └── language/
│   │           └── language.service.ts      # 語言切換服務
│   └── assets/
│       └── i18n/
│           ├── zh-TW.json                    # 繁體中文翻譯
│           └── en.json                       # 英文翻譯
```

## 🎯 已完成的功能

### 1. 基礎架構設定
- ✅ 安裝 ngx-translate 套件
- ✅ 設定 app.module.ts 使用 TranslateModule
- ✅ 設定預設語言為繁體中文（zh-TW）
- ✅ 從 localStorage 讀取/儲存使用者語言偏好

### 2. 翻譯檔案
已建立完整的繁體中文和英文翻譯檔案，包含：
- 應用程式基本資訊
- 通用按鈕和操作
- 導航選單
- 上傳功能
- 設定頁面
- 系統偏好設定
- 使用者偏好設定
- 權限項目
- 角色管理
- 使用者管理
- 語言選擇

### 3. 語言服務
建立 `LanguageService` 提供：
- `getCurrentLanguage()` - 取得當前語言
- `getAvailableLanguages()` - 取得可用語言列表
- `switchLanguage(lang)` - 切換語言
- `getLanguageDisplayName(lang)` - 取得語言顯示名稱

### 4. i18n 檔案重構
將既有的 i18n 檔案改為使用翻譯 key：
- `PermissionI18nKeys` - 權限翻譯 key 映射
- `SysPreferenceI18nKeys` - 系統偏好設定翻譯 key 映射
- `UsrPreferenceI18nKeys` - 使用者偏好設定翻譯 key 映射
- 保留舊的導出名稱以維持向後相容性

## 📝 使用方式

### 在 Component TypeScript 中使用

```typescript
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html'
})
export class ExampleComponent {
  constructor(private translate: TranslateService) {
    // 直接取得翻譯文字
    this.translate.get('COMMON.SAVE').subscribe((text: string) => {
      console.log(text); // 輸出: "儲存" (zh-TW) 或 "Save" (en)
    });
  }
}
```

### 在 Template HTML 中使用

```html
<!-- 使用 translate pipe -->
<button>{{ 'COMMON.SAVE' | translate }}</button>

<!-- 使用 translate directive -->
<p translate>COMMON.LOADING</p>

<!-- 帶參數的翻譯 -->
<p>{{ 'MESSAGES.WELCOME' | translate: {name: username} }}</p>
```

### 切換語言

```typescript
import { LanguageService } from './services/language/language.service';

export class HeaderComponent {
  constructor(private languageService: LanguageService) {}

  switchToEnglish() {
    this.languageService.switchLanguage('en');
  }

  switchToChinese() {
    this.languageService.switchLanguage('zh-TW');
  }

  getCurrentLanguage() {
    return this.languageService.getCurrentLanguage();
  }
}
```

## 🔧 後續建議工作

### 短期
1. **修復 Webpack 配置問題** - 目前有 webpack 配置錯誤需要修正
2. **在 Header 添加語言切換按鈕** - 讓使用者可以輕鬆切換語言
3. **更新現有 Components** - 將硬編碼的文字替換為翻譯 key

### 中期
1. **擴充翻譯檔案** - 將更多頁面的文字加入翻譯檔案
2. **錯誤訊息國際化** - 將 API 錯誤訊息也納入多國語言
3. **表單驗證訊息** - 將表單驗證錯誤訊息國際化

### 長期
1. **支援更多語言** - 如簡體中文、日文、韓文等
2. **日期時間格式化** - 根據語言調整日期時間顯示格式
3. **數字格式化** - 根據地區調整數字、貨幣顯示格式

## 🎨 添加新語言

要添加新語言（例如日文）：

1. 在 `frontend/src/assets/i18n/` 建立 `ja.json`
2. 複製 `zh-TW.json` 或 `en.json` 的結構
3. 翻譯所有文字為日文
4. 在 `app.component.ts` 的 constructor 中添加：
   ```typescript
   this.translate.addLangs(['zh-TW', 'en', 'ja']);
   ```
5. 在 `LanguageService` 更新 `availableLanguages` 和 `getLanguageDisplayName()`

## 📚 參考資源

- [ngx-translate 官方文件](https://github.com/ngx-translate/core)
- [Angular i18n Guide](https://angular.io/guide/i18n)
- [ICU Message Format](http://userguide.icu-project.org/formatparse/messages)

## ⚠️ 已知問題與修復

### 已修復的問題 ✅

#### 1. Webpack 配置錯誤
**問題**：`pnpm run build` 出現 `Invalid configuration object` 錯誤

**解決方案**：由於專案使用 `"type": "module"`，webpack 配置檔必須使用 CommonJS 格式：
```javascript
// custom-webpack.config.cjs (改為 .cjs 副檔名)
const webpack = require('webpack');
module.exports = {
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-tw/),
  ],
};
```

#### 2. TranslateHttpLoader 建構子錯誤
**問題**：`Expected 0 arguments, but got 3` - ngx-translate/http-loader v17 的建構子不再接受參數

**解決方案**：改用 `TRANSLATE_HTTP_LOADER_CONFIG` 注入 token 來配置：
```typescript
// app.module.ts
import { TRANSLATE_HTTP_LOADER_CONFIG } from '@ngx-translate/http-loader';

export function createTranslateLoader(): TranslateHttpLoader {
  return new TranslateHttpLoader(); // 不再傳入參數
}

@NgModule({
  providers: [
    {
      provide: TRANSLATE_HTTP_LOADER_CONFIG,
      useValue: {
        prefix: './assets/i18n/',
        suffix: '.json',
      },
    },
  ],
})
```

### 其他注意事項

1. **向後相容性** - 為了避免破壞現有功能，i18n 檔案保留了舊的導出名稱，待全面測試後可逐步移除

## 📄 授權

與主專案相同，遵循 GPL-3.0 授權。
