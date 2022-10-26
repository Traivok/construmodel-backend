import { IsDate, IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty }                     from '@nestjs/swagger';
import { Transform }                       from 'class-transformer';

export class CreateExecutionDto {
  @IsString()
  @ApiProperty({ example: 'Hydraulics' })
  workFrontName: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @ApiProperty()
  date: Date;

  @IsNumber()
  @Min(0)
  @ApiProperty()
  floor: number;
}