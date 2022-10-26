import { Expose } from 'class-transformer';

export class ProgressDto {
  @Expose()
  workFrontName: string;

  @Expose()
  sprintId: number;

  @Expose()
  plannedFloor: number;

  @Expose()
  currentFloor: number;

  @Expose()
  progressionDate: Date;
}
