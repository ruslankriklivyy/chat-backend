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
exports.RoomGateway = void 0;
var websockets_1 = require("@nestjs/websockets");
var users = {};
var rooms = [];
var RoomGateway = /** @class */ (function () {
    function RoomGateway() {
    }
    RoomGateway.prototype.getAll = function () {
        this.server.emit('rooms', rooms);
    };
    RoomGateway.prototype.createOne = function (body) {
        console.log(body);
        rooms.push(body);
        this.server.emit('createRoom', body);
        this.getAll();
    };
    RoomGateway.prototype.handleConnection = function (client) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var userName = client.handshake.query.userName;
        var socketId = client.id;
        users[socketId] = userName;
        client.broadcast.emit('log', "".concat(userName, " connected"));
    };
    RoomGateway.prototype.handleDisconnect = function (client) {
        var socketId = client.id;
        var userName = users[socketId];
        delete users[socketId];
        client.broadcast.emit('log', "".concat(userName, " disconnected"));
    };
    __decorate([
        (0, websockets_1.WebSocketServer)()
    ], RoomGateway.prototype, "server");
    __decorate([
        (0, websockets_1.SubscribeMessage)('getRooms')
    ], RoomGateway.prototype, "getAll");
    __decorate([
        (0, websockets_1.SubscribeMessage)('createRoom'),
        __param(0, (0, websockets_1.MessageBody)())
    ], RoomGateway.prototype, "createOne");
    RoomGateway = __decorate([
        (0, websockets_1.WebSocketGateway)(80, { cors: { origin: '*' } })
    ], RoomGateway);
    return RoomGateway;
}());
exports.RoomGateway = RoomGateway;
