import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { JwtStrategy } from 'apps/auth/src/strategies/jwt.strategy';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.createReservation(createReservationDto);
  }

  @Get()
  findAll() {
    console.log('finding reservations');
    return this.reservationsService.findAllReservations();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOneReservation(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.updateReservation(id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.removeReservation(id);
  }
}
