import { Expose, plainToInstance, Transform } from 'class-transformer';
import { WorkFrontDto }                       from './work-front.dto';

export class PlanDto {
  @Transform(({ obj }): WorkFrontDto => plainToInstance(WorkFrontDto, obj.workFront, { excludeExtraneousValues: true }))
  @Expose()
  workFront: WorkFrontDto;

  @Expose()
  workFrontName: string;

  @Expose()
  sprintId: number;

  @Expose()
  floor: number;
}