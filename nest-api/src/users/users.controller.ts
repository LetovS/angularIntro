import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import {
  UsersService,
  IUser,
  CreateUserDto,
  ChangePasswordDto,
  IChangePassword,
} from './users.service';

@ApiTags('users') // Группировка эндпоинтов по тегу
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Add a new user',
    operationId: 'register',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 200, description: 'User added successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async addUser(@Body() user: IUser): Promise<true | string> {
    console.log(user);
    return await this.usersService.addUser(user);
  }

  @Post('change-password')
  @ApiOperation({
    summary: "Change user's password",
    operationId: 'change-password',
  })
  @ApiBody({ type: ChangePasswordDto }) // Указание типа тела запроса
  @ApiResponse({ status: 200, description: 'User added successfully' })
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

  @Get('exists')
  @ApiOperation({
    summary: 'Check if user exists',
    operationId: 'exists',
  })
  @ApiResponse({ status: 200, description: 'User exists' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async isUserExist(@Query('login') login: string): Promise<boolean> {
    console.log(login);
    return await this.usersService.isUserExist(login);
  }

  @Get('users-count')
  @ApiOperation({
    summary: 'Count of number users',
    operationId: 'users-count',
  })
  @ApiResponse({ status: 200, description: 'Count' })
  async getUsersCount(): Promise<number> {
    return await this.usersService.getUsersCount();
  }

  @Get('users-list')
  @ApiOperation({
    summary: 'Users',
    operationId: 'getUsersList',
  })
  @ApiResponse({ status: 200, description: 'list' })
  async getUsers(): Promise<IUser[]> {
    return await this.usersService.getUsers();
  }

  @Get('user/:userId')
  @ApiOperation({
    summary: 'Get user by id',
    operationId: 'getUserById',
  })
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
