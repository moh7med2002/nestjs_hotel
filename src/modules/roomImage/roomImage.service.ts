import { Injectable, Inject } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import {
  roomImageRepositry,
  roomRepositry,
} from 'src/constants/entityRepositry';
import { RoomImage } from './roomImage.entity';

@Injectable()
export class RoomImageService {
  constructor(
    @Inject(roomImageRepositry)
    private roomImageRepositry: typeof RoomImage,
  ) {}

  async addImagesToRoom(images: Express.Multer.File[], roomId) {
    await Promise.all(
      images.map(async (img) => {
        await this.roomImageRepositry.create({ path: img.filename, roomId });
      }),
    );
    return { message: 'add image to room success' };
  }
}
