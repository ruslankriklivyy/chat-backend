import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from '@/modules/user/user.entity';
import { REPOSITORIES } from '@/utils/consts';
import {
  ICreateUserPayload,
  IUpdateUserPayload,
} from '@/modules/user/user.interfaces';

@Injectable()
export class UserService {
  constructor(
    @Inject(REPOSITORIES.USER_REPOSITORY)
    private readonly userRepository: Repository<User>,
  ) {}

  getAll() {
    return this.userRepository.find({
      select: {
        id: true,
        email: true,
        avatar_url: true,
        is_online: true,
        full_name: true,
        rooms: true,
      },
    });
  }

  getOne(payload: Record<string, any>) {
    return this.userRepository.findOneBy(payload);
  }

  createOne(payload: ICreateUserPayload) {
    const dirtyData =
      (payload.body?.data && JSON.parse(payload.body.data)) || {};

    const user = {
      email: dirtyData.email,
      full_name: dirtyData.full_name,
      is_online: false,
    };

    return this.userRepository.create(user);
  }

  updateOne(payload: IUpdateUserPayload) {
    return this.userRepository.update(payload.field, payload.value);
  }
}
