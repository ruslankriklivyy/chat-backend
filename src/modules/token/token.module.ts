import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { TokenService } from '@/modules/token/token.service';
import { tokenProviders } from '@/modules/token/token.providers';
import { DatabaseModule } from '@/modules/database/database.module';

@Module({
  imports: [JwtModule.register({}), DatabaseModule],
  providers: [...tokenProviders, TokenService],
})
export class TokenModule {}
