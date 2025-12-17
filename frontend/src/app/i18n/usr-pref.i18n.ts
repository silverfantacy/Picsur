import { UsrPreference } from 'picsur-shared/dist/dto/usr-preferences.enum';

// 注意: 此檔案現在使用 i18n key
export const UsrPreferenceI18nKeys: {
  [key in UsrPreference]: {
    nameKey: string;
    helpKey: string;
  };
} = {
  [UsrPreference.KeepOriginal]: {
    nameKey: 'USER_PREFERENCES.KEEP_ORIGINAL.NAME',
    helpKey: 'USER_PREFERENCES.KEEP_ORIGINAL.HELP',
  },
};

// 保留舊的匯出名稱以向後相容
export const UsrPreferenceFriendlyNames: {
  [key in UsrPreference]: string;
} = {
  [UsrPreference.KeepOriginal]: 'Keep original file',
};

export const UsrPreferenceHelpText: {
  [key in UsrPreference]: string;
} = {
  [UsrPreference.KeepOriginal]:
    'Store the original files you upload to the service, this way no data will be lost. This will also store exif data.',
};
