import { Expose, Transform } from 'class-transformer';
import { SprintDto }         from './sprint.dto';
import { entitiesToDTOs }    from '../../commons/commons.lib';

export class FullBuildingDto {
  @Expose()
  id: number;

  @Expose()
  startAt: Date;

  @Expose()
  plannedEnding: Date;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  imageUrl: string;

  @Expose()
  @Transform(({ obj }): SprintDto[] => entitiesToDTOs(obj.sprints, SprintDto))
  sprints: SprintDto[];
}
