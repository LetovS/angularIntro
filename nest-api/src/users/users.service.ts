import { BadRequestException, Injectable } from '@nestjs/common';
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

export class ChangePasswordDto implements IChangePassword {
  @ApiProperty({ description: 'Login user' })
  login: string;
  @ApiProperty({ description: 'Previous user password' })
  oldPassword: string;
  @ApiProperty({ description: 'New user password' })
  newPassword: string;
}

export interface IChangePassword {
  login: string;
  oldPassword: string;
  newPassword: string;
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

  async changeUserPassword(
    changePasswordDto: IChangePassword,
  ): Promise<boolean> {
    await Promise.resolve();
    console.log('Ищем пользвоателя');
    const user =
      userStorage.find((u) => u.login === changePasswordDto.login) || null;
    if (user) {
      console.log('Пользователь найден');
      const isValidPassword = user.password === changePasswordDto.oldPassword;
      if (isValidPassword) {
        console.log('Пароль изменён');
        user.password = changePasswordDto.newPassword;
        console.log(JSON.stringify(user));
        return true;
      }
      console.log('Старый пароль неверный.');
      return false;
    } else {
      console.log('Пользователь не найден.');
      throw new BadRequestException('User not found');
    }
  }
}
