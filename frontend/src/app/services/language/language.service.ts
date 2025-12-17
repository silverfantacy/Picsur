import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface Language {
  code: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly storageKey = 'userLang';

  public readonly availableLanguages: Language[] = [
    { code: 'zh-TW', name: '繁體中文' },
    { code: 'en', name: 'English' },
  ];

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
  getAvailableLanguages(): Language[] {
    return this.availableLanguages;
  }

  /**
   * 切換語言
   */
  switchLanguage(lang: string): void {
    const languageCodes = this.availableLanguages.map(l => l.code);
    if (languageCodes.includes(lang)) {
      this.translate.use(lang);
      localStorage.setItem(this.storageKey, lang);
    }
  }

  /**
   * 取得語言顯示名稱
   */
  getLanguageDisplayName(lang: string): string {
    const language = this.availableLanguages.find(l => l.code === lang);
    return language ? language.name : lang;
  }
}
