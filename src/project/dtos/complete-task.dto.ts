import { IsDate }      from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CompleteTaskDto {
  @IsDate()
  @ApiProperty()
  completedAt: Date
}