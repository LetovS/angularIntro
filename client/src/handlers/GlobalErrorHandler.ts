import {ErrorHandler, Injectable, NgZone} from '@angular/core';
import { NotificationsService } from '../app/services/notifications/notifications.service';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private notificationsService: NotificationsService,
              private ngZone: NgZone ) {}

  handleError(error: any): void {
    let errorMessage = '';

    // Проверка типа ошибки
    if (error instanceof HttpErrorResponse) {
      // Обработка ошибок HTTP
      switch (error.status) {
        case 400:
          errorMessage = 'Некорректный запрос';
          break;
        case 401:
          errorMessage = 'Неавторизованный доступ';
          break;
        case 403:
          errorMessage = 'Доступ запрещён';
          break;
        case 404:
          errorMessage = 'Ресурс не найден';
          break;
        case 500:
          errorMessage = 'Ошибка сервера';
          break;
        default:
          errorMessage = `Ошибка HTTP: ${error.status} - ${error.message}`;
      }
    } else if (error instanceof TypeError) {
      // Обработка TypeError
      errorMessage = 'Ошибка типа: ' + error.message;
    } else if (error instanceof ReferenceError) {
      // Обработка ReferenceError
      errorMessage = 'Ошибка ссылки: ' + error.message;
    } else if (error instanceof Error) {
      // Обработка общих ошибок JavaScript
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      // Обработка строковых ошибок
      errorMessage = error;
    } else {
      // Обработка всех остальных случаев
      errorMessage = 'Неизвестная ошибка';
    }
    this.ngZone.run(() => {
      alert(`Сообщение об ошибке - ${errorMessage}`);
      this.notificationsService.initToast('error', errorMessage, 'Ошибка');
    });
    console.error(error);
  }
}
