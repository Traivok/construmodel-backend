import { Expose, Transform } from 'class-transformer';
import { ProgressionDto }    from './progression.dto';
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
  @Transform(({ obj }): ProgressionDto[] => entitiesToDTOs(obj.progressions, ProgressionDto))
  progressions: ProgressionDto[];
}
