import { Injectable, Inject } from '@nestjs/common';
import {
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common/exceptions';
import { roomRepositry } from 'src/constants/entityRepositry';
import { Room } from './room.entity';
import { RoomDto } from './dto';
import { RoomImageService } from '../roomImage/roomImage.service';
import { RoomImage } from '../roomImage/roomImage.entity';
import { Sequelize } from 'sequelize';
import { Booking } from '../booking/booking.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class RoomService {
  constructor(
    @Inject(roomRepositry)
    private roomRepositry: typeof Room,
    private imageService: RoomImageService,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  async createRoom(dto: RoomDto, images: Express.Multer.File[]) {
    const createdRoom = await this.roomRepositry.create({
      name: dto.name,
      maxCount: dto.maxCount,
      description: dto.description,
      price: dto.price,
    });
    await this.imageService.addImagesToRoom(images, createdRoom.id);
    return { message: 'create room success' };
  }

  async roomById(id) {
    const room = await this.roomRepositry.findByPk(id);
    if (!room) {
      throw new BadRequestException('invalid romm id');
    }
    return room;
  }

  async fetchAllRooms() {
    const rooms = await this.roomRepositry.scope('withBookingCount').findAll({
      include: [
        {
          model: RoomImage,
          attributes: ['id', 'path'],
        },
        {
          model: Booking,
          attributes: [],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    return { rooms };
  }

  async singleRoom(roomId: string) {
    const room = await this.roomRepositry
      .scope('withBookingCount')
      .findByPk(roomId, {
        include: [
          {
            model: RoomImage,
            attributes: ['id', 'path'],
          },
          {
            model: Booking,
            attributes: ['id', 'price', 'startDate', 'endDate'],
          },
        ],
        order: [['createdAt', 'DESC']],
      });
    if (!room) {
      throw new BadRequestException('invalid id');
    }
    return { room };
  }
}
