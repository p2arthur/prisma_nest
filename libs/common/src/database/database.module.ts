import { Module } from '@nestjs/common';
import { PrismaService } from './PrismaServices';

@Module({
  imports: [],
  providers: [PrismaService],
})
export class DatabaseModule {}
