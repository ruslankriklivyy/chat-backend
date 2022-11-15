import { DataSource } from 'typeorm';

import { REPOSITORIES } from '@/utils/consts';
import { User } from '@/modules/user/user.entity';
import { Token } from '@/modules/token/token.entity';
import { File } from '@/modules/file/file.entity';

export const authProviders = [
  {
    provide: REPOSITORIES.USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: REPOSITORIES.TOKEN_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Token),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: REPOSITORIES.FILE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(File),
    inject: ['DATA_SOURCE'],
  },
];
