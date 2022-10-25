import { IsString }    from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkFrontDto {
  @IsString()
  @ApiProperty({ example: 'Hydraulics' })
  name: string;
}