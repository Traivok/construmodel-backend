import { Expose, Transform }               from 'class-transformer';
import { Building }                        from '../entities/building.entity';
import { BuildingDto, BuildingMinimalDto } from './building.dto';
import { entitiesToDTOs }                  from '../../commons/commons.lib';

export class WorkFrontDto {
  @Expose()
  name: string;

  @Transform(({ obj }): BuildingMinimalDto[] => entitiesToDTOs(obj.buildings, BuildingMinimalDto))
  @Expose()
  buildings: BuildingMinimalDto[];
}