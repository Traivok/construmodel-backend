import { IsNumber, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { ApiProperty }                                   from '@nestjs/swagger';
import { WorkFront_NAME_LENGTH }                         from '../entities/work-front.entity';

export class CreateWorkFrontDto {
  @IsString()
  @MinLength(1)
  @MaxLength(WorkFront_NAME_LENGTH)
  @ApiProperty()
  name: string;

  @IsNumber()
  @Min(0)
  @ApiProperty()
  floors: number;
}
