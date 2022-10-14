import { IsNumber }    from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProgressionDto {
  @IsNumber()
  @ApiProperty()
  currentFloor: number;
}
