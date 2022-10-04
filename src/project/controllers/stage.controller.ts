import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiResponse, ApiTags }                                                   from '@nestjs/swagger';
import { CatchEntityErrors }                                                      from '../../commons/decorators/catch-entity-errors.decorator';
import { Stage }                                                                  from '../entities/stage.entity';
import { StageService }                                                           from '../service/stage.service';
import { CreateStageDto }                                                         from '../dtos/create-stage.dto';
import { Serialize }                                                              from '../../commons/decorators/serialize.decorator';
import { StageDto }                                                               from '../dtos/stage.dto';
import { ProjectService }                                                         from '../service/project.service';
import { Project }                                                                from '../entities/project.entity';
import { ProjectDto }                                                             from '../dtos/project.dto';

@ApiTags('stage')
@Controller()
@CatchEntityErrors()
export class StageController {
  constructor(public projectService: ProjectService, public service: StageService) {}

  @Post('project/:projectId/stage')
  @Serialize(StageDto)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, type: StageDto, description: 'Successful creation.'})
  async createStage(@Param('projectId', ParseIntPipe) projectId: number,
                    @Body() createDto: CreateStageDto): Promise<Stage> {

    const project = await this.projectService.findOneOrFail(projectId);

    return await this.service.createStage(project, createDto);
  }

  @Get('stage')
  @Serialize(StageDto)
  @ApiResponse({ status: HttpStatus.OK, type: StageDto, isArray: true, description: 'Successful creation.'})
  async getAll(@Param('projectId', ParseIntPipe) projectId: number): Promise<Stage[]> {
    return await this.service.getAll();
  }
}
