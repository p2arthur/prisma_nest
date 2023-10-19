import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule, LoggerModule } from '@app/common';
import { PrismaService } from '@app/common/database/PrismaServices';
import { ReservationRepository } from './reservations.repository';

import { pinoHttp } from 'pino-http';

@Module({
  imports: [DatabaseModule, LoggerModule],
  controllers: [ReservationsController],
  providers: [ReservationsService, PrismaService, ReservationRepository],
})
export class ReservationsModule {}
