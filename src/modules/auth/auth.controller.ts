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
import { JwtGuard } from '@/modules/auth/guard/jwt.guard';
import { CreateUserDto } from '@/modules/user/user.dto';
import { LoginDto } from '@/modules/auth/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(201)
  register(
    @Body()
    body: CreateUserDto,
  ) {
    return this.authService.register(body);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('refresh')
  @HttpCode(200)
  refresh(@Req() req: Request) {
    console.log(req.headers.cookies);
    const { refresh_token } = req.cookies;
    return this.authService.refresh({ refresh_token });
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
