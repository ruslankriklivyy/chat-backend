import { DataSource } from 'typeorm';

import { Token } from '@/modules/token/token.entity';
import { REPOSITORIES } from '@/utils/consts';

export const tokenProviders = [
  {
    provide: REPOSITORIES.TOKEN_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Token),
    inject: ['DATA_SOURCE'],
  },
];
