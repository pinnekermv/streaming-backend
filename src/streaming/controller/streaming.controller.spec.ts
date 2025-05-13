import { Test } from '@nestjs/testing';
import { StreamingController } from './streaming.controller';
import { StreamingService } from '../service/streaming.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateStreamingDto } from '../dto/create-streaming.dto';
import { UpdateStreamingDto } from '../dto/update-streaming.dto';
import { DeleteResult } from 'typeorm';

describe('StreamingController', () => {
  const now = new Date();
  const mockResult = {
    title: 'Test Title',
    description: 'Test Description',
    thumbnail: 'https://example.com/thumbnail_1.jpg',
    videoUrl: 'https://example.com/video_1.mp4',
    createdAt: now,
    updatedAt: now,
  };
  let streamingController: StreamingController;
  let streamingService: StreamingService;

  const mockStreamingService = {
    getAll: jest.fn(),
    getOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [StreamingController],
      providers: [
        {
          provide: StreamingService,
          useValue: mockStreamingService,
        },
      ],
    }).compile();

    streamingService = moduleRef.get<StreamingService>(StreamingService);
    streamingController = moduleRef.get<StreamingController>(StreamingController);
  });

  it('streamingController should be defined', () => {
    expect(streamingController).toBeDefined();
  });

  it('streamingService should be defined', () => {
    expect(streamingService).toBeDefined();
  });

  describe('getAll', () => {
    it('should return a list of streamings', async () => {
      const mockResultCurrent = { id: 1, ...mockResult };
      mockStreamingService.getAll.mockResolvedValue([mockResultCurrent]);

      expect(await streamingController.getAll()).toEqual([mockResultCurrent]);
    });
  });

  describe('getOne', () => {
    it('should return one streaming by ID', async () => {
      const existingId = 1;
      const mockResultCurrent = { id: 1, ...mockResult };

      mockStreamingService.getOne.mockResolvedValue(mockResultCurrent);

      expect(await streamingController.getOne(existingId)).toEqual(mockResultCurrent);
    });

    it('should throw NotFoundException if streaming not found', async () => {
      const nonExistentId = 999;
      mockStreamingService.getOne.mockRejectedValue(
        new NotFoundException('Streaming not found'),
      );

      await expect(streamingController.getOne(nonExistentId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    const mockResultCurrent = { id: 1, ...mockResult };
    const dto: CreateStreamingDto = mockResultCurrent;

    it('should succesfully create a streaming (data is unique)', async () => {
      mockStreamingService.create.mockResolvedValue(mockResultCurrent);

      expect(await streamingController.create(dto)).toEqual(mockResultCurrent);
    });

    it('should throw ConflictException if title is not unique', async () => {
      mockStreamingService.create.mockRejectedValue(
        new ConflictException(
          `Streaming with title "${mockResult.title}" already exists`,
        ),
      );

      await expect(streamingController.create(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('update', () => {
    const existingId = 1;
    const dto: UpdateStreamingDto = {
      title: 'Updated Title',
      description: 'Updated Desc',
      thumbnail: 'https://example.com/thumbnail_1.jpg',
      videoUrl: 'https://example.com/video_1.mp4',
    };

    it('should succesfully update a streaming (data is unique)', async () => {
      const updated = {
        id: existingId,
        ...dto,
        updatedAt: now,
      };

      mockStreamingService.update.mockResolvedValue(updated);

      expect(await streamingController.update(existingId, dto)).toEqual(updated);
    });

    it('should throw ConflictException if title is not unique', async () => {
      mockStreamingService.update.mockRejectedValue(
        new ConflictException(
          `Streaming with title "${dto.title}" already exists`,
        ),
      );

      await expect(streamingController.update(existingId, dto)).rejects.toThrow(ConflictException);
    });

    it('should throw NotFoundException if streaming to update is not found', async () => {
      mockStreamingService.update.mockRejectedValue(
        new NotFoundException(`Streaming with id ${existingId} not found`),
      );

      await expect(streamingController.update(999, dto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a streaming item', async () => {
      const result: DeleteResult = {
        raw: [],
        affected: 1,
      };

      mockStreamingService.delete.mockResolvedValue(result);

      expect(await streamingController.delete(1)).toEqual(result);
    });

    it('should throw NotFoundException if streaming to delete is not found', async () => {
      mockStreamingService.delete.mockRejectedValue(new NotFoundException('Not found'));

      await expect(streamingController.delete(999)).rejects.toThrow(NotFoundException);
    });
  });
});
