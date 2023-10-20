import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    const users = this.usersService.findAllUsers();
    return users;
  }

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
}
