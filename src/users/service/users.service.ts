import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users.entity';
import { CreateUsersDto } from '../dto/create-users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getOne(id: number): Promise<User | null> {
    const existing = await this.userRepository.findOne({
      where: { id: id },
      withDeleted: true,
    });

    if (!existing) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return existing;
  }

  async getOneByUsername(username: string): Promise<User | null> {
    const existing = await this.userRepository.findOne({
      where: { username: username },
      withDeleted: true,
    });

    return existing;
  }

  async create(dto: CreateUsersDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username: dto.username },
    });
    if (user) {
      throw new UnauthorizedException('User already exists');
    }

    if (!dto.password) {
      throw new BadRequestException('Password is required');
    }
    const hashed = bcrypt.hash(dto.password, 10);

    return await this.userRepository.save({ ...dto, password: hashed });
  }
}
