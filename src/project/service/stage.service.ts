import { Injectable }       from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stage }            from '../entities/stage.entity';
import { Repository }       from 'typeorm';
import { CreateStageDto }   from '../dtos/create-stage.dto';
import { Project }          from '../entities/project.entity';

@Injectable()
export class StageService {
  constructor(@InjectRepository(Stage) protected repo: Repository<Stage>) {}

  async createStage(project: Project, createDto: CreateStageDto): Promise<Stage> {
    const stage   = this.repo.create(createDto);
    stage.project = project;

    return await this.repo.save(stage);
  }

  async findByOrFail(stageId: number): Promise<Stage> {
    return await this.repo.findOneOrFail({
      relations: [ 'project', 'tasks' ],
      where:     {
        id: stageId,
      },
    });
  }

  async getAll(): Promise<Stage[]> {
    return await this.repo.find({
      relations: {
        project: true,
      },
    });
  }
}
