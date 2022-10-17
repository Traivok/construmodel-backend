import { Expose, plainToInstance, Transform } from 'class-transformer';
import { WorkFrontMinimalDto }                from './work-front.dto';

export class ProgressDto {
  @Transform(({ obj }): WorkFrontMinimalDto => plainToInstance(WorkFrontMinimalDto, obj.workFront, { excludeExtraneousValues: true }))
  @Expose()
  workFront: WorkFrontMinimalDto;

  @Transform(({ obj }): number => obj.sprintId)
  @Expose()
  sprintId: number;

  @Expose()
  currentFloor: number;

  @Expose()
  plannedFloor: number;
}