import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './infrastructure/midleware/http-exception/http-exception.filter';
import * as cookieParser from 'cookie-parser';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const httpsOptions = {
    key: readFileSync(join(__dirname, '../ssl/localhost-key.pem')),
    cert: readFileSync(join(__dirname, '../ssl/localhost.pem')),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions, // Включаем HTTPS
  });
  
  // Настройка Swagger
  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('API documentation for NestJS application')
    .setVersion('1.0')
    .addTag('Users')
    .addTag('Tours')
    .addTag('Auth')
    .addTag('Permissions')
    .addTag('Orders')
    .addTag('Roles')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: ['http://localhost:4200', 'https://localhost:4200'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // удаляет лишние поля
    forbidNonWhitelisted: true, // выбрасывает ошибку, если есть лишние поля
    transform: true, // преобразует типы (напр. строку в число)
  }));
  
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap().catch((err) => {
  console.error('Failed to start the application:', err);
  process.exit(1);
});
