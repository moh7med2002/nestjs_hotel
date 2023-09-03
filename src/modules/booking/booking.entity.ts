import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  BeforeFind,
} from 'sequelize-typescript';
import { Room } from '../room/room.entity';
import { User } from '../user/user.entity';
import { BookingStatus } from 'src/constants/enums';

@Table
export class Booking extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  startDate: Date;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  endDate: Date;

  @Column({ type: DataType.DOUBLE, allowNull: false, defaultValue: 0 })
  price: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  isPaid: boolean;

  @Column({
    type: DataType.ENUM(BookingStatus.accept, BookingStatus.reject),
    defaultValue: BookingStatus.accept,
  })
  status: BookingStatus;

  @ForeignKey(() => Room)
  @Column
  roomId: number;

  @BelongsTo(() => Room)
  room: Room;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({ type: DataType.VIRTUAL })
  get active(): boolean | null {
    const currentDate = new Date();
    if (currentDate >= this.startDate && currentDate <= this.endDate) {
      return true;
    }
    return false;
  }

  @BeforeFind
  static addActiveVirtualField(instance: Booking): void {
    if (instance.startDate && instance.endDate) {
      instance.setDataValue('active', instance.active);
    }
  }
}
