import { IsDate }      from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform }   from 'class-transformer';

export class CreateSprintDto {
  @IsDate()
  @Transform(({ value }): Date => new Date(value))
  @ApiProperty()
  week: Date;
}