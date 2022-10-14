import { Injectable, Logger } from '@nestjs/common';
import { Progress }           from '../entities/progress.entity';
import { Repository }         from 'typeorm';
import { InjectRepository }   from '@nestjs/typeorm';
import { CreateProgressDto }  from '../dtos/create-progress.dto';
import { UpdateProgressDto }  from '../dtos/update-progress.dto';
import { Sprint }             from '../entities/sprint.entity';
import { WorkFront }          from '../entities/work-front.entity';

@Injectable()
export class ProgressService {
  private readonly logger = new Logger(ProgressService.name);

  constructor(@InjectRepository(Progress) public repo: Repository<Progress>) {}

  async findAll(): Promise<Progress[]> {
    return this.repo.find();
  }

  public async create(createDto: CreateProgressDto): Promise<Progress> {
    const progress: Progress = this.repo.create(createDto);

    return await this.repo.save(progress);
  }

  async updateCurrentFloor(workFrontId: number, sprintId: number, dto: UpdateProgressDto): Promise<Progress> {
    const progress: Progress = await this.repo.findOneOrFail({
      where: { workFrontId, sprintId },
    });

    return await this.repo.save(this.repo.merge(progress, dto));
  }
}
