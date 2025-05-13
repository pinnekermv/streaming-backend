import { IsNotEmpty, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateStreamingDto {
  @IsNotEmpty({ message: 'Title is required' })
  @MaxLength(255, { message: 'Title must be 255 characters max' })
  title: string;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'Thumbnail URL is required' })
  @IsUrl({}, { message: 'Invalid URL format for streaming thumbnail' })
  thumbnail: string;

  @IsNotEmpty({ message: 'Stream URL is required' })
  @IsUrl({}, { message: 'Invalid URL format for streaming link' })
  videoUrl: string;
}
