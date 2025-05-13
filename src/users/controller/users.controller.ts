import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUsersDto } from '../dto/create-users.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAll() {
    return await this.usersService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.getOne(id);
  }

  @Get(':username')
  async getOneByUsername(@Param() username: string) {
    return await this.usersService.getOneByUsername(username);
  }

  @Post()
  async create(@Body() user: CreateUsersDto) {
    return await this.usersService.create(user);
  }
}
