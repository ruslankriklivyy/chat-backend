import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from '@/modules/user/user.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { TokenModule } from '@/modules/token/token.module';
import { FileModule } from '@/modules/file/file.module';
import { RoomModule } from './modules/room/room.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
    TokenModule,
    FileModule,
    RoomModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
