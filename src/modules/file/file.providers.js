"use strict";
exports.__esModule = true;
exports.fileProviders = void 0;
var consts_1 = require("@/utils/consts");
var file_entity_1 = require("@/modules/file/file.entity");
var user_entity_1 = require("@/modules/user/user.entity");
exports.fileProviders = [
    {
        provide: consts_1.REPOSITORIES.FILE_REPOSITORY,
        useFactory: function (dataSource) { return dataSource.getRepository(file_entity_1.File); },
        inject: ['DATA_SOURCE']
    },
    {
        provide: consts_1.REPOSITORIES.USER_REPOSITORY,
        useFactory: function (dataSource) { return dataSource.getRepository(user_entity_1.User); },
        inject: ['DATA_SOURCE']
    },
];
