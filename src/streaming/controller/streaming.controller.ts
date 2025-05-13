import {
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { StreamingService } from '../service/streaming.service';
import { CreateStreamingDto } from '../dto/create-streaming.dto';
import { UpdateStreamingDto } from '../dto/update-streaming.dto';

@Controller('streaming')
export class StreamingController {
  constructor(private streamingService: StreamingService) {}

  @Get()
  async getAll() {
    return await this.streamingService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.streamingService.getOne(id);
  }

  @Post()
  async create(@Body() streaming: CreateStreamingDto) {
    return await this.streamingService.create(streaming);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() streaming: UpdateStreamingDto,
  ) {
    return await this.streamingService.update(id, streaming);
  }

  @Delete(':id')
  async delete(@Param() id: number): Promise<DeleteResult> {
    return await this.streamingService.delete(id);
  }
}
