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
exports.FileController = void 0;
var common_1 = require("@nestjs/common");
var fs_1 = require("fs");
var jwt_guard_1 = require("@/modules/auth/guard/jwt.guard");
var platform_express_1 = require("@nestjs/platform-express");
var upload_files_options_1 = require("@/utils/upload-files-options");
var consts_1 = require("@/utils/consts");
var path_1 = require("path");
var FileController = /** @class */ (function () {
    function FileController(fileService) {
        this.fileService = fileService;
    }
    FileController.prototype.getFile = function (filename, res) {
        return __awaiter(this, void 0, void 0, function () {
            var fileType, contentType, filePath, readStream;
            return __generator(this, function (_a) {
                fileType = filename.split('.').pop();
                contentType = 'text/plain';
                if (fileType) {
                    contentType = "image/".concat(fileType);
                }
                if (fileType === 'svg') {
                    contentType = 'image/svg+xml';
                }
                if (fileType === 'html') {
                    contentType = 'text/html';
                }
                res.set({
                    'Content-Type': contentType
                });
                filePath = (0, path_1.join)(process.cwd(), "".concat(consts_1.FILES.FILES_PATH).concat(filename));
                readStream = (0, fs_1.createReadStream)(filePath);
                readStream.on('error', function (err) {
                    console.error(err);
                });
                return [2 /*return*/, new common_1.StreamableFile(readStream)];
            });
        });
    };
    FileController.prototype.createOne = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fileService.createOne({ file: file })];
            });
        });
    };
    __decorate([
        (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
        (0, common_1.Get)('/:filename'),
        __param(0, (0, common_1.Param)('filename')),
        __param(1, (0, common_1.Res)({ passthrough: true }))
    ], FileController.prototype, "getFile");
    __decorate([
        (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
        (0, common_1.Post)('/'),
        (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', upload_files_options_1.uploadFilesOptions)),
        __param(0, (0, common_1.UploadedFile)())
    ], FileController.prototype, "createOne");
    FileController = __decorate([
        (0, common_1.Controller)('file')
    ], FileController);
    return FileController;
}());
exports.FileController = FileController;
