import { ConfigService } from '@nestjs/config';
import { CookieOptions } from 'express';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CookiesSettings {
  constructor(private readonly configService: ConfigService) {}

  initRefreshCookie(
    setCookie: (name: string, token: string, options: CookieOptions) => void,
    token: string,
  ) {
    return setCookie('refresh_token', token, {
      maxAge: +this.configService.get('REFRESH_COOKIE_MAX_AGE'),
      path: '/',
      // domain: process.env.FRONTEND_DOMAIN || 'quartsoft.com',
      // httpOnly: true,
      // sameSite: 'strict',
    });
  }
}
