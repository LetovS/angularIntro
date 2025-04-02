import { Pipe, PipeTransform, Inject } from '@angular/core';
import { LocalizationService } from '../services/localization.service';

@Pipe({
  standalone: true,
  name: 'localeDate'
})
export class LocaleDatePipe implements PipeTransform {
  constructor(private localizationService: LocalizationService) {}

  transform(value: Date, format: string): string {
    if (this.localizationService.currentLang === 'ru') {
      return value.toLocaleString('ru-RU');
    } else {
      return value.toLocaleString('en-US');
    }
  }
}
