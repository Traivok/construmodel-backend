import { Expose, plainToInstance, Transform } from 'class-transformer';
import { StageDto }                           from './stage.dto';
import { Stage }                              from '../entities/stage.entity';

const stagesToStagesDto = (stages: Stage[]): StageDto[] => stages.map(s => {
  console.log(s);
  return plainToInstance(StageDto, s, { excludeExtraneousValues: true }); });

export class ProjectDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  @Transform(({ obj }): StageDto[] => stagesToStagesDto(obj.stages))
  stages: StageDto[];

  @Expose()
  createdAt: Date;
}
