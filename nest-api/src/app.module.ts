import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users/users.service';
import { ToursController } from './tours/tours.controller';
import { ToursService } from './tours/tours.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    //MongooseModule.forRoot('mongodb://localhost:27017/tours'),
    JwtModule.register({
      secret: 'supper-pupper-secret_key-1987$',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController, AuthController, ToursController],
  providers: [AppService, AuthService, AuthService, UsersService, ToursService],
})
export class AppModule {}
