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
exports.AuthController = void 0;
var common_1 = require("@nestjs/common");
var jwt_guard_1 = require("@/modules/auth/guard/jwt.guard");
var AuthController = /** @class */ (function () {
    function AuthController(authService) {
        this.authService = authService;
    }
    AuthController.prototype.register = function (body) {
        return this.authService.register(body);
    };
    AuthController.prototype.login = function (body) {
        return this.authService.login(body);
    };
    AuthController.prototype.refresh = function (body) {
        return this.authService.refresh(body);
    };
    AuthController.prototype.logout = function (body) {
        return this.authService.logout(body);
    };
    __decorate([
        (0, common_1.Post)('register'),
        (0, common_1.HttpCode)(201),
        __param(0, (0, common_1.Body)())
    ], AuthController.prototype, "register");
    __decorate([
        (0, common_1.Post)('login'),
        (0, common_1.HttpCode)(200),
        __param(0, (0, common_1.Body)())
    ], AuthController.prototype, "login");
    __decorate([
        (0, common_1.Post)('refresh'),
        (0, common_1.HttpCode)(200),
        __param(0, (0, common_1.Body)())
    ], AuthController.prototype, "refresh");
    __decorate([
        (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
        (0, common_1.Post)('logout'),
        (0, common_1.HttpCode)(200),
        __param(0, (0, common_1.Body)())
    ], AuthController.prototype, "logout");
    AuthController = __decorate([
        (0, common_1.Controller)('auth')
    ], AuthController);
    return AuthController;
}());
exports.AuthController = AuthController;
