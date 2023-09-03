import { Module } from '@nestjs/common';
import { roomImageRepositry } from 'src/constants/entityRepositry';
import { RoomImage } from './roomImage.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: roomImageRepositry,
      useValue: RoomImage,
    },
  ],
})
export class RoomImageModule {}
