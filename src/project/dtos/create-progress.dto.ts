import { ApiProperty }                    from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProgressDto {
  @IsString()
  @ApiProperty()
  workFrontName: string;

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