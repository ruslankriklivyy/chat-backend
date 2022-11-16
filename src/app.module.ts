import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import pino from 'pino';
import { LoggerModule } from 'nestjs-pino';

import { UserModule } from '@/modules/user/user.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { TokenModule } from '@/modules/token/token.module';
import { FileModule } from '@/modules/file/file.module';
import { RoomModule } from './modules/room/room.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
        stream: pino.destination({
          dest: './logs', // omit for stdout
          minLength: 4096, // Buffer before writing
          sync: false, // Asynchronous logging,
        }),
      },
    }),
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
