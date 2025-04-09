import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    
    const token = this.extractToken(request);
    console.log('token',token);
    if (!token) {
      throw new UnauthorizedException('Токен не найден');
    }

    try {
      const payload = this.jwtService.verify(token);
      request.user = payload;
      return true;
    } catch (e) {
      throw new UnauthorizedException('Невалидный токен');
    }
  }

  private extractToken(req: Request & { cookies?: any }): string | null {    
    const authHeader = req.headers['authorization'];
    if (authHeader?.startsWith('Bearer ')) {
      return authHeader.split(' ')[1];
    }

    if (req.cookies?.access_token) {
      return req.cookies.access_token;
    }

    return null;
  }
}