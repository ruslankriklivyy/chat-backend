import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';
import { JwtGuard } from '@/modules/auth/guard/jwt.guard';
import { CreateUserDto } from '@/modules/user/user.dto';
import { LoginDto, LogoutDto, RefreshDto } from '@/modules/auth/auth.dto';

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
  refresh(@Body() body: RefreshDto) {
    return this.authService.refresh(body);
  }

  @UseGuards(JwtGuard)
  @Post('logout')
  @HttpCode(200)
  logout(@Body() body: LogoutDto) {
    return this.authService.logout(body);
  }
}
