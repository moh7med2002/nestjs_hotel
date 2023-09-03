import { Module } from '@nestjs/common';
import { roomRepositry, userRepositry } from 'src/constants/entityRepositry';
import { Room } from './room.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: roomRepositry,
      useValue: Room,
    },
  ],
})
export class RoomModule {}
