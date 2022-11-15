import { Module } from '@nestjs/common';

import { UserService } from '@/modules/user/user.service';
import { UserController } from '@/modules/user/user.controller';
import { userProviders } from '@/modules/user/user.providers';
import { DatabaseModule } from '@/modules/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UserService],
  controllers: [UserController],
})
export class UserModule {}
