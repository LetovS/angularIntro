import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private helper = new JwtHelperService();

  constructor() {}

  // Проверяет наличие и валидность access token
  public isValidToken(): boolean {
    const token = this.getToken();
    return token && !this.helper.isTokenExpired(token);
  }

  // Получает access token
  public getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  // Получает refresh token
  public getRefreshToken(): string | null {
    return sessionStorage.getItem('refreshToken');
  }

  // Сохраняет оба токена
  public saveTokens(token: string, refreshToken: string): void {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('refreshToken', refreshToken);
  }

  // Удаляет токены (для logout)
  public destroyTokens(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refreshToken');
  }

  // Проверяет, можно ли обновить токен (есть refresh token)
  public canRefresh(): boolean {
    return !!this.getRefreshToken();
  }

  // Декодирует токен для получения данных пользователя
  public decodeToken(): any {
    const token = this.getToken();
    return token ? this.helper.decodeToken(token) : null;
  }
}
