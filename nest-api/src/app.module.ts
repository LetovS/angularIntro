import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users/users.service';

@Module({
  imports: [UsersModule,
    JwtModule.register({
      secret: 'supper-pupper-secret_key-1987$', // Замените на ваш секретный ключ
      signOptions: { expiresIn: '1h' }, // Время жизни токена
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, AuthService, UsersService],
})
export class AppModule {}
