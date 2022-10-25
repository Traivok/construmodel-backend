import { Injectable, Logger }       from '@nestjs/common';
import { CreateWorkFrontDto }       from '../dtos/create-work-front.dto';
import { WorkFront }                from '../entities/work-front.entity';
import { InjectRepository }         from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class WorkFrontService {
  private readonly logger = new Logger(WorkFrontService.name);

  constructor(@InjectRepository(WorkFront) protected repo: Repository<WorkFront>) {}

  public get repository(): Repository<WorkFront> { return this.repo };

  async create(dto: CreateWorkFrontDto): Promise<WorkFront> {
    dto.name        = dto.name.toLocaleLowerCase();
    const workFront = this.repo.create(dto);
    return await this.repo.save(workFront);
  }

  async findOneOrFail(name: string): Promise<WorkFront> {
    return await this.repo.findOneByOrFail({ name });
  }

  async getAll(buildings: boolean = true): Promise<WorkFront[]> {
    return await this.repo.find({
      relations: { buildings },
    });
  }

  public async createIfNotExists(dtos: CreateWorkFrontDto[], save: boolean = true): Promise<WorkFront[]> {
    const wfs               = await this.getAll(false);
    const olds: WorkFront[] = [];
    const news: WorkFront[] = [];

    for (const dto of dtos) {
      const wf = wfs.find(wf => wf.name === dto.name);

      if (wf === undefined) {
        news.push(this.repo.create(dto));
      } else {
        olds.push(wf);
      }
    }

    return olds.concat(save ? await this.repo.save(news) : news);
  }
}
