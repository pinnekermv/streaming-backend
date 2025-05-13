import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Streaming } from '../streaming.entity';
import { CreateStreamingDto } from '../dto/create-streaming.dto';
import { UpdateStreamingDto } from '../dto/update-streaming.dto';

@Injectable()
export class StreamingService {
  constructor(
    @InjectRepository(Streaming)
    private streamingRepository: Repository<Streaming>,
  ) {}

  async getAll(): Promise<Streaming[]> {
    return await this.streamingRepository.find();
  }

  async getOne(id: number): Promise<Streaming | null> {
    const existing = await this.streamingRepository.findOne({
      where: { id: id },
      withDeleted: true,
    });

    if (!existing) {
      throw new NotFoundException(`Streaming with id ${id} not found`);
    }

    return existing;
  }

  async create(streaming: CreateStreamingDto): Promise<Streaming> {
    const existing = await this.streamingRepository.findOne({
      where: { title: streaming.title },
    });
    if (existing) {
      throw new ConflictException(
        `Streaming with title "${streaming.title}" already exists`,
      );
    }
    return await this.streamingRepository.save(streaming);
  }

  async update(
    id: number,
    streaming: UpdateStreamingDto,
  ): Promise<Streaming | null> {
    const existing = await this.streamingRepository.findOneBy({ id });

    if (!existing) {
      throw new NotFoundException(`Streaming with id ${id} not found`);
    }

    const duplicate = await this.streamingRepository.findOne({
      where: { title: streaming.title },
    });

    if (duplicate && duplicate.id !== id) {
      throw new ConflictException(
        `Streaming with title "${streaming.title}" already exists`,
      );
    }

    return await this.streamingRepository.save(streaming);
  }

  async delete(id: number): Promise<DeleteResult> {
    const result = await this.streamingRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Streaming #${id} not found`);
    }

    return result;
  }
}
