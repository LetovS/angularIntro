import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NotificationsService } from '../app/services/notifications/notifications.service';
import { inject } from '@angular/core';

export const ErrorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationsService = inject(NotificationsService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';

      if (error.status === 0) {
        errorMessage = 'Ошибка CORS: Сервер не разрешил запрос с этого домена';
        notificationsService.initToast('error', errorMessage, 'CORS-Ошибка');
        return throwError(() => errorMessage);
      }
      if (error instanceof HttpErrorResponse) {
        switch (error.status) {
          case  201:
            errorMessage = 'Такой пользователь уже существует';
            break;
          case 400:
            errorMessage = 'Некорректный запрос';
            break;
          case 401:
            errorMessage = 'Неверный логин или пароль';
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
      }
      notificationsService.initToast('error', errorMessage, 'Ошибка');
      return throwError(() => errorMessage);
    })
  );
};
