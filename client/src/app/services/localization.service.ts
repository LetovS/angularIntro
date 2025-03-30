import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { translations } from '../../locale/translations';


@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  private currentLangSubject = new BehaviorSubject<string>('en');
  currentLang$ = this.currentLangSubject.asObservable();

  constructor() {
    const browserLang = navigator.language || 'en';
    this.setLanguage(browserLang.startsWith('ru') ? 'ru' : 'en');
  }

  setLanguage(lang: 'en' | 'ru'): void {
    this.currentLangSubject.next(lang);
  }

  get currentLang(): string {
    return this.currentLangSubject.value;
  }

  translate(key: string): string {
    const keys = key.split('.');
    let result: any = translations[this.currentLang as 'en' | 'ru'];

    for (const k of keys) {
      if (result === undefined) break;
      result = result[k];
    }

    return result || `[${key}]`;
  }
}
