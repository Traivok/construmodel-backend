import { IsString }    from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @IsString()
  @ApiProperty({ example: 'Empire States Building' })
  name: string;
}