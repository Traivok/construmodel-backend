import { IsString }    from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStageDto {
  @IsString()
  @ApiProperty({ example: 'Hydraulic' })
  description: string;
}