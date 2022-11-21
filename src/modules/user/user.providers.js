"use strict";
exports.__esModule = true;
exports.userProviders = void 0;
var user_entity_1 = require("@/modules/user/user.entity");
var consts_1 = require("@/utils/consts");
exports.userProviders = [
    {
        provide: consts_1.REPOSITORIES.USER_REPOSITORY,
        useFactory: function (dataSource) { return dataSource.getRepository(user_entity_1.User); },
        inject: ['DATA_SOURCE']
    },
];
