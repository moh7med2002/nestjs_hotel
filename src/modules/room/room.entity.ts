import { Column, Table, Model, DataType, HasMany } from 'sequelize-typescript';
import { RoomImage } from '../roomImage/roomImage.entity';
import { Booking } from '../booking/booking.entity';

@Table
export class Room extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    defaultValue: '',
  })
  description: string;

  @Column({ type: DataType.DOUBLE, allowNull: false, defaultValue: 0 })
  price: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 1 })
  maxCount: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  active: boolean;

  @HasMany(() => RoomImage)
  images: RoomImage[];

  @HasMany(() => Booking)
  bookings: Booking[];
}
