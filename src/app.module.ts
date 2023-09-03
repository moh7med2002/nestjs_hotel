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

@Module({
  imports: [
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
  ],
  controllers: [AppController],
})
export class AppModule {}
