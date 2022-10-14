import { ApiProperty }          from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateProgressDto {
  @IsNumber()
  @ApiProperty()
  workFrontId: number;

  @IsNumber()
  @ApiProperty()
  sprintId: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  currentFloor: number;

  @IsNumber()
  @ApiProperty()
  plannedFloor: number;
}