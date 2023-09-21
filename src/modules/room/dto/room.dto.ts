import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, Max, Min } from 'class-validator';

export class RoomDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  @Min(1)
  @Type(() => Number) // Use Type decorator to transform the value to a number
  price: string;

  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  @Min(1)
  @Max(7)
  @Type(() => Number) // Use Type decorator to transform the value to a number
  maxCount: number;
}
