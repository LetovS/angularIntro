// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser, UsersService } from '../users/users.service';
import { jwtConstants } from './constants';
import { TokenPayload } from './token-payload.interface';

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<IUser | null> {
    const user = await this.usersService.getUserByLogin(login);
    
    // В реальном приложении используйте bcrypt для сравнения хешей
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(user: IUser): Promise<IAuthTokens> {
    const payload: TokenPayload = { 
      sub: user.id, 
      login: user.login 
    };

    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    // Сохраняем refresh token в базе (или другом хранилище)
    await this.usersService.saveRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      expiresIn: jwtConstants.accessTokenExpiresIn
    };
  }

  async refreshTokens(refreshToken: string): Promise<IAuthTokens> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: jwtConstants.refreshTokenSecret,
      });

      // Проверяем, что токен есть в белом списке
      const isValid = await this.usersService.validateRefreshToken(
        payload.sub, 
        refreshToken
      );

      if (!isValid) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const newPayload: TokenPayload = { 
        sub: payload.sub, 
        login: payload.login 
      };

      const accessToken = this.generateAccessToken(newPayload);
      const newRefreshToken = this.generateRefreshToken(newPayload);

      // Обновляем refresh token в хранилище
      await this.usersService.replaceRefreshToken(
        payload.sub, 
        refreshToken, 
        newRefreshToken
      );

      return {
        accessToken,
        refreshToken: newRefreshToken,
        expiresIn: jwtConstants.accessTokenExpiresIn
      };
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async invalidateRefreshToken(refreshToken: string): Promise<void> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: jwtConstants.refreshTokenSecret,
      });
      
      await this.usersService.removeRefreshToken(payload.sub, refreshToken);
    } catch (e) {
      // Токен уже невалиден, ничего не делаем
    }
  }

  private generateAccessToken(payload: TokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: jwtConstants.accessTokenSecret,
      expiresIn: jwtConstants.accessTokenExpiresIn,
    });
  }

  private generateRefreshToken(payload: TokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: jwtConstants.refreshTokenSecret,
      expiresIn: jwtConstants.refreshTokenExpiresIn,
    });
  }
}