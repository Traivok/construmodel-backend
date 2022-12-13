import { Expose, plainToInstance, Transform } from 'class-transformer';
import { SprintDto }                          from '../sprint.dto';
import { ApiProperty }                        from '@nestjs/swagger';
import { SprintStatus }                       from '../../entities/sprint.entity';
import { WorkFrontDto }                       from '../work-front.dto';

class _TaskDetailSprint {
  @Expose()
  id: number;

  @Expose()
  start: Date;

  @Expose()
  end: Date;

  @Expose()
  @ApiProperty({ enum: SprintStatus })
  status: SprintStatus;
}

export class TaskDetailDto {
  @Expose()
  planned: number;

  @Expose()
  done: number;

  @Expose()
  late: boolean;

  @Expose()
  @Transform(({ obj }): _TaskDetailSprint => plainToInstance(_TaskDetailSprint, obj.sprint, { excludeExtraneousValues: true }))
  sprint: _TaskDetailSprint;

  @Expose()
  @Transform(({ obj }): WorkFrontDto => plainToInstance(WorkFrontDto, obj.workFront, { excludeExtraneousValues: true }))
  workFront: WorkFrontDto;

}
