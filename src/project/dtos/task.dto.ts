import { Expose, Transform } from 'class-transformer';

export class TaskDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Transform(({ obj }): number => obj.stage_id)
  @Expose()
  stageId: number;

  @Transform(({ obj }): number => obj.next_task_id)
  @Expose()
  nextTaskId: number;

  @Expose()
  expectedAt: Date;

  @Expose()
  completedAt?: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  createdAt: Date;

  @Expose()
  done: boolean;

  @Expose()
  late: boolean;
}