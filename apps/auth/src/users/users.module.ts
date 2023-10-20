import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '@app/common/database/PrismaServices';

@Module({
  providers: [UsersService, PrismaService],
  controllers: [UsersController],
})
export class UsersModule {}
