import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ProjectService }                                    from '../service/project.service';
import { Serialize }                                         from '../../commons/decorators/serialize.decorator';
import { ProjectDto }                                        from '../dtos/project.dto';
import { CreateProjectDto }                                  from '../dtos/create-project.dto';
import { Project }                                           from '../entities/project.entity';
import { ApiResponse, ApiTags }                              from '@nestjs/swagger';
import { CatchEntityErrors }                                 from '../../commons/decorators/catch-entity-errors.decorator';
import { plainToInstance }                                   from 'class-transformer';

@ApiTags('project')
@Controller('project')
@CatchEntityErrors(Project.name)
export class ProjectController {
  constructor(public service: ProjectService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Serialize(ProjectDto)
  @ApiResponse({ status: HttpStatus.CREATED, type: ProjectDto, description: 'Successful creation.'})
  async createProject(@Body() createProject: CreateProjectDto): Promise<Project> {
    return await this.service.createProject(createProject);
  }

  @Get()
  @Serialize(ProjectDto)
  @ApiResponse({ status: HttpStatus.OK, type: ProjectDto, description: 'Returns all Projects'})
  async getAll(): Promise<Project[]> {
    return await this.service.getAll()
  }
}
