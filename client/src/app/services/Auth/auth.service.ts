import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { JwtService } from '../Jwt/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'https://your-api-url.com/api/auth';

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtService: JwtService
  ) {}

  /**
   * Логин пользователя
   * @param credentials Объект с login и password
   */
  login(credentials: { login: string; password: string }): Observable<{
    accessToken: string;
    refreshToken: string;
    user: any;
  }> {
    return this.http.post<{
      accessToken: string;
      refreshToken: string;
      user: any;
    }>(`${this.API_URL}/login`, credentials).pipe(
      tap(response => {
        this.jwtService.saveTokens(response.accessToken, response.refreshToken);
        // Здесь можно сохранить user data в store или sessionStorage
      })
    );
  }

  /**
   * Выход пользователя
   */
  logout(): void {
    // Опционально: отправляем запрос на сервер для инвалидации токена
    this.http.post(`${this.API_URL}/logout`, {
      refreshToken: this.jwtService.getRefreshToken()
    }).subscribe();

    // Очищаем токены и данные пользователя
    this.jwtService.destroyTokens();
    // Дополнительно очищаем данные пользователя, если они хранятся

    // Перенаправляем на страницу входа
    this.router.navigate(['/login']);
  }

  /**
   * Обновление токенов
   */
  refreshToken(): Observable<{
    accessToken: string;
    refreshToken: string
  }> {
    const refreshToken = this.jwtService.getRefreshToken();
    return this.http.post<{
      accessToken: string;
      refreshToken: string
    }>(`${this.API_URL}/refresh`, { refreshToken }).pipe(
      tap(tokens => {
        this.jwtService.saveTokens(tokens.accessToken, tokens.refreshToken);
      })
    );
  }

  /**
   * Регистрация нового пользователя
   */
  register(userData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, userData);
  }

  /**
   * Проверка, аутентифицирован ли пользователь
   */
  isAuthenticated(): boolean {
    return this.jwtService.isValidToken();
  }

  /**
   * Получение данных текущего пользователя
   */
  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.API_URL}/me`);
  }

  /**
   * Восстановление пароля
   */
  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.API_URL}/forgot-password`, { email });
  }

  /**
   * Сброс пароля
   */
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.API_URL}/reset-password`, {
      token,
      newPassword
    });
  }
}
