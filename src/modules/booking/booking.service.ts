import { Injectable, Inject } from '@nestjs/common';
import {
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common/exceptions';
import { bookingRepositry } from 'src/constants/entityRepositry';
import { Booking } from './booking.entity';
import { BookingDto } from './dto';
import { RoomService } from '../room/room.service';
import { Op } from 'sequelize';
import { BookingStatus } from 'src/constants/enums';
import { User } from '../user/user.entity';

@Injectable()
export class BookingService {
  constructor(
    @Inject(bookingRepositry)
    private bookingRepositry: typeof Booking,
    private roomService: RoomService,
  ) {}

  async createBooking(dto: BookingDto, userId: number) {
    const room = await this.roomService.roomById(dto.roomId);
    const startDate = new Date(dto.startDate);
    const endDate = new Date(dto.endDate);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    const isFoundBooking = await this.bookingRepositry.findOne({
      where: {
        startDate: { [Op.lte]: new Date() },
        endDate: { [Op.gte]: new Date() },
        status: BookingStatus.accept,
        roomId: dto.roomId,
      },
    });
    if (isFoundBooking) {
      throw new BadRequestException(
        'this room already booking during this days',
      );
    }
    await this.bookingRepositry.create({
      roomId: dto.roomId,
      startDate: dto.startDate,
      endDate: dto.endDate,
      userId,
      price: daysDifference * room.price,
    });
    return { message: 'booking has been created', isFoundBooking };
  }

  async userOwnBooking(userId: number) {
    const bookings = await this.bookingRepositry.findAll({
      where: { userId },
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'image', 'ssn', 'phone'],
        },
      ],
    });
    return { bookings };
  }

  async cancelBooking(id: string) {
    const booking = await this.bookingRepositry.findByPk(id);
    if (!booking) {
      throw new BadRequestException('invalid id');
    }
    booking.status = BookingStatus.reject;
    await booking.save();
    return { message: 'success' };
  }
}
