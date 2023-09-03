import { Sequelize } from 'sequelize-typescript';
import { Admin } from 'src/modules/admin/admin.entity';
import { Booking } from 'src/modules/booking/booking.entity';
import { Room } from 'src/modules/room/room.entity';
import { RoomImage } from 'src/modules/roomImage/roomImage.entity';
import { User } from 'src/modules/user/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '059283805928388',
        database: 'hotel',
      });
      sequelize.addModels([Admin, User, Room, RoomImage, Booking]);
      await sequelize.sync({ alter: true });
      return sequelize;
    },
  },
];
