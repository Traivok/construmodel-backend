import { Injectable, Logger }                 from '@nestjs/common';
import { Plan }                               from '../entities/plan.entity';
import { DataSource, Repository }             from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlanService {
  private readonly logger = new Logger(PlanService.name);

  constructor(@InjectRepository(Plan) public repo: Repository<Plan>,
              @InjectDataSource() protected dataSource: DataSource) {}


}
