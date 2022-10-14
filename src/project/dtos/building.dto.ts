import { Expose, Transform }   from 'class-transformer';
import { entitiesToDTOs }      from '../../commons/commons.lib';
import { WorkFrontMinimalDto } from './work-front.dto';
import { SprintDto }           from './sprint.dto';

export class BuildingDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  floorCount: number;

  @Expose()
  @Transform(({ obj }): WorkFrontMinimalDto[] => entitiesToDTOs(obj.workFronts, WorkFrontMinimalDto))
  workFronts: WorkFrontMinimalDto[];

  @Expose()
  @Transform(({ obj }): SprintDto[] => entitiesToDTOs(obj.sprints, SprintDto))
  sprints: SprintDto[];

  @Expose()
  createdAt: Date;
}

export class BuildingMinimalDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  floorCount: number;

  @Expose()
  createdAt: Date;
}