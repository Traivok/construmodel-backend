import { Injectable }        from '@nestjs/common';
import { InjectRepository }  from '@nestjs/typeorm';
import { Repository }        from 'typeorm';
import { Project }           from '../entities/project.entity';
import { CreateProjectDto }  from '../dtos/create-project.dto';
import { PaginationService } from '../../commons/pagination/pagination.service';

@Injectable()
export class ProjectService extends PaginationService<Project> {
  constructor(@InjectRepository(Project) protected readonly repo: Repository<Project>) {
    super({ entityName: 'project', orderBy: 'created_at' });
  }

  async createProject(createDto: CreateProjectDto): Promise<Project> {
    const project = this.repo.create(createDto);
    return await this.repo.save(project);
  }

  public async findOneOrFail(id: number): Promise<Project> {
    return await this.repo.findOneByOrFail({ id });
  }

  public async getAll(): Promise<Project[]> {
    return await this.repo.find({
      relations: [ 'stages', 'stages.project' ],
    });
  }
}
