import { Expose, Transform } from 'class-transformer';

export class ProgressDto {
  @Transform(({ obj }): number => obj.workFrontId)
  @Expose()
  workFrontId: number;

  @Transform(({ obj }): number => obj.sprintId)
  @Expose()
  sprintId: number;

  @Expose()
  currentFloor: number;

  @Expose()
  plannedFloor: number;
}