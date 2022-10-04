import { Expose, plainToInstance, Transform } from 'class-transformer';
import { StageDto }                           from './stage.dto';
import { Stage }                              from '../entities/stage.entity';
import { entitiesToDTOs }                     from '../../commons/commons.lib';

export class ProjectDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  @Transform(({ obj }): StageDto[] => entitiesToDTOs(obj.stages, StageDto))
  stages: StageDto[];

  @Expose()
  createdAt: Date;
}
