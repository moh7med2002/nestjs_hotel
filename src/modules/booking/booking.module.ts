import { Module } from '@nestjs/common';
import { bookingRepositry } from 'src/constants/entityRepositry';
import { Booking } from './booking.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: bookingRepositry,
      useValue: Booking,
    },
  ],
})
export class BookingModule {}
