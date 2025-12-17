import { Permission } from 'picsur-shared/dist/dto/permissions.enum';

// 注意: 此檔案現在使用 i18n key
export const PermissionI18nKeys: {
  [key in Permission]: string;
} = {
  [Permission.ImageView]: 'PERMISSIONS.IMAGE_VIEW',
  [Permission.ImageUpload]: 'PERMISSIONS.IMAGE_UPLOAD',
  [Permission.ImageManage]: 'PERMISSIONS.IMAGE_MANAGE',
  [Permission.ImageDeleteKey]: 'PERMISSIONS.IMAGE_DELETE_KEY',

  [Permission.UserLogin]: 'PERMISSIONS.USER_LOGIN',
  [Permission.UserKeepLogin]: 'PERMISSIONS.USER_KEEP_LOGIN',
  [Permission.UserRegister]: 'PERMISSIONS.USER_REGISTER',

  [Permission.Settings]: 'PERMISSIONS.SETTINGS',

  [Permission.ApiKey]: 'PERMISSIONS.API_KEY',

  [Permission.ImageAdmin]: 'PERMISSIONS.IMAGE_ADMIN',
  [Permission.UserAdmin]: 'PERMISSIONS.USER_ADMIN',
  [Permission.RoleAdmin]: 'PERMISSIONS.ROLE_ADMIN',
  [Permission.ApiKeyAdmin]: 'PERMISSIONS.API_KEY_ADMIN',
  [Permission.SysPrefAdmin]: 'PERMISSIONS.SYS_PREF_ADMIN',
};

// 保留舊的匯出名稱以向後相容
export const UIFriendlyPermissions: {
  [key in Permission]: string;
} = {
  [Permission.ImageView]: 'View Images',
  [Permission.ImageUpload]: 'Upload Images',
  [Permission.ImageManage]: 'Manage Own Images',
  [Permission.ImageDeleteKey]: 'Use Deletekey',

  [Permission.UserLogin]: 'Login',
  [Permission.UserKeepLogin]: 'Stay Logged In',
  [Permission.UserRegister]: 'Register',

  [Permission.Settings]: 'View settings',

  [Permission.ApiKey]: 'Use API keys',

  [Permission.ImageAdmin]: 'Image Admin',
  [Permission.UserAdmin]: 'User Admin',
  [Permission.RoleAdmin]: 'Role Admin',
  [Permission.ApiKeyAdmin]: 'API Key Admin',
  [Permission.SysPrefAdmin]: 'System Admin',
};
