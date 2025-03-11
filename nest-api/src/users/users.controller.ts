import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UsersService, IUser, CreateUserDto } from './users.service';

@ApiTags('users') // Группировка эндпоинтов по тегу
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Add a new user' }) // Описание операции
  @ApiBody({ type: CreateUserDto }) // Указание типа тела запроса
  @ApiResponse({ status: 200, description: 'User added successfully' }) // Описание ответа
  @ApiResponse({ status: 400, description: 'Bad request' })
  async addUser(@Body() user: IUser): Promise<true | string> {
    console.log(user);
    return await this.usersService.addUser(user);
  }

  @Get('exists')
  @ApiOperation({ summary: 'Check if user exists' })
  @ApiResponse({ status: 200, description: 'User exists' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async isUserExist(@Query('login') login: string): Promise<boolean> {
    console.log(login);
    return await this.usersService.isUserExist(login);
  }

  @Get('users-count')
  @ApiOperation({ summary: 'Count of number users' })
  @ApiResponse({ status: 200, description: 'Count' })
  async getUsersCount(): Promise<number> {
    return await this.usersService.getUsersCount();
  }

  @Get('users-list')
  @ApiOperation({ summary: 'Users' })
  @ApiResponse({ status: 200, description: 'list' })
  async getUsers(): Promise<IUser[]> {
    return await this.usersService.getUsers();
  }
}
