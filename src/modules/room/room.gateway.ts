import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

const users: Record<string, string> = {};
const rooms: string[] = [];

@WebSocketGateway(80, { cors: { origin: '*' } })
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  @SubscribeMessage('getRooms')
  getAll() {
    this.server.emit('rooms', rooms);
  }

  @SubscribeMessage('createRoom')
  createOne(@MessageBody() body: string) {
    console.log(body);
    rooms.push(body);
    this.server.emit('createRoom', body);
    this.getAll();
  }

  handleConnection(client: Socket, ...args: any[]) {
    const userName = client.handshake.query.userName as string;
    const socketId = client.id;
    users[socketId] = userName;

    client.broadcast.emit('log', `${userName} connected`);
  }

  handleDisconnect(client: Socket) {
    const socketId = client.id;
    const userName = users[socketId];
    delete users[socketId];

    client.broadcast.emit('log', `${userName} disconnected`);
  }
}
