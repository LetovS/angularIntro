import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser, UsersService } from '../users/users.service';

export interface IAuth {
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<IUser | null> {
    await Promise.resolve();

    const user = await this.usersService.getUserByLogin(login);

    console.log(`Пользователь ${JSON.stringify(user)}`);

    if (user && user.password === password) {
      console.log(`Проверка пароля ддя ${user.password} и ${password}`);
      return user;
    }
    return null;
  }

  async login(user: IUser): Promise<IAuth> {
    await Promise.resolve();
    const payload = { login: user.login };

    const token: string = this.jwtService.sign(payload);
    console.log(`Полученный токен - ${token}`);
    const response: IAuth = { access_token: token };
    return response;
  }
}
