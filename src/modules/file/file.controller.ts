import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from '@/modules/file/file.service';
import { createReadStream } from 'fs';
import { JwtGuard } from '@/modules/auth/guard/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadFilesOptions } from '@/utils/upload-files-options';
import { FILES } from '@/utils/consts';
import { join } from 'path';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @UseGuards(JwtGuard)
  @Get('/:filename')
  async getFile(
    @Param('filename') filename: string,
    @Res({ passthrough: true }) res,
  ) {
    const fileType = filename.split('.').pop();
    let contentType = 'text/plain';

    if (fileType) {
      contentType = `image/${fileType}`;
    }

    if (fileType === 'svg') {
      contentType = 'image/svg+xml';
    }

    if (fileType === 'html') {
      contentType = 'text/html';
    }

    res.set({
      'Content-Type': contentType,
    });

    const filePath = join(process.cwd(), `${FILES.FILES_PATH}${filename}`);
    const readStream = createReadStream(filePath);

    readStream.on('error', (err) => {
      console.error(err);
    });

    return new StreamableFile(readStream);
  }

  @UseGuards(JwtGuard)
  @Post('/')
  @UseInterceptors(FileInterceptor('file', uploadFilesOptions))
  async createOne(@UploadedFile() file) {
    return this.fileService.createOne({ file });
  }
}
