import { Injectable, Logger }      from '@nestjs/common';
import { InjectRepository }        from '@nestjs/typeorm';
import { Execution }               from '../entities/execution.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class ExecutionService {
  private readonly logger = new Logger(ExecutionService.name);

  constructor(@InjectRepository(Execution) protected repo: Repository<Execution>) {}

  public async create(dto: DeepPartial<Execution>): Promise<Execution> {
    return await this.repo.save(this.repo.create(dto));
  }
}
