import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  BadRequestException,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { ChangePasswordRequest, CreateUserRequest, IChangePassword, IUser } from './model';

@ApiTags('Users') // Группировка эндпоинтов по тегу
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Добавление нового пользователя.
   * @param user Данные пользователя, полученные в теле запроса
   * @returns Статус добавления пользователя
   */
  @Post()
  @ApiOperation({ summary: 'Add a new user' }) // Описание операции
  @ApiBody({ type: CreateUserRequest }) // Указание типа тела запроса
  @ApiResponse({ status: 200, description: 'User added successfully' }) // Описание ответа
  @ApiResponse({ status: 400, description: 'Bad request' })
  async addUser(@Body() user: IUser): Promise<true | string> {
    console.log(user);
    return await this.usersService.addUser(user);
  }

  /**
   * Изменение пароля пользователя.
   * @param changePasswordDto Данные для изменения пароля
   * @returns Статус успешности изменения пароля
   */
  @Put('change-password')
  @ApiOperation({ summary: "Change user's password" }) // Описание операции
  @ApiBody({ type: ChangePasswordRequest }) // Указание типа тела запроса
  @ApiResponse({ status: 200, description: 'User added successfully' }) // Описание ответа
  @ApiResponse({ status: 400, description: 'Bad request' })
  async changeUsrPassword(
    @Body() changePasswordDto: IChangePassword,
  ): Promise<boolean | BadRequestException> {
    console.log('Меняем пароль ' + changePasswordDto);
    const result =
      await this.usersService.changeUserPassword(changePasswordDto);
    if (result) return true;
    else {
      throw new BadRequestException('Incorrect old password.');
    }
  }

  /**
   * Проверка существования пользователя.
   * @param login Логин пользователя для поиска
   * @returns Статус существования пользователя
   */
  @Get('exists')
  @ApiOperation({ summary: 'Check if user exists' })
  @ApiResponse({ status: 200, description: 'User exists' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async isUserExist(@Query('login') login: string): Promise<boolean> {
    console.log(login);
    return await this.usersService.isUserExist(login);
  }

  /**
   * Получение общего количества пользователей.
   * @returns Количество пользователей
   */
  @Get('count')
  @ApiOperation({ summary: 'Count of number users' })
  @ApiResponse({ status: 200, description: 'Count' })
  async getUsersCount(): Promise<number> {
    return await this.usersService.getUsersCount();
  }

  /**
   * Получение списка всех пользователей.
   * @returns Список пользователей
   */
  @Get()
  @ApiOperation({ summary: 'Users' })
  @ApiResponse({ status: 200, description: 'list' })
  async getUsers(): Promise<IUser[]> {
    return await this.usersService.getUsers();
  }

  /**
   * Получение пользователя по ID.
   * @param userId Идентификатор пользователя
   * @returns Информация о пользователе
   */
  @Get(':userId')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'ID of the user',
  })
  @ApiResponse({ status: 200, description: 'user' })
  async getUserById(@Param('userId') userId: string): Promise<IUser | null> {
    return await this.usersService.getUser(userId);
  }
}
