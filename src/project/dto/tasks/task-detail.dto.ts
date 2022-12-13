import { Expose, plainToInstance, Transform } from 'class-transformer';
import { SprintDto }                          from '../sprint.dto';

export class TaskDetailDto {
  @Expose()
  workFrontName: string;

  @Expose()
  planned: number;

  @Expose()
  done: number;

  @Expose()
  late: boolean;

  @Expose()
  @Transform(({ obj }): SprintDto => plainToInstance(SprintDto, obj, { excludeExtraneousValues: true }))
  sprint: SprintDto;
}
