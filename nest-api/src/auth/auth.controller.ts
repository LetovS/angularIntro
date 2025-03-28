import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService, IAuth } from './auth.service';
import { CreateUserDto } from '../users/users.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Authenticate user and return JWT token',
    operationId: 'login',
  })
  @ApiResponse({ status: 200, description: 'Authentication successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() createUserDto: CreateUserDto): Promise<IAuth | null> {
    console.log(`Request data ${JSON.stringify(createUserDto)}`);

    const user = await this.authService.validateUser(
      createUserDto.login,
      createUserDto.password,
    );

    console.log(`Юзер найден - ${JSON.stringify(user)}`);

    if (!user) {
      console.log('Возврааем 401');
      throw new UnauthorizedException('Invalid credentials');
    }

    const response: IAuth = await this.authService.login(user);
    return response;
  }
}
