import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ToursModule } from './tours/tours.module';
import { AuthModule } from './auth/auth.module';
import { PaymentModule } from './payment/payment.module';
import { CountriesModule } from './countries/countries.module';
import { jwtKeys } from './static/private/keys';
import { AuthGuardsService } from './infrastructure/auth/auth-guards/auth-guards.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesController } from './roles/roles.controller';
import { PermissionsController } from './permissions/permissions.controller';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    ConfigModule.forRoot(), // Подключаем модуль конфигурации
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: config.get('JWT_EXPIRES_IN') },
      }),
    }),
    ToursModule,
    AuthModule,
    PaymentModule,
    CountriesModule,
    CountriesModule,
    PermissionsModule,
    RolesModule,
  ],
  controllers: [],
  providers: [AppService, AuthGuardsService],
})
export class AppModule {}
