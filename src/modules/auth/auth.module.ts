import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '@/modules/database/database.module';
import { TokenService } from '@/modules/token/token.service';
import { FileService } from '@/modules/file/file.service';
import { UserService } from '@/modules/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { authProviders } from '@/modules/auth/auth.providers';
import { JwtStrategy } from '@/modules/auth/strategy/jwt.strategy';

@Module({
  imports: [JwtModule.register({}), DatabaseModule],
  providers: [
    ...authProviders,
    JwtStrategy,
    AuthService,
    TokenService,
    FileService,
    UserService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
