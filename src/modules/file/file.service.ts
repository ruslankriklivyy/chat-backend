import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { FILES, REPOSITORIES } from '@/utils/consts';
import { File } from '@/modules/file/file.entity';
import { CreateFilePayload, IFile } from '@/modules/file/file.interfaces';

@Injectable()
export class FileService {
  constructor(
    @Inject(REPOSITORIES.FILE_REPOSITORY)
    private readonly fileRepository: Repository<File>,
  ) {}

  async createOne(payload: CreateFilePayload) {
    const { file } = payload;

    const newFile: Omit<IFile, 'id'> = {
      url: `${FILES.FILES_PATH}${file.filename}`,
      file_name: file.filename,
      original_name: file.originalname,
      size: file.size,
    };

    return this.fileRepository.create(newFile);
  }
}
