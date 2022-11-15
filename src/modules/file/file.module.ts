import { Module } from '@nestjs/common';

import { FileService } from './file.service';
import { FileController } from './file.controller';
import { fileProviders } from '@/modules/file/file.providers';
import { DatabaseModule } from '@/modules/database/database.module';
import { UserService } from '@/modules/user/user.service';

@Module({
  imports: [DatabaseModule],
  providers: [...fileProviders, FileService, UserService],
  controllers: [FileController],
})
export class FileModule {}
