import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { PrismaService } from '@app/common/database/PrismaServices';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const password = await bcrypt.hash(createUserDto.password, 10);
    const user = this.prismaService.user.create({
      data: { ...createUserDto, password },
    });
    return user;
  }

  async findAllUsers() {
    const users = await this.prismaService.user.findMany();
    return users;
  }

  async findUserById(getUserDto): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: { id: getUserDto },
    });
    return user;
  }

  async verifyUser(email: string, password: string) {
    const user = await this.prismaService.user.findFirst({ where: { email } });
    console.log('verify user find', user);
    if (!user) {
      throw new NotFoundException('Theres no user with this email');
    }

    console.log(password, user.password);

    const passwordIsValid = await bcrypt.compare(password, user.password);
    console.log(passwordIsValid);

    if (!passwordIsValid) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
