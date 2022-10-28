import { Expose, Transform } from 'class-transformer';
import { entitiesToDTOs }    from '../../commons/commons.lib';
import { TaskDto }           from './task.dto';
import { ApiProperty }       from '@nestjs/swagger';
import { SprintStatus }      from '../entities/sprint.entity';

export class SprintDto {
  @Expose()
  id: number;

  @Expose()
  start: Date;

  @Expose()
  end: Date;

  @Expose()
  @Transform(({ obj }): TaskDto[] => entitiesToDTOs(obj.tasks, TaskDto))
  tasks: TaskDto[];

  @Expose()
  @ApiProperty({ enum: SprintStatus })
  status: SprintStatus;

  @Expose()
  progress: { done: number, planned: number, late: boolean };
}
