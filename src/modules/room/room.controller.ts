import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  Param,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { AuthGuard } from 'src/common/util/guards.stradegey';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/types/role.enum';
import { RoomDto } from './dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CustomStorage } from 'src/common/util/custom.storage';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('room')
export class RoomController {
  constructor(private ROOMService: RoomService) {}

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Post('create')
  @UseInterceptors(
    FilesInterceptor('images', 10, { storage: CustomStorage.storage }),
  )
  createRoom(
    @Body() dto: RoomDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (files.length === 0) {
      throw new BadRequestException('Upload one image at least');
    }
    return this.ROOMService.createRoom(dto, files);
  }

  @UseInterceptors(CacheInterceptor)
  @Get('all')
  getAllRooms() {
    return this.ROOMService.fetchAllRooms();
  }

  @Get(':roomId')
  singleRoom(@Param('roomId') roomId: string) {
    return this.ROOMService.singleRoom(roomId);
  }
}
