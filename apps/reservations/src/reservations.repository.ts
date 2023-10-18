import { PrismaService } from '@app/common/database/PrismaServices';
import { AbstractRepository } from '@app/common/database/abstract.repository';
import { Reservation } from '@prisma/client';

export class ReservationRepository extends AbstractRepository<Reservation> {
  constructor(private readonly prismaServices: PrismaService) {
    super(prismaServices, 'Reservation');
  }
}
