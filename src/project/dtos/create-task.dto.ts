import { ApiProperty }                                          from '@nestjs/swagger';
import { IsDate, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform, Type }                                      from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  @ApiProperty({ example: 'Floor 1' })
  name: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  nextTaskId?: number;

  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  expectedAt: Date;
}