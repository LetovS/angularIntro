import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  BadRequestException,
  Put,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { ChangePasswordRequest, CreateUserRequest, IChangePassword, IUser } from './model';
import { FileNotificationService } from 'src/file-notification/file-notification.service';
import { ChangePasswordRequest, ChangeRoleRequest, CreateUserRequest, IChangePassword, IUser } from './model';

@ApiTags('Users') // Группировка эндпоинтов по тегу
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly fileNotify: FileNotificationService) {}

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
   * Изменение роли пользователя.
   * @param changePasswordDto Данные для изменения пароля
   * @returns Статус успешности изменения пароля
   */
   @Put('change-role')
   @ApiOperation({ summary: "Change user's role" }) // Описание операции
   @ApiBody({ type: ChangeRoleRequest }) // Указание типа тела запроса
   @ApiResponse({ status: 200, description: 'User added successfully' }) // Описание ответа
   @ApiResponse({ status: 400, description: 'Bad request' })
   async changeUsrRole(@Body() changePasswordDto: ChangeRoleRequest): Promise<boolean> {

     console.log('Меняем роль ' + changePasswordDto);

     const result = await this.usersService.changeUserRole(changePasswordDto);

     if (result) return true;
     else {
       throw new InternalServerErrorException('Something went wrong');
     }
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

  @Get('test')
  async sendNotifications(): Promise<void>{
    await this.fileNotify.processFile(3333, 3333, 'Completed');
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

   /**
   * Проверка существования пользователя.
   * @param login Логин пользователя для поиска
   * @returns Статус существования пользователя
   */
   @Get('userByLogin/:userLogin')
   @ApiOperation({ summary: 'Get user by login' })
   @ApiParam({
    name: 'userLogin',
    type: String,
    description: 'Login of the user',
  })
  @ApiResponse({ status: 200, description: 'user' })
   @ApiResponse({ status: 404, description: 'User not found' })
   async getUserByLogin(@Param('userLogin') userLogin: string):Promise<IUser | null> {
     console.log(userLogin);
     return await this.usersService.getUserByLogin(userLogin);
   }
}
