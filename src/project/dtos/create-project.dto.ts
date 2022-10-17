import { ApiProperty }                                from '@nestjs/swagger';
import { CreateBuildingDto }                          from './create-building.dto';
import { IsNotEmptyObject, IsObject, ValidateNested } from 'class-validator';
import { CreateMultipleSprintsDto }                   from './create-multiple-sprints.dto';
import { Type }                                       from 'class-transformer';

export class CreateProjectDto extends CreateBuildingDto {
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateMultipleSprintsDto)
  @ApiProperty()
  createMultipleSprintsDto: CreateMultipleSprintsDto;
}