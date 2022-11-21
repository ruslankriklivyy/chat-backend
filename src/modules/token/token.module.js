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
exports.TokenModule = void 0;
var common_1 = require("@nestjs/common");
var jwt_1 = require("@nestjs/jwt");
var token_service_1 = require("@/modules/token/token.service");
var token_providers_1 = require("@/modules/token/token.providers");
var database_module_1 = require("@/modules/database/database.module");
var TokenModule = /** @class */ (function () {
    function TokenModule() {
    }
    TokenModule = __decorate([
        (0, common_1.Module)({
            imports: [jwt_1.JwtModule.register({}), database_module_1.DatabaseModule],
            providers: __spreadArray(__spreadArray([], token_providers_1.tokenProviders, true), [token_service_1.TokenService], false)
        })
    ], TokenModule);
    return TokenModule;
}());
exports.TokenModule = TokenModule;
