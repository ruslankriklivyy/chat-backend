"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.RoomModule = void 0;
var common_1 = require("@nestjs/common");
var room_service_1 = require("./room.service");
var room_providers_1 = require("@/modules/room/room.providers");
var database_module_1 = require("@/modules/database/database.module");
var room_gateway_1 = require("@/modules/room/room.gateway");
var RoomModule = /** @class */ (function () {
    function RoomModule() {
    }
    RoomModule = __decorate([
        (0, common_1.Module)({
            imports: [database_module_1.DatabaseModule],
            providers: __spreadArray(__spreadArray([], room_providers_1.roomProviders, true), [room_service_1.RoomService, room_gateway_1.RoomGateway], false)
        })
    ], RoomModule);
    return RoomModule;
}());
exports.RoomModule = RoomModule;
