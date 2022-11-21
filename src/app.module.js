"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var pino_1 = require("pino");
var nestjs_pino_1 = require("nestjs-pino");
var user_module_1 = require("@/modules/user/user.module");
var auth_module_1 = require("@/modules/auth/auth.module");
var token_module_1 = require("@/modules/token/token.module");
var file_module_1 = require("@/modules/file/file.module");
var room_module_1 = require("./modules/room/room.module");
var message_module_1 = require("./modules/message/message.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                nestjs_pino_1.LoggerModule.forRoot({
                    pinoHttp: {
                        timestamp: function () { return ",\"time\":\"".concat(new Date(Date.now()).toISOString(), "\""); },
                        stream: pino_1["default"].destination({
                            dest: './logs',
                            minLength: 4096,
                            sync: false
                        })
                    }
                }),
                config_1.ConfigModule.forRoot({ isGlobal: true }),
                user_module_1.UserModule,
                auth_module_1.AuthModule,
                token_module_1.TokenModule,
                file_module_1.FileModule,
                room_module_1.RoomModule,
                message_module_1.MessageModule,
            ],
            controllers: [],
            providers: []
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
