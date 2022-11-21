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
exports.AuthModule = void 0;
var common_1 = require("@nestjs/common");
var auth_service_1 = require("./auth.service");
var auth_controller_1 = require("./auth.controller");
var database_module_1 = require("@/modules/database/database.module");
var token_service_1 = require("@/modules/token/token.service");
var file_service_1 = require("@/modules/file/file.service");
var user_service_1 = require("@/modules/user/user.service");
var jwt_1 = require("@nestjs/jwt");
var auth_providers_1 = require("@/modules/auth/auth.providers");
var jwt_strategy_1 = require("@/modules/auth/strategy/jwt.strategy");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        (0, common_1.Module)({
            imports: [jwt_1.JwtModule.register({}), database_module_1.DatabaseModule],
            providers: __spreadArray(__spreadArray([], auth_providers_1.authProviders, true), [
                jwt_strategy_1.JwtStrategy,
                auth_service_1.AuthService,
                token_service_1.TokenService,
                file_service_1.FileService,
                user_service_1.UserService,
            ], false),
            controllers: [auth_controller_1.AuthController]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
