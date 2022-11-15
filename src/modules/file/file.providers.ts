import { DataSource } from 'typeorm';

import { REPOSITORIES } from '@/utils/consts';
import { File } from '@/modules/file/file.entity';
import { User } from '@/modules/user/user.entity';

export const fileProviders = [
  {
    provide: REPOSITORIES.FILE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(File),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: REPOSITORIES.USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
