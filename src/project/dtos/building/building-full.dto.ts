import { Expose, plainToInstance, Transform }     from 'class-transformer';
import { entitiesToDTOs }                         from '../../../commons/commons.lib';
import { WorkFront }                              from '../../entities/work-front.entity';
import { BuildingProgressDto, BuildingSprintDto } from './building.dto';

export class BuildingFullDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  floorCount: number;

  @Expose()
  @Transform(({ obj }): string[] => obj.workFronts.map((wf: WorkFront) => wf.name))
  workFronts: string[];

  @Expose()
  @Transform(({ obj }): BuildingSprintFullDto[] => entitiesToDTOs(obj.sprints, BuildingSprintFullDto))
  sprints: BuildingSprintFullDto[];

  @Expose()
  @Transform(({ obj }): BuildingSprintFullDto => plainToInstance(BuildingSprintFullDto, obj.currentSprint, { excludeExtraneousValues: true }))
  currentSprint: BuildingSprintFullDto | null;

  @Expose()
  @Transform(({ obj }): BuildingSprintFullDto => plainToInstance(BuildingSprintFullDto, obj.previousSprint, { excludeExtraneousValues: true }))
  previousSprint: BuildingSprintFullDto | null;

  @Expose()
  @Transform(({ obj }): BuildingSprintFullDto => plainToInstance(BuildingSprintFullDto, obj.nextSprint, { excludeExtraneousValues: true }))
  nextSprint: BuildingSprintFullDto | null;

  @Expose()
  @Transform(({ obj }): number => obj.plannedCompletion)
  plannedCompletion: number;

  @Expose()
  @Transform(({ obj }): number => obj.actualCompletion)
  actualCompletion: number;

  @Expose()
  late: boolean;
}


export class BuildingSprintFullDto extends BuildingSprintDto {
  @Expose()
  @Transform(({ obj }): BuildingProgressDto[] => entitiesToDTOs(obj.progressesView, BuildingProgressDto))
  progresses: BuildingProgressDto[];
}