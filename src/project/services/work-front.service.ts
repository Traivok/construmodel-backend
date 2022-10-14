import { Injectable }         from '@nestjs/common';
import { Building }           from '../entities/building.entity';
import { CreateBuildingDto }  from '../dtos/create-building.dto';
import { CreateWorkFrontDto } from '../dtos/create-work-front.dto';
import { WorkFront }          from '../entities/work-front.entity';
import { InjectRepository }   from '@nestjs/typeorm';
import { Repository }         from 'typeorm';
import { Progress }           from '../entities/progress.entity';

@Injectable()
export class WorkFrontService {

  constructor(@InjectRepository(WorkFront) protected repo: Repository<WorkFront>) {}

  async create(dto: CreateWorkFrontDto): Promise<WorkFront> {
    const workFront = this.repo.create(dto);
    return await this.repo.save(workFront);
  }

  async findOneOrFail(id: number): Promise<WorkFront> {
    return await this.repo.findOneByOrFail({ id });
  }

  async getAll(): Promise<WorkFront[]> {
    return await this.repo.find({
      relations: { buildings: true },
    });
  }

}
