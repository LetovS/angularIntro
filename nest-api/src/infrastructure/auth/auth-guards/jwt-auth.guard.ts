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
    console.log('Start extracting')
    const authHeader = req.headers['authorization'];
    if (authHeader?.startsWith('Bearer ')) {
      const res = authHeader.split(' ')[1];
      console.log('Headers', res);
      return res
    }

    if (req.cookies?.access_token) {
      const res = req.cookies.access_token;
      console.log('Cookies',res);
      return res
    }

    return null;
  }
}