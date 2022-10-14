import { Expose, Transform } from 'class-transformer';

export class ProgressionDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Transform(({ obj }): number => obj.workFrontId)
  @Expose()
  workFrontId: number;

  @Transform(({ obj }): number => obj.sprintId)
  @Expose()
  sprintId: number;

  @Expose()
  currentFloor: number;

  @Expose()
  expectedFloor: number;
}