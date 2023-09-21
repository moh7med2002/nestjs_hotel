import { Module } from '@nestjs/common';
import { roomRepositry, userRepositry } from 'src/constants/entityRepositry';
import { Room } from './room.entity';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { RoomImageModule } from '../roomImage/roomImage.module';

@Module({
  controllers: [RoomController],
  providers: [
    {
      provide: roomRepositry,
      useValue: Room,
    },
    RoomService,
  ],
  imports: [RoomImageModule],
  exports: [RoomService],
})
export class RoomModule {}
