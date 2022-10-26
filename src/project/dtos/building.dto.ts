import { Expose, plainToInstance, Transform } from 'class-transformer';
import { entitiesToDTOs }                     from '../../commons/commons.lib';
import { WorkFrontDto }                       from './work-front.dto';
import { SprintCompactDto, SprintDto }        from './sprint.dto';

export class BuildingDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  floorCount: number;

  @Expose()
  @Transform(({ obj }): WorkFrontDto[] => entitiesToDTOs(obj.workFronts, WorkFrontDto))
  workFronts: WorkFrontDto[];

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
  @Transform(({ obj }): number => obj.plannedCompletion)
  plannedCompletion: number;

  // @Expose()
  // @Transform(({ obj }): number => obj.completion.actual)
  // actualCompletion: number;

  @Expose()
  late: boolean;
}

export class BuildingCompactDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  floorCount: number;

  @Expose()
  createdAt: Date;

  @Expose()
  @Transform(({ obj }): SprintCompactDto => plainToInstance(SprintCompactDto, obj.currentSprint))
  currentSprint: SprintCompactDto | null;

  @Expose()
  @Transform(({ obj }): SprintCompactDto => plainToInstance(SprintCompactDto, obj.previousSprint))
  previousSprint: SprintCompactDto | null;

  @Expose()
  @Transform(({ obj }): SprintCompactDto => plainToInstance(SprintCompactDto, obj.nextSprint))
  nextSprint: SprintCompactDto | null;

  @Expose()
  @Transform(({ obj }): number => obj.plannedCompletion)
  plannedCompletion: number;

  // @Transform(({ obj }): number => obj.completion.actual)
  // actualCompletion: number;

  // @Expose()
  // late: boolean;
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