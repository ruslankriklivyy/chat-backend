import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from '@/modules/auth/auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtGuard } from '@/modules/auth/guard/jwt.guard';
import { CreateUserDto } from '@/modules/user/user.dto';
import { CookiesSettings } from '@/utils/cookies-settings';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly cookiesSettings: CookiesSettings,
  ) {}

  @Post('register')
  @HttpCode(201)
  async register(
    @Body()
    body: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.register(body);
    this.cookiesSettings.initRefreshCookie(res.cookie, data.refresh_token);
    return data;
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() body, @Res({ passthrough: true }) res: Response) {
    const data = await this.authService.login(body);
    this.cookiesSettings.initRefreshCookie(res.cookie, data.refresh_token);
    return data;
  }

  @Post('refresh')
  @HttpCode(200)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refresh_token } = req.cookies;
    const data = await this.authService.refresh({ refresh_token });
    this.cookiesSettings.initRefreshCookie(res.cookie, data.refresh_token);
    return data;
  }

  @UseGuards(JwtGuard)
  @Post('logout')
  @HttpCode(200)
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { refresh_token } = req.cookies;

    res.set('Authorization', '');
    res.clearCookie('refresh_token');

    return this.authService.logout({ refresh_token });
  }
}
