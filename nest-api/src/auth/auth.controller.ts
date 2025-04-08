import { Controller, Post, Body, UseGuards, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService, IAuth } from './auth.service';
import { CreateUserDto } from '../users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Authenticate user and return JWT token' })
  @ApiResponse({ status: 200, description: 'Authentication successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response, // ✅ правильный тип
  ): Promise<IAuth> {
    const access_token = await this.authService.login(createUserDto);

    res.cookie('access_token', access_token.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400000,
      path: '/',
    });

    return access_token;
  }
}
