import { Injectable, Logger } from '@nestjs/common';
import { WorkFront }          from '../entities/work-front.entity';
import { CreateWorkFrontDto } from '../dto/create-work-front.dto';
import { InjectRepository }   from '@nestjs/typeorm';
import { Repository }         from 'typeorm';

@Injectable()
export class WorkFrontService {
  private readonly logger = new Logger(WorkFrontService.name);

  constructor(@InjectRepository(WorkFront) public repository: Repository<WorkFront>) {}

  public async create(createDto: CreateWorkFrontDto): Promise<WorkFront> {
    const workFront: WorkFront = this.repository.create(createDto);
    return await this.repository.save(workFront);
  }

  public async createMultiple(dtos: CreateWorkFrontDto[]): Promise<WorkFront[]> {
    const workFronts: WorkFront[] = this.repository.create(dtos);
    return await this.repository.save(workFronts);
  }

  public async findAll(): Promise<WorkFront[]> {
    return await this.repository.find({
    });
  }

  public async findOrFail(name: string): Promise<WorkFront> {
    return await this.repository.findOneOrFail({ where: { name } });
  }
}
