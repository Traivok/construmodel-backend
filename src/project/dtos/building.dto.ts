import { Expose, plainToInstance, Transform } from 'class-transformer';
import { entitiesToDTOs }                     from '../../commons/commons.lib';
import { WorkFrontMinimalDto }                from './work-front.dto';
import { SprintDto }                          from './sprint.dto';
import { Sprint }                             from '../entities/sprint.entity';

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
  @Transform(({ obj }): SprintDto => plainToInstance(SprintDto, obj.currentSprint))
  currentSprint: SprintDto | null;

  @Expose()
  @Transform(({ obj }): SprintDto => plainToInstance(SprintDto, obj.previousSprint))
  previousSprint: SprintDto | null;

  @Expose()
  @Transform(({ obj }): SprintDto => plainToInstance(SprintDto, obj.nextSprint))
  nextSprint: SprintDto | null;

  @Expose()
  createdAt: Date;

  @Expose()
  @Transform(({ obj }): number => obj.completion.planned)
  plannedCompletion: number;

  @Expose()
  @Transform(({ obj }): number => obj.completion.actual)
  actualCompletion: number;

  @Expose()
  late: boolean;
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