import { DeepPartial } from 'typeorm';
import { Sprint }      from '../entities/sprint.entity';
import { WorkFront }   from '../entities/work-front.entity';

export interface ParsedProjectInterface {
  sprints: DeepPartial<Sprint>[];
  workFronts: DeepPartial<WorkFront>[];
  dateColName: string,
  data: { [key: string]: string }[],
}