import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { roomProviders } from '@/modules/room/room.providers';
import { DatabaseModule } from '@/modules/database/database.module';
import { RoomGateway } from '@/modules/room/room.gateway';

@Module({
  imports: [DatabaseModule],
  providers: [...roomProviders, RoomService, RoomGateway],
})
export class RoomModule {}
