import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UsersService } from 'src/users/service/users.service';
import { CreateUsersDto } from 'src/users/dto/create-users.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() dto: CreateUsersDto) {
    if (!dto.password) {
      throw new BadRequestException('Password is required');
    }
    const user = await this.usersService.getOneByUsername(dto.username);
    // if (!user || !(await this.authService.validatePassword(dto.password, user.password))) {
    if (!user || dto.password != user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.authService.generateJwt({ id: user.id, username: user.username });
    return { token };
  }
}
