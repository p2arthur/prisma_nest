import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { CurrentUser } from '../decorators/current-user.decorator';
import { GetUserDto } from './dtos/get-user.dto';
import { User } from '@prisma/client';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get()
  // getUsers() {
  //   const users = this.usersService.findAllUsers();
  //   return users;
  // }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    console.log('Creating user: body');
    const user = this.usersService.createUser(createUserDto);
    return user;
  }

  @Get('/:id')
  async findUserById(@Param('id') id: string) {
    const user = this.usersService.findUserById(id);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUser(@CurrentUser() currentUser: User) {
    return currentUser;
  }
}
