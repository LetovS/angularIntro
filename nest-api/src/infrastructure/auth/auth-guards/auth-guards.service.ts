import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { IUser, UsersService } from "src/users/users.service";

@Injectable()
export class AuthGuardsService extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({ usernameField: 'login', passwordField: 'password' });
  }

  async validate(login: string, password: string): Promise<IUser> {
    const user = await this.userService.getUserByLogin(login);

    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    const isPasswordValid = await user.checkPassword(password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный пароль');
    }

    return { login: user.login, id: user._id.toString() };
  }
}