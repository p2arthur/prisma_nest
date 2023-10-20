import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule, LoggerModule } from '@app/common';
import { PrismaService } from '@app/common/database/PrismaServices';
import { ReservationRepository } from './reservations.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/reservations/reservations.env',
    }),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, PrismaService, ReservationRepository],
})
export class ReservationsModule {}
