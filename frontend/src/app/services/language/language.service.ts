import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly storageKey = 'userLang';
  private readonly availableLanguages = ['zh-TW', 'en'];

  constructor(private translate: TranslateService) {}

  /**
   * 取得當前語言
   */
  getCurrentLanguage(): string {
    return this.translate.currentLang || 'zh-TW';
  }

  /**
   * 取得所有可用的語言
   */
  getAvailableLanguages(): string[] {
    return this.availableLanguages;
  }

  /**
   * 切換語言
   */
  switchLanguage(lang: string): void {
    if (this.availableLanguages.includes(lang)) {
      this.translate.use(lang);
      localStorage.setItem(this.storageKey, lang);
    }
  }

  /**
   * 取得語言顯示名稱
   */
  getLanguageDisplayName(lang: string): string {
    const displayNames: { [key: string]: string } = {
      'zh-TW': '繁體中文',
      'en': 'English',
    };
    return displayNames[lang] || lang;
  }
}
