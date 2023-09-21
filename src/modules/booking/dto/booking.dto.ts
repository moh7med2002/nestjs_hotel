import { IsNotEmpty, IsDateString, Validate } from 'class-validator';
import { IsDateRangeValid } from './date-range.validator';

export class BookingDto {
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date;

  @IsNotEmpty()
  roomId: string | number;
}
