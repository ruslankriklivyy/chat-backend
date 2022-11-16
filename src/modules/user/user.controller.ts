import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '@/modules/user/user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadFilesOptions } from '@/utils/upload-files-options';
import { JwtGuard } from '@/modules/auth/guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  getAll() {
    return this.userService.getAll();
  }

  @Get('/:id')
  @HttpCode(200)
  getOne(@Param() { id }) {
    return this.userService.getOne({ id });
  }

  @Post()
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('avatar', uploadFilesOptions))
  createOne(@Body() body) {
    return this.userService.createOne(body);
  }
}
