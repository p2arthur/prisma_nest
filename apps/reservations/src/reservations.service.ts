import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservations.repository';
import { PrismaService } from '@app/common/database/PrismaServices';
import { Reservation } from '@prisma/client';
@Injectable()
export class ReservationsService {
  constructor(private readonly prismaService: PrismaService) {}
  private reservation: Reservation;
  private reservations: Reservation[];

  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    this.reservation = await this.prismaService.reservation.create({
      data: { ...createReservationDto, timestamp: new Date() },
    });

    return this.reservation;
  }

  async findAll() {
    this.reservations = await this.prismaService.reservation.findMany();
    if (this.reservations.length <= 0) {
      throw new NotFoundException();
    }
    return this.reservations;
  }

  async findOne(id: string) {
    this.reservation = await this.prismaService.reservation.findUnique({
      where: { id },
    });

    if (!this.reservation) {
      throw new NotFoundException();
    }
    return this.reservation;
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    const reservationToUpdate = await this.prismaService.reservation.findUnique(
      { where: { id } },
    );

    if (!reservationToUpdate) {
      throw new NotFoundException();
    }

    this.reservation = await this.prismaService.reservation.update({
      where: { id },
      data: updateReservationDto,
    });
  }

  async remove(id: string) {
    const reservationToDelete = await this.prismaService.reservation.findUnique(
      { where: { id } },
    );

    if (!reservationToDelete) {
      throw new NotFoundException();
    }

    this.reservation = await this.prismaService.reservation.delete({
      where: { id },
    });
  }
}
