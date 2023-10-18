import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule } from '@app/common';
import { PrismaService } from '@app/common/database/PrismaServices';
import { ReservationRepository } from './reservations.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [ReservationsController],
  providers: [ReservationsService, PrismaService, ReservationRepository],
})
export class ReservationsModule {}
