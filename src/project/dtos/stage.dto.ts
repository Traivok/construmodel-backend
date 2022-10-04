import { Expose, Transform } from 'class-transformer';
import { TaskDto }           from './task.dto';

export class StageDto {
  @Expose()
  id: number;

  @Expose()
  description: string;

  @Transform(({ obj }): number => obj.project.id)
  @Expose()
  projectId: number;

  @Expose()
  tasks: TaskDto[];

  @Expose()
  createdAt: Date;
}