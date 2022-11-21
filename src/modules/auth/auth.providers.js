"use strict";
exports.__esModule = true;
exports.authProviders = void 0;
var consts_1 = require("@/utils/consts");
var user_entity_1 = require("@/modules/user/user.entity");
var token_entity_1 = require("@/modules/token/token.entity");
var file_entity_1 = require("@/modules/file/file.entity");
exports.authProviders = [
    {
        provide: consts_1.REPOSITORIES.USER_REPOSITORY,
        useFactory: function (dataSource) { return dataSource.getRepository(user_entity_1.User); },
        inject: ['DATA_SOURCE']
    },
    {
        provide: consts_1.REPOSITORIES.TOKEN_REPOSITORY,
        useFactory: function (dataSource) { return dataSource.getRepository(token_entity_1.Token); },
        inject: ['DATA_SOURCE']
    },
    {
        provide: consts_1.REPOSITORIES.FILE_REPOSITORY,
        useFactory: function (dataSource) { return dataSource.getRepository(file_entity_1.File); },
        inject: ['DATA_SOURCE']
    },
];
