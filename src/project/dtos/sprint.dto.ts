import { Expose, Transform } from 'class-transformer';
import { ProgressDto }       from './progress.dto';
import { entitiesToDTOs }    from '../../commons/commons.lib';

export class SprintDto {
  @Expose()
  id: number;

  @Expose()
  start: Date;

  @Expose()
  end: Date;

  @Expose()
  buildingId: number;

  @Expose()
  @Transform(({ obj }): ProgressDto[] => entitiesToDTOs(obj.progresses, ProgressDto))
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
