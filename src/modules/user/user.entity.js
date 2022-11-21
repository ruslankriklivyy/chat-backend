"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.User = void 0;
var typeorm_1 = require("typeorm");
var room_entity_1 = require("@/modules/room/room.entity");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], User.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', unique: true })
    ], User.prototype, "email");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], User.prototype, "avatar_url");
    __decorate([
        (0, typeorm_1.Column)()
    ], User.prototype, "full_name");
    __decorate([
        (0, typeorm_1.Column)()
    ], User.prototype, "password");
    __decorate([
        (0, typeorm_1.Column)()
    ], User.prototype, "is_online");
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return room_entity_1.Room; }),
        (0, typeorm_1.Column)('int', { array: true, nullable: true })
    ], User.prototype, "rooms_ids");
    User = __decorate([
        (0, typeorm_1.Entity)()
    ], User);
    return User;
}());
exports.User = User;
