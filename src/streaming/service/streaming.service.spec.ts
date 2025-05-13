import { Test, TestingModule } from '@nestjs/testing';
import { StreamingService } from './streaming.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Streaming } from '../streaming.entity';

const mockStreamingRepository = {
  getAll: jest.fn(),
  getOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('StreamingService', () => {
  let streamingService: StreamingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StreamingService,
        {
          provide: getRepositoryToken(Streaming),
          useValue: mockStreamingRepository,
        },
      ],
    }).compile();

    streamingService = module.get<StreamingService>(StreamingService);
  });

  it('streamingService should be defined', () => {
    expect(streamingService).toBeDefined();
  });
});
