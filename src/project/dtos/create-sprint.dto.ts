import { IsDate }      from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSprintDto {
  @IsDate()
  @ApiProperty()
  start: Date;

  @IsDate()
  @ApiProperty()
  end: Date;
}