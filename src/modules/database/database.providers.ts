import TypeOrmConfig from '@/config/type-orm.config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      return TypeOrmConfig.initialize();
    },
  },
];
