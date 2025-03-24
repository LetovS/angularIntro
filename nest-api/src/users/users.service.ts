import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

export interface IUser {
  id: string;
  login: string;
  password: string;
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
    console.log('Search starting ...');

    const result = userStorage.find((u) => u.login === login) || null;

    return result;
  }

  public async addUser(user: IUser): Promise<true | string> {
    await Promise.resolve();
    if (await this.getUserByLogin(user.login)) {
      return 'User already exists';
    }
    user.id = uuidv4();
    console.log('Adding new user...');
    userStorage.push(user);
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

  public async getUser(userId: string) {
    await Promise.resolve();
    const user: IUser | null = userStorage.find((u) => u.id === userId) || null;
    if (user) return user;
    return null;
  }
}
