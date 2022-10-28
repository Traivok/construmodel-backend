import { DeepPartial } from 'typeorm';
import { Sprint }      from '../entities/sprint.entity';
import { WorkFront }   from '../entities/work-front.entity';

export interface ParsedProject {
  sprints: DeepPartial<Sprint>[]
  dateColName: string;
  data: { [key: string]: string }[],
  workFronts: DeepPartial<WorkFront>[],
}