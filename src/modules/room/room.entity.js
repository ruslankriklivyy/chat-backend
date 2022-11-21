"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Room = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("@/modules/user/user.entity");
var message_entity_1 = require("@/modules/message/message.entity");
var Room = /** @class */ (function () {
    function Room() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Room.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], Room.prototype, "name");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return message_entity_1.Message; }, function (message) { return message.room; }),
        (0, typeorm_1.Column)()
    ], Room.prototype, "messages");
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return user_entity_1.User; }),
        (0, typeorm_1.Column)('int', { array: true })
    ], Room.prototype, "users_ids");
    Room = __decorate([
        (0, typeorm_1.Entity)()
    ], Room);
    return Room;
}());
exports.Room = Room;
