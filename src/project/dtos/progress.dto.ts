import { Sprint } from '../entities/sprint.entity';
import { Expose } from 'class-transformer';

export class ProgressDto {
  @Expose()
  workFrontName: string;

  @Expose()
  sprintId: number;

  @Expose()
  sprint!: Sprint;

  @Expose()
  plannedFloor: number;

  @Expose()
  currentFloor: number;

  @Expose()
  progressionDate: Date;

  @Expose()
  late: boolean;

}
