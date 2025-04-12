import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { IUser } from 'src/users/model';
import { AuthTokensResponse, LoginRequest } from './model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Метод для проверки логина и пароля пользователя
   * @param login Логин пользователя
   * @param password Пароль пользователя
   * @returns Пользовательский объект (IUser) если аутентификация успешна, иначе null
   * @throws UnauthorizedException если неверный логин или пароль
   */
  async validate(login: string, password: string): Promise<IUser | null> {
    // Ищем пользователя по логину
    const user = await this.usersService.getUserByLogin(login);

    console.log(`Пользователь ${JSON.stringify(user)}`);

    // Если пользователь найден, проверяем пароль
    if (user) {
      console.log('', password, user.password);
      const isAuth = await user.checkPassword(password);  // Проверяем, совпадает ли пароль
      if (isAuth) {
        // Если пароль верный, возвращаем объект пользователя с его данными
        return {
          login: user.login,
          id: user._id.toString(),  // Возвращаем ID пользователя
        };
      }
    }
    // Если пользователь не найден или пароль неверный, выбрасываем ошибку 401 (Unauthorized)
    console.log('Возврааем 401');
    throw new UnauthorizedException('Invalid credentials');
  }

  /**
   * Метод для выполнения логина пользователя и генерации токенов
   * @param user Данные для входа пользователя (логин и пароль)
   * @returns Объект с токенами (access_token)
   */
  async login(user: LoginRequest): Promise<AuthTokensResponse> {
    // Формируем полезную нагрузку для JWT токена, используя логин пользователя
    const payload = { login: user.login };
    
    // Генерируем токен и возвращаем его в объекте
    return { access_token: this.jwtService.sign(payload) };
  }
}
