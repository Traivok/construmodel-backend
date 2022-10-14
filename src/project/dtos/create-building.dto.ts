import { IsInt, IsString } from 'class-validator';
import { ApiProperty }     from '@nestjs/swagger';

export class CreateBuildingDto {
  @IsString()
  @ApiProperty({ example: 'Empire States' })
  name: string;

  @IsInt()
  @ApiProperty({ example: 16 })
  floorCount: number;
}
