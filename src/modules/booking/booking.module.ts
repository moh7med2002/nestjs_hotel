import { Module } from '@nestjs/common';
import { bookingRepositry } from 'src/constants/entityRepositry';
import { Booking } from './booking.entity';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { RoomModule } from '../room/room.module';

@Module({
  controllers: [BookingController],
  providers: [
    {
      provide: bookingRepositry,
      useValue: Booking,
    },
    BookingService,
  ],
  imports: [RoomModule],
})
export class BookingModule {}
