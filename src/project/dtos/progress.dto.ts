import { Expose, plainToInstance, Transform } from 'class-transformer';
import { WorkFrontMinimalDto }                from './work-front.dto';

export class ProgressDto {
  @Transform(({ obj }): WorkFrontMinimalDto => plainToInstance(WorkFrontMinimalDto, obj.workFront, { excludeExtraneousValues: true }))
  @Expose()
  workFront: WorkFrontMinimalDto;

  @Expose()
  workFrontName: string;

  @Expose()
  sprintId: number;

  @Expose()
  currentFloor: number;

  @Expose()
  plannedFloor: number;
}