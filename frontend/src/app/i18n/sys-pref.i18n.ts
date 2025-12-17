import { SysPreference } from 'picsur-shared/dist/dto/sys-preferences.enum';

// 注意: 此檔案現在使用 i18n key，實際文字在 assets/i18n/*.json
export const SysPreferenceI18nKeys: {
  [key in SysPreference]: {
    nameKey: string;
    helpKey: string;
    categoryKey: string;
  };
} = {
  [SysPreference.HostOverride]: {
    nameKey: 'SYSTEM_PREFERENCES.HOST_OVERRIDE.NAME',
    helpKey: 'SYSTEM_PREFERENCES.HOST_OVERRIDE.HELP',
    categoryKey: 'SYSTEM_PREFERENCES.HOST_OVERRIDE.CATEGORY',
  },

  [SysPreference.RemoveDerivativesAfter]: {
    nameKey: 'SYSTEM_PREFERENCES.REMOVE_DERIVATIVES_AFTER.NAME',
    helpKey: 'SYSTEM_PREFERENCES.REMOVE_DERIVATIVES_AFTER.HELP',
    categoryKey: 'SYSTEM_PREFERENCES.REMOVE_DERIVATIVES_AFTER.CATEGORY',
  },
  [SysPreference.AllowEditing]: {
    nameKey: 'SYSTEM_PREFERENCES.ALLOW_EDITING.NAME',
    helpKey: 'SYSTEM_PREFERENCES.ALLOW_EDITING.HELP',
    categoryKey: 'SYSTEM_PREFERENCES.ALLOW_EDITING.CATEGORY',
  },
  [SysPreference.ConversionTimeLimit]: {
    nameKey: 'SYSTEM_PREFERENCES.CONVERSION_TIME_LIMIT.NAME',
    helpKey: 'SYSTEM_PREFERENCES.CONVERSION_TIME_LIMIT.HELP',
    categoryKey: 'SYSTEM_PREFERENCES.CONVERSION_TIME_LIMIT.CATEGORY',
  },
  [SysPreference.ConversionMemoryLimit]: {
    nameKey: 'SYSTEM_PREFERENCES.CONVERSION_MEMORY_LIMIT.NAME',
    helpKey: 'SYSTEM_PREFERENCES.CONVERSION_MEMORY_LIMIT.HELP',
    categoryKey: 'SYSTEM_PREFERENCES.CONVERSION_MEMORY_LIMIT.CATEGORY',
  },

  [SysPreference.JwtSecret]: {
    nameKey: 'SYSTEM_PREFERENCES.JWT_SECRET.NAME',
    helpKey: 'SYSTEM_PREFERENCES.JWT_SECRET.HELP',
    categoryKey: 'SYSTEM_PREFERENCES.JWT_SECRET.CATEGORY',
  },
  [SysPreference.JwtExpiresIn]: {
    nameKey: 'SYSTEM_PREFERENCES.JWT_EXPIRES_IN.NAME',
    helpKey: 'SYSTEM_PREFERENCES.JWT_EXPIRES_IN.HELP',
    categoryKey: 'SYSTEM_PREFERENCES.JWT_EXPIRES_IN.CATEGORY',
  },
  [SysPreference.BCryptStrength]: {
    nameKey: 'SYSTEM_PREFERENCES.BCRYPT_STRENGTH.NAME',
    helpKey: 'SYSTEM_PREFERENCES.BCRYPT_STRENGTH.HELP',
    categoryKey: 'SYSTEM_PREFERENCES.BCRYPT_STRENGTH.CATEGORY',
  },

  [SysPreference.EnableTracking]: {
    nameKey: 'SYSTEM_PREFERENCES.ENABLE_TRACKING.NAME',
    helpKey: 'SYSTEM_PREFERENCES.ENABLE_TRACKING.HELP',
    categoryKey: 'SYSTEM_PREFERENCES.ENABLE_TRACKING.CATEGORY',
  },
  [SysPreference.TrackingUrl]: {
    nameKey: 'SYSTEM_PREFERENCES.TRACKING_URL.NAME',
    helpKey: 'SYSTEM_PREFERENCES.TRACKING_URL.HELP',
    categoryKey: 'SYSTEM_PREFERENCES.TRACKING_URL.CATEGORY',
  },
  [SysPreference.TrackingId]: {
    nameKey: 'SYSTEM_PREFERENCES.TRACKING_ID.NAME',
    helpKey: 'SYSTEM_PREFERENCES.TRACKING_ID.HELP',
    categoryKey: 'SYSTEM_PREFERENCES.TRACKING_ID.CATEGORY',
  },

  [SysPreference.EnableTelemetry]: {
    nameKey: 'SYSTEM_PREFERENCES.ENABLE_TELEMETRY.NAME',
    helpKey: 'SYSTEM_PREFERENCES.ENABLE_TELEMETRY.HELP',
    categoryKey: 'SYSTEM_PREFERENCES.ENABLE_TELEMETRY.CATEGORY',
  },
};

// 保留舊的匯出名稱以向後相容（暫時）
export const SysPreferenceUI = SysPreferenceI18nKeys;
