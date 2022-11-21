"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var bcrypt = require("bcrypt");
var consts_1 = require("@/utils/consts");
var AuthService = /** @class */ (function () {
    function AuthService(userRepository, userService, tokenService) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.tokenService = tokenService;
    }
    AuthService.prototype.register = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var email, full_name, password, user, hashPassword, userPayload, _a, accessToken, refreshToken, newUser;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        email = payload.email, full_name = payload.full_name, password = payload.password;
                        return [4 /*yield*/, this.userRepository.findOneBy({
                                email: (0, typeorm_1.Equal)(email)
                            })];
                    case 1:
                        user = _b.sent();
                        if (user) {
                            throw new common_1.HttpException({
                                status: common_1.HttpStatus.BAD_REQUEST,
                                message: 'Email is already use'
                            }, common_1.HttpStatus.BAD_REQUEST);
                        }
                        return [4 /*yield*/, bcrypt.hash(password, consts_1.AUTHORIZATION.SALT_ROUNDS)];
                    case 2:
                        hashPassword = _b.sent();
                        userPayload = {
                            email: email,
                            full_name: full_name,
                            password: hashPassword,
                            is_online: false
                        };
                        return [4 /*yield*/, this.tokenService.generateTokens(userPayload)];
                    case 3:
                        _a = _b.sent(), accessToken = _a.accessToken, refreshToken = _a.refreshToken;
                        return [4 /*yield*/, this.userRepository.save(__assign({}, userPayload))];
                    case 4:
                        newUser = _b.sent();
                        return [4 /*yield*/, this.tokenService.createOne({ userId: newUser.id, refreshToken: refreshToken })];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, {
                                user: newUser,
                                access_token: accessToken,
                                refresh_token: refreshToken
                            }];
                }
            });
        });
    };
    AuthService.prototype.login = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, user, isEqualsPassword, _a, accessToken, refreshToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        email = payload.email, password = payload.password;
                        return [4 /*yield*/, this.userRepository.findOneBy({
                                email: (0, typeorm_1.Equal)(email)
                            })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            throw new common_1.HttpException({
                                status: common_1.HttpStatus.BAD_REQUEST,
                                message: 'Email or password is incorrect'
                            }, common_1.HttpStatus.BAD_REQUEST);
                        }
                        return [4 /*yield*/, bcrypt.compare(password, user.password)];
                    case 2:
                        isEqualsPassword = _b.sent();
                        if (!isEqualsPassword) {
                            throw new common_1.HttpException({
                                status: common_1.HttpStatus.BAD_REQUEST,
                                message: 'Email or password is incorrect'
                            }, common_1.HttpStatus.BAD_REQUEST);
                        }
                        return [4 /*yield*/, this.tokenService.generateTokens(user)];
                    case 3:
                        _a = _b.sent(), accessToken = _a.accessToken, refreshToken = _a.refreshToken;
                        return [4 /*yield*/, this.tokenService.createOne({ userId: user.id, refreshToken: refreshToken })];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, {
                                user: user,
                                access_token: accessToken,
                                refresh_token: refreshToken
                            }];
                }
            });
        });
    };
    AuthService.prototype.refresh = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var refresh_token, decodedData, token, user, _a, accessToken, refreshToken, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        refresh_token = payload.refresh_token;
                        return [4 /*yield*/, this.tokenService.validateRefreshToken(refresh_token)];
                    case 1:
                        decodedData = _b.sent();
                        return [4 /*yield*/, this.tokenService.findRefreshToken(refresh_token)];
                    case 2:
                        token = _b.sent();
                        return [4 /*yield*/, this.userRepository.findOneBy({
                                email: decodedData.email
                            })];
                    case 3:
                        user = _b.sent();
                        if (!decodedData || !token || !user) {
                            throw new common_1.HttpException({
                                status: common_1.HttpStatus.UNAUTHORIZED,
                                message: 'Unauthorized'
                            }, common_1.HttpStatus.UNAUTHORIZED);
                        }
                        return [4 /*yield*/, this.tokenService.generateTokens(user)];
                    case 4:
                        _a = _b.sent(), accessToken = _a.accessToken, refreshToken = _a.refreshToken;
                        return [2 /*return*/, {
                                user: user,
                                access_token: accessToken,
                                refresh_token: refreshToken
                            }];
                    case 5:
                        e_1 = _b.sent();
                        throw new common_1.HttpException({
                            status: common_1.HttpStatus.UNAUTHORIZED,
                            message: 'Unauthorized'
                        }, common_1.HttpStatus.UNAUTHORIZED);
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.logout = function (payload) {
        var refresh_token = payload.refresh_token;
        return this.tokenService.removeRefreshToken(refresh_token);
    };
    AuthService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, common_1.Inject)(consts_1.REPOSITORIES.USER_REPOSITORY))
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
