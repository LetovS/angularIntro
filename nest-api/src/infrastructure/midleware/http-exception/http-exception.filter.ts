import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { BusinessError } from './errors/business.error';
import { NotFoundError } from './errors/not-found.error';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status: number;
    let message: string;

    // Обрабатываем разные типы ошибок
    switch (true) {
      case exception instanceof BusinessError:
        status = exception.code;
        message = exception.message;
        break;

      case exception instanceof NotFoundError:
        status = exception.code;
        message = exception.message;
        break;

      case exception instanceof HttpException:
        status = exception.getStatus();
        message = exception.message;
        break;

      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Internal Server Error';
        console.error(exception);
    }

    // Возвращаем JSON в едином формате
    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}

