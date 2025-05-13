import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateUsersDto {
  @IsNotEmpty({ message: 'Username is required' })
  @MaxLength(255, { message: 'Username must be 255 characters max' })
  username: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MaxLength(255, { message: 'Password must be 255 characters max' })
  password?: string;
}
