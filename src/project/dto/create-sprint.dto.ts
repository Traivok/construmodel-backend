import { IsDate, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty }                       from '@nestjs/swagger';
import { Transform }                         from 'class-transformer';

export class CreateSprintDto {
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @ApiProperty()
  start: Date;
}
