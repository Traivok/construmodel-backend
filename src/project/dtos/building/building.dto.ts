import { Expose, plainToInstance, Transform } from 'class-transformer';
import { WorkFront }                          from '../../entities/work-front.entity';

export class BuildingDto {
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
  @Transform(({ obj }): BuildingSprintDto => plainToInstance(BuildingSprintDto, obj.currentSprint, { excludeExtraneousValues: true }))
  currentSprint: BuildingSprintDto | null;

  @Expose()
  @Transform(({ obj }): BuildingSprintDto => plainToInstance(BuildingSprintDto, obj.previousSprint, { excludeExtraneousValues: true }))
  previousSprint: BuildingSprintDto | null;

  @Expose()
  @Transform(({ obj }): BuildingSprintDto => plainToInstance(BuildingSprintDto, obj.nextSprint, { excludeExtraneousValues: true }))
  nextSprint: BuildingSprintDto | null;

  @Expose()
  @Transform(({ obj }): number => obj.plannedCompletion)
  plannedCompletion: number;

  @Expose()
  @Transform(({ obj }): number => obj.actualCompletion)
  actualCompletion: number;

  @Expose()
  late: boolean;
}


export class BuildingSprintDto {
  @Expose()
  id: number;

  @Expose()
  start: Date;

  @Expose()
  end: Date;

  @Expose()
  status: string;
}

export class BuildingProgressDto {
  @Expose()
  workFrontName: string;

  @Expose()
  plannedFloor: number;

  @Expose()
  currentFloor: number;

  @Expose()
  progressionDate: Date;
}