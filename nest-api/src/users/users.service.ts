import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export interface IUser {
  id: string;
  login: string;
  password: string;
  nickname: string;
  email: string;
  refreshTokens?: string[]; // Массив активных refresh-токенов
}

export class CreateUserDto {
  @ApiProperty({ description: 'User login', example: 'demo' })
  login: string;

  @ApiProperty({ description: 'User password', example: '123456' })
  password: string;

  @ApiProperty({ description: 'User nickname', example: 'test' })
  nickname: string;

  @ApiProperty({ description: 'User email', example: 'demo@demo.com' })
  email: string;
}

const userStorage: IUser[] = [];

@Injectable()
export class UsersService {
  private currentUser: IUser | null = null;

  public async getUserByLogin(login: string): Promise<IUser | null> {
    await Promise.resolve();
    return userStorage.find((u) => u.login === login) || null;
  }

  public async getUserById(id: string): Promise<IUser | null> {
    await Promise.resolve();
    return userStorage.find((u) => u.id === id) || null;
  }

  public async addUser(userData: CreateUserDto): Promise<true | string> {
    await Promise.resolve();
    
    if (await this.getUserByLogin(userData.login)) {
      return 'User already exists';
    }

    const newUser: IUser = {
      id: Math.random().toString(36).substring(2, 9), // Генерация простого ID
      login: userData.login,
      password: userData.password,
      nickname: userData.nickname,
      email: userData.email,
      refreshTokens: []
    };

    userStorage.push(newUser);
    return true;
  }

  public async isUserExist(login: string): Promise<boolean> {
    await Promise.resolve();
    const user = await this.getUserByLogin(login);
    return !!user;
  }

  public async getUsersCount(): Promise<number> {
    await Promise.resolve();
    return userStorage.length;
  }

  public async getUsers(): Promise<IUser[]> {
    await Promise.resolve();
    return userStorage;
  }

  async saveRefreshToken(userId: string, token: string): Promise<void> {
    await Promise.resolve();
    const user = await this.getUserById(userId);
    if (user) {
      if (!user.refreshTokens) {
        user.refreshTokens = [];
      }
      user.refreshTokens.push(token);
    }
  }
  
  async validateRefreshToken(userId: string, token: string): Promise<boolean> {
    await Promise.resolve();
    const user = await this.getUserById(userId);
    return !!user?.refreshTokens?.includes(token);
  }
  
  async replaceRefreshToken(userId: string, oldToken: string, newToken: string): Promise<void> {
    await Promise.resolve();
    const user = await this.getUserById(userId);
    if (user?.refreshTokens) {
      const tokenIndex = user.refreshTokens.indexOf(oldToken);
      if (tokenIndex !== -1) {
        user.refreshTokens[tokenIndex] = newToken;
      }
    }
  }
  
  async removeRefreshToken(userId: string, token: string): Promise<void> {
    await Promise.resolve();
    const user = await this.getUserById(userId);
    if (user?.refreshTokens) {
      user.refreshTokens = user.refreshTokens.filter(t => t !== token);
    }
  }

  async invalidateAllRefreshTokens(userId: string): Promise<void> {
    await Promise.resolve();
    const user = await this.getUserById(userId);
    if (user) {
      user.refreshTokens = [];
    }
  }
}