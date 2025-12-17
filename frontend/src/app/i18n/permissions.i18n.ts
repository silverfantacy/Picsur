import { Permission } from 'picsur-shared/dist/dto/permissions.enum';

export const UIFriendlyPermissions: {
  [key in Permission]: string;
} = {
  [Permission.ImageView]: '檢視圖片',
  [Permission.ImageUpload]: '上傳圖片',
  [Permission.ImageManage]: '管理自己的圖片',
  [Permission.ImageDeleteKey]: '使用刪除金鑰',

  [Permission.UserLogin]: '登入',
  [Permission.UserKeepLogin]: '保持登入',
  [Permission.UserRegister]: '註冊',

  [Permission.Settings]: '檢視設定',

  [Permission.ApiKey]: '使用 API 金鑰',

  [Permission.ImageAdmin]: '圖片管理員',
  [Permission.UserAdmin]: '使用者管理員',
  [Permission.RoleAdmin]: '角色管理員',
  [Permission.ApiKeyAdmin]: 'API 金鑰管理員',
  [Permission.SysPrefAdmin]: '系統管理員',
};
