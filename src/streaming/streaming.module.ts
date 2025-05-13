import { Module } from '@nestjs/common';
import { StreamingService } from './service/streaming.service';
import { StreamingController } from './controller/streaming.controller';
import { Streaming } from './streaming.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Streaming])],
  providers: [StreamingService],
  controllers: [StreamingController],
})
export class StreamingModule {}
