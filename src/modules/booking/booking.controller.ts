import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Put,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { AuthGuard } from 'src/common/util/guards.stradegey';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/types/role.enum';
import { BookingDto } from './dto';
import { SaveUser } from 'src/common/decorator/SaveUser';
import { tokenPayload } from 'src/common/types/payload.token';

@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  @Roles(Role.User)
  create(@Body() dto: BookingDto, @SaveUser() user: tokenPayload) {
    return this.bookingService.createBooking(dto, user.userId);
  }

  @Get('user/own/:userId')
  @UseGuards(AuthGuard)
  @Roles(Role.User, Role.Admin)
  getUserBooking(@Param('userId') userId: string) {
    return this.bookingService.userOwnBooking(+userId);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  cancelBooking(@Param('id') id: string) {
    return this.bookingService.cancelBooking(id);
  }
}
