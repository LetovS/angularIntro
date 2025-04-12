import { Controller, Post, Body, UseGuards, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthTokensResponse, LoginRequest } from './model';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Метод для аутентификации пользователя и возвращения JWT токена
   * @param request Объект, содержащий логин и пароль для аутентификации
   * @param res Ответ Express, чтобы установить cookie
   * @returns Объект с access_token, который используется для доступа к защищённым ресурсам
   */
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Authenticate user and return JWT token' })
  @ApiResponse({ status: 200, description: 'Authentication successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(
    @Body() request: LoginRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthTokensResponse> {
    const access_token = await this.authService.login(request);

    res.cookie('access_token', access_token.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      domain: 'localhost',
    });

    return access_token;
  }
}
