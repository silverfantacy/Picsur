import { SysPreference } from 'picsur-shared/dist/dto/sys-preferences.enum';

export const SysPreferenceUI: {
  [key in SysPreference]: {
    name: string;
    helpText: string;
    category: string;
  };
} = {
  [SysPreference.HostOverride]: {
    name: '主機覆蓋',
    helpText: '覆蓋伺服器的主機名稱，當您從不同網域存取伺服器時很有用。',
    category: '一般',
  },

  [SysPreference.RemoveDerivativesAfter]: {
    name: '快取圖片過期時間',
    helpText: '快取轉換圖片被刪除前的時間。這不會影響原始圖片。較短的快取時間可節省磁碟空間但會消耗更多 CPU。設為 0 則停用。',
    category: '圖片處理',
  },
  [SysPreference.AllowEditing]: {
    name: '允許編輯圖片',
    helpText: '允許編輯圖片（例如調整大小、翻轉）。使用這些功能會消耗更多 CPU 資源。',
    category: '圖片處理',
  },
  [SysPreference.ConversionTimeLimit]: {
    name: '轉換/編輯時間限制',
    helpText: '轉換/編輯圖片的時間限制。在低效能裝置上可能需要增加此值。',
    category: '圖片處理',
  },
  [SysPreference.ConversionMemoryLimit]: {
    name: '轉換/編輯記憶體限制 (MB)',
    helpText: '轉換/編輯圖片的記憶體限制。只有在儲存超大圖片時才需要增加此值。',
    category: '圖片處理',
  },

  [SysPreference.JwtSecret]: {
    name: 'JWT 密鑰',
    helpText: '用於簽署 JWT 驗證令牌的密鑰。',
    category: '身份驗證',
  },
  [SysPreference.JwtExpiresIn]: {
    name: 'JWT 過期時間',
    helpText: 'JWT 驗證令牌過期前的時間。',
    category: '身份驗證',
  },
  [SysPreference.BCryptStrength]: {
    name: 'BCrypt 強度',
    helpText: 'BCrypt 雜湊演算法的強度，建議設為 10。如果在低效能裝置上運行請降低此值。',
    category: '身份驗證',
  },

  [SysPreference.EnableTracking]: {
    name: '啟用 Ackee 網站追蹤',
    helpText: '使用 Ackee 啟用網站使用追蹤。您需要設定追蹤 URL 和 ID。',
    category: '使用情況',
  },
  [SysPreference.TrackingUrl]: {
    name: 'Ackee 追蹤 URL',
    helpText: 'Ackee 追蹤伺服器的 URL。請求會被代理，因此請確保處理 X-Forwarded-For 標頭。',
    category: '使用情況',
  },
  [SysPreference.TrackingId]: {
    name: 'Ackee 追蹤網站 ID',
    helpText: '要追蹤的網站 ID。',
    category: '使用情況',
  },

  [SysPreference.EnableTelemetry]: {
    name: '啟用系統遙測',
    helpText: '啟用系統遙測，這將向開發者發送匿名使用資料。',
    category: '使用情況',
  },
};
