import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { IChangePassword, IUser } from './model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userRepository: Model<UserDocument>,
  ) {
    console.log('userService run');
  }

  /**
   * Находит пользователя по логину и возвращает его, включая пароль.
   * @param login Логин пользователя для поиска
   * @returns Пользователь с паролем или null, если не найден
   */
  public async getUserByLogin(login: string): Promise<UserDocument | null> {
    const user = await this.userRepository
      .findOne({ login: login })
      .select('+password');

    return user ?? null;
  }

  /**
   * Добавляет нового пользователя в базу данных.
   * Если пользователь с таким логином уже существует, возвращается ошибка.
   * @param user Данные пользователя для добавления
   * @returns true, если пользователь успешно добавлен, или строку с ошибкой
   */
  public async addUser(user: IUser): Promise<true | string> {
    if (await this.isUserExist(user.login)) {
      return 'User already exists';
    }
    console.log('creating user', user);
    const id = await this.userRepository.create(user);

    return true;
  }

  /**
   * Проверяет, существует ли пользователь с указанным логином.
   * @param login Логин для проверки
   * @returns true, если пользователь существует, иначе false
   */
  public async isUserExist(login: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ login }).lean().exec();
    console.log('find user', user);
    return !!user;
  }

  /**
   * Возвращает количество пользователей в базе данных.
   * @returns Общее количество пользователей
   */
  public async getUsersCount(): Promise<number> {
    return await this.userRepository.countDocuments().exec();
  }

  /**
   * Получает список всех пользователей из базы данных.
   * @returns Список всех пользователей
   */
  public async getUsers(): Promise<IUser[]> {
    const users = await this.userRepository.find().exec();
    console.log('users ', users);
    return users as IUser[];
  }

  /**
   * Находит пользователя по его уникальному идентификатору.
   * @param userId ID пользователя
   * @returns Пользователь с указанным ID или null, если не найден
   */
  public async getUser(userId: string) {
    const user = (await this.userRepository
      .findById(userId)
      .lean()
      .exec()) as unknown as IUser;
    console.log('user: ', user);
    if (user) return user;
    return null;
  }

  /**
   * Изменяет пароль пользователя. Проверяет старый пароль, и если он верный, обновляет его.
   * @param changePasswordDto Объект с логином и новым/старым паролем
   * @returns true, если пароль успешно изменен
   * @throws BadRequestException Если старый пароль неверен или пользователь не найден
   */
  async changeUserPassword(
    changePasswordDto: IChangePassword,
  ): Promise<boolean> {
    const user = await this.userRepository
      .findOne({ login: changePasswordDto.login })
      .select('+password');

    if (!user) throw new BadRequestException('Пользователь не найден');

    const isValid = await user.checkPassword(changePasswordDto.oldPassword);
    if (!isValid) throw new BadRequestException('Неверный старый пароль');

    user.password = changePasswordDto.newPassword;
    const result = await user.save();
    console.log(result);
    return true;
  }
}
