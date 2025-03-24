import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { JwtService } from '../app/services/Jwt/jwt.service';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {AuthService} from '../app/services/Auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Если токен валиден - добавляем его
    if (this.jwtService.isValidToken()) {
      request = this.addToken(request, this.jwtService.getToken()!);
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        }
        return throwError(error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (this.jwtService.canRefresh()) {
      return this.authService.refreshToken().pipe(
        switchMap(() => {
          request = this.addToken(request, this.jwtService.getToken()!);
          return next.handle(request);
        }),
        catchError(() => {
          this.authService.logout();
          return throwError(() => new Error('Session expired'));
        })
      );
    } else {
      this.authService.logout();
      return throwError(() => new Error('Session expired'));
    }
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
