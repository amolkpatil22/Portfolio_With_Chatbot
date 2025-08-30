import { IsString, MaxLength, IsOptional, IsArray } from 'class-validator';

export class ChatDto {
  @IsString()
  @MaxLength(500, { message: 'Message cannot exceed 500 characters' })
  message: string;

  @IsOptional()
  @IsArray()
  history?: any[];
}