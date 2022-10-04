import { IsDate }      from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type }        from 'class-transformer';

export class CompleteTaskDto {
  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  completedAt: Date
}