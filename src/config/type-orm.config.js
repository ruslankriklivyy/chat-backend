"use strict";
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var config_1 = require("@nestjs/config");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var configService = new config_1.ConfigService();
exports["default"] = new typeorm_1.DataSource({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: ['dist/**/*.entity.{ts,js}'],
    migrations: ['dist/migrations/*.{ts,js}'],
    migrationsTableName: 'typeorm_migrations',
    logger: 'file',
    logging: true,
    synchronize: process.env.NODE_ENV !== 'PROD'
});
