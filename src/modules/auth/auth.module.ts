import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '@/modules/database/database.module';
import { TokenService } from '@/modules/token/token.service';
import { FileService } from '@/modules/file/file.service';
import { UserService } from '@/modules/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { authProviders } from '@/modules/auth/auth.providers';
import { CookiesSettings } from '@/utils/cookies-settings';

@Module({
  imports: [JwtModule.register({}), DatabaseModule],
  providers: [
    ...authProviders,
    AuthService,
    TokenService,
    FileService,
    UserService,
    CookiesSettings,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
