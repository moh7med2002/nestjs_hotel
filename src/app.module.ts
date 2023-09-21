import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MulterModule } from '@nestjs/platform-express';
import { CustomStorage } from './common/util/custom.storage';
import { JwtModule } from '@nestjs/jwt';
import { GatewayModule } from './geteway/geteway.module';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';
import { RoomModule } from './modules/room/room.module';
import { RoomImage } from './modules/roomImage/roomImage.entity';
import { BookingModule } from './modules/booking/booking.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true, ttl: 5 }),
    JwtModule.register({ global: true, secret: 'token' }),
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: CustomStorage.storage,
      }),
    }),
    DatabaseModule,
    GatewayModule,
    AdminModule,
    UserModule,
    RoomModule,
    RoomImage,
    BookingModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
