import { IsDate, IsOptional, IsString, MaxLength } from 'class-validator';
import { Transform }                               from 'class-transformer';
import { ApiProperty }                             from '@nestjs/swagger';

export class CreateBuildingDto {
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @ApiProperty()
  startedAt: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @ApiProperty()
  plannedEnding: Date;

  @IsString()
  @MaxLength(64)
  @ApiProperty()
  name: string;

  @IsString()
  @MaxLength(512)
  @ApiProperty()
  description: string;

  @IsOptional()
  @IsString()
  @MaxLength(128)
  @ApiProperty()
  imageUrl?: string;
}