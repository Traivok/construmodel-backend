import { IsNumber }    from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProgressDto {
  @IsNumber()
  @ApiProperty()
  currentFloor: number;
}
