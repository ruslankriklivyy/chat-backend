import { DataSource } from 'typeorm';

import { REPOSITORIES } from '@/utils/consts';
import { Room } from '@/modules/room/room.entity';

export const roomProviders = [
  {
    provide: REPOSITORIES.ROOM_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Room),
    inject: ['DATA_SOURCE'],
  },
];
