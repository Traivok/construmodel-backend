import { IsDate }      from 'class-validator';
import { Transform }   from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMultipleSprintsDto {
  @IsDate()
  @Transform(({ value }): Date => new Date(value))
  @ApiProperty()
  firstWeek: Date;

  @IsDate()
  @Transform(({ value }): Date => new Date(value))
  @ApiProperty()
  lastWeek: Date;
}
