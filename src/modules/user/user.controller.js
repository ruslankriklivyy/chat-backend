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
exports.UserController = void 0;
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var upload_files_options_1 = require("@/utils/upload-files-options");
var jwt_guard_1 = require("@/modules/auth/guard/jwt.guard");
var UserController = /** @class */ (function () {
    function UserController(userService) {
        this.userService = userService;
    }
    UserController.prototype.getAll = function () {
        return this.userService.getAll();
    };
    UserController.prototype.getOne = function (_a) {
        var id = _a.id;
        return this.userService.getOne({ id: id });
    };
    UserController.prototype.createOne = function (body) {
        return this.userService.createOne(body);
    };
    __decorate([
        (0, common_1.Get)(),
        (0, common_1.HttpCode)(200)
    ], UserController.prototype, "getAll");
    __decorate([
        (0, common_1.Get)('/:id'),
        (0, common_1.HttpCode)(200),
        __param(0, (0, common_1.Param)())
    ], UserController.prototype, "getOne");
    __decorate([
        (0, common_1.Post)(),
        (0, common_1.HttpCode)(200),
        (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar', upload_files_options_1.uploadFilesOptions)),
        __param(0, (0, common_1.Body)())
    ], UserController.prototype, "createOne");
    UserController = __decorate([
        (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
        (0, common_1.Controller)('users')
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;
