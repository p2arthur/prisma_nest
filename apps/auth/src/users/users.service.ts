import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { PrismaService } from '@app/common/database/PrismaServices';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.prismaService.user.create({ data: createUserDto });
    return user;
  }

  async findAllUsers() {
    const users = await this.prismaService.user.findMany();
    return users;
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({ where: { id } });
    return user;
  }
}
