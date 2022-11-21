"use strict";
exports.__esModule = true;
exports.tokenProviders = void 0;
var token_entity_1 = require("@/modules/token/token.entity");
var consts_1 = require("@/utils/consts");
exports.tokenProviders = [
    {
        provide: consts_1.REPOSITORIES.TOKEN_REPOSITORY,
        useFactory: function (dataSource) { return dataSource.getRepository(token_entity_1.Token); },
        inject: ['DATA_SOURCE']
    },
];
