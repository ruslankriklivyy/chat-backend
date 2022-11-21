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
exports.FileModule = void 0;
var common_1 = require("@nestjs/common");
var file_service_1 = require("./file.service");
var file_controller_1 = require("./file.controller");
var file_providers_1 = require("@/modules/file/file.providers");
var database_module_1 = require("@/modules/database/database.module");
var user_service_1 = require("@/modules/user/user.service");
var FileModule = /** @class */ (function () {
    function FileModule() {
    }
    FileModule = __decorate([
        (0, common_1.Module)({
            imports: [database_module_1.DatabaseModule],
            providers: __spreadArray(__spreadArray([], file_providers_1.fileProviders, true), [file_service_1.FileService, user_service_1.UserService], false),
            controllers: [file_controller_1.FileController]
        })
    ], FileModule);
    return FileModule;
}());
exports.FileModule = FileModule;
