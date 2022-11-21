"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.UserService = void 0;
var common_1 = require("@nestjs/common");
var consts_1 = require("@/utils/consts");
var UserService = /** @class */ (function () {
    function UserService(userRepository) {
        this.userRepository = userRepository;
    }
    UserService.prototype.getAll = function () {
        return this.userRepository.find({
            select: {
                id: true,
                email: true,
                avatar_url: true,
                is_online: true,
                full_name: true,
                rooms_ids: true
            }
        });
    };
    UserService.prototype.getOne = function (payload) {
        return this.userRepository.findOneBy(payload);
    };
    UserService.prototype.createOne = function (payload) {
        var _a;
        var dirtyData = (((_a = payload.body) === null || _a === void 0 ? void 0 : _a.data) && JSON.parse(payload.body.data)) || {};
        var user = {
            email: dirtyData.email,
            full_name: dirtyData.full_name,
            is_online: false
        };
        return this.userRepository.create(user);
    };
    UserService.prototype.updateOne = function (payload) {
        return this.userRepository.update(payload.field, payload.value);
    };
    UserService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, common_1.Inject)(consts_1.REPOSITORIES.USER_REPOSITORY))
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
