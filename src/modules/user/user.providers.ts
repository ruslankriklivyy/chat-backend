import { DataSource } from 'typeorm';

import { User } from '@/modules/user/user.entity';
import { REPOSITORIES } from '@/utils/consts';

export const userProviders = [
  {
    provide: REPOSITORIES.USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
