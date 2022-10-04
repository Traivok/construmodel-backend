import { ApiProperty }                from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @ApiProperty({ example: 'Floor 1' })
  name: string;

  @IsNumber()
  @ApiProperty()
  nextTaskId: number;

  @IsDate()
  @ApiProperty()
  expectedAt: Date
}