import { Controller, Post, Body, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService, IAuth } from './auth.service';
import { CreateUserDto } from '../users/users.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Authenticate user and return JWT token' })
  @ApiResponse({ status: 200, description: 'Authentication successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() createUserDto: CreateUserDto): Promise<IAuth | null> {
    console.log(`Request data ${JSON.stringify(createUserDto)}`);

    // const user = await this.authService.validate(
    //   createUserDto.login,
    //   createUserDto.password,
    // );

    // if (!user) {
    //   console.log('Возврааем 401');
    //   throw new UnauthorizedException('Invalid credentials');
    // }

    const response: IAuth = await this.authService.loginDemo(createUserDto);
    return response;
  }
}
