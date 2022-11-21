"use strict";
exports.__esModule = true;
exports.roomProviders = void 0;
var consts_1 = require("@/utils/consts");
var room_entity_1 = require("@/modules/room/room.entity");
exports.roomProviders = [
    {
        provide: consts_1.REPOSITORIES.ROOM_REPOSITORY,
        useFactory: function (dataSource) { return dataSource.getRepository(room_entity_1.Room); },
        inject: ['DATA_SOURCE']
    },
];
