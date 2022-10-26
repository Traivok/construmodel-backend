import { Expose, Transform } from 'class-transformer';
import { entitiesToDTOs }    from '../../commons/commons.lib';
import { ProgressDto }       from './progress.dto';


export class SprintDto {
  @Expose()
  id: number;

  @Expose()
  start: Date;

  @Expose()
  end: Date;

  @Expose()
  buildingId: number;

  // @Expose()
  // @Transform(({ obj }): PlanDto[] => entitiesToDTOs(obj.plans, PlanDto))
  // plans: PlanDto[];

  @Expose()
  @Transform(({ obj }): ProgressDto[] => entitiesToDTOs(obj.progressesView, ProgressDto))
  progresses: ProgressDto[];

  @Expose()
  status: string;
}

export class SprintCompactDto {
  @Expose()
  id: number;

  @Expose()
  start: Date;

  @Expose()
  end: Date;

  @Expose()
  buildingId: number;

  @Expose()
  status: string;
}
