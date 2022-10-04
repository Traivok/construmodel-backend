import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiTags }                                     from '@nestjs/swagger';
import { CatchEntityErrors }                           from '../../commons/decorators/catch-entity-errors.decorator';
import { Stage }                                       from '../entities/stage.entity';
import { StageService }                                from '../service/stage.service';
import { CreateStageDto }                              from '../dtos/create-stage.dto';
import { Serialize }                                   from '../../commons/decorators/serialize.decorator';
import { StageDto }                                    from '../dtos/stage.dto';
import { ProjectService }                              from '../service/project.service';
import { Project }                                     from '../entities/project.entity';

@ApiTags('stage')
@Controller('project/:projectId/stage')
@CatchEntityErrors(Stage.name)
@CatchEntityErrors(Project.name)
export class StageController {
  constructor(public projectService: ProjectService, public service: StageService) {}

  @Post()
  @Serialize(StageDto)
  async createStage(@Param('projectId', ParseIntPipe) projectId: number,
                    @Body() createDto: CreateStageDto): Promise<Stage> {

    const project = await this.projectService.findOneOrFail(projectId);

    return await this.service.createStage(project, createDto);
  }

  @Get()
  @Serialize(StageDto)
  async getAll(): Promise<Stage[]> {
    return await this.service.getAll();
  }
}
