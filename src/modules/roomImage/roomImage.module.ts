import { Module } from '@nestjs/common';
import { roomImageRepositry } from 'src/constants/entityRepositry';
import { RoomImage } from './roomImage.entity';
import { RoomImageService } from './roomImage.service';

@Module({
  controllers: [],
  providers: [
    {
      provide: roomImageRepositry,
      useValue: RoomImage,
    },
    RoomImageService,
  ],
  exports: [RoomImageService],
})
export class RoomImageModule {}
