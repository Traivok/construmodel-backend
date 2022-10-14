import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository }   from '@nestjs/typeorm';
import { Sprint }             from '../entities/sprint.entity';
import { Repository }         from 'typeorm';
import { CreateSprintDto }    from '../dtos/create-sprint.dto';
import { Building }           from '../entities/building.entity';

@Injectable()
export class SprintService {
  constructor(@InjectRepository(Sprint) protected repo: Repository<Sprint>) {}

  public async create(dto: CreateSprintDto, building: Building): Promise<Sprint> {
    const sprint: Sprint = this.repo.create(dto);
    sprint.building      = building;
    return await this.repo.save(sprint);
  }

}
