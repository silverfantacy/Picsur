import { UsrPreference } from 'picsur-shared/dist/dto/usr-preferences.enum';

export const UsrPreferenceFriendlyNames: {
  [key in UsrPreference]: string;
} = {
  [UsrPreference.KeepOriginal]: '保留原始檔案',
};

export const UsrPreferenceHelpText: {
  [key in UsrPreference]: string;
} = {
  [UsrPreference.KeepOriginal]:
    '儲存您上傳到服務的原始檔案，這樣就不會遺失任何資料。這也會儲存 EXIF 資料。',
};
