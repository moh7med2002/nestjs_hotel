import {
  Column,
  Table,
  Model,
  DataType,
  HasMany,
  Scopes,
} from 'sequelize-typescript';
import { Booking } from '../booking/booking.entity';

@Table
@Scopes(() => ({
  withoutTimeStamps: {
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  },
}))
export class User extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: '',
    unique: true,
  })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  image: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: '',
    unique: true,
  })
  ssn: string;

  @HasMany(() => Booking)
  bookings: Booking[];
}
