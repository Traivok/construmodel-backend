import { IsDate, IsNumber, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { WorkFront_NAME_LENGTH }                                 from '../entities/work-front.entity';
import { ApiProperty }                                           from '@nestjs/swagger';
import { Transform }                                             from 'class-transformer';

export class UpdateTaskDto {
  @IsString()
  @MinLength(1)
  @MaxLength(WorkFront_NAME_LENGTH)
  @ApiProperty()
  workFrontName: string;

  @IsNumber()
  @Min(0)
  @ApiProperty()
  done: number;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @ApiProperty()
  date: Date;
}
