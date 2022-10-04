import { Expose, Transform } from 'class-transformer';
import { TaskDto }           from './task.dto';
import { entitiesToDTOs }    from '../../commons/commons.lib';

export class StageDto {
  @Expose()
  id: number;

  @Expose()
  description: string;

  @Transform(({ obj }): number => obj.project.id)
  @Expose()
  projectId: number;

  @Transform(({ obj }): TaskDto[] => entitiesToDTOs(obj.tasks, TaskDto))
  @Expose()
  tasks: TaskDto[];

  @Expose()
  createdAt: Date;
}