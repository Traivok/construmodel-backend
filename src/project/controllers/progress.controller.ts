import { Body, Controller, Get, HttpCode, HttpStatus, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ProgressService }                                                               from '../services/progress.service';
import { Serialize }                                                                     from '../../commons/decorators/serialize.decorator';
import { ApiResponse, ApiTags }                                                          from '@nestjs/swagger';
import { ProgressDto }                                                                   from '../dtos/progress.dto';
import { Progress }                                                                      from '../entities/progress.entity';
import { CreateProgressDto }                                                             from '../dtos/create-progress.dto';
import { SprintService }                                                                 from '../services/sprint.service';
import { WorkFrontService }                                                              from '../services/work-front.service';
import { BuildingDto }                                                                   from '../dtos/building.dto';
import { UpdateProgressDto }                                                             from '../dtos/update-progress.dto';
import { CatchEntityErrors }                                                             from '../../commons/decorators/catch-entity-errors.decorator';

@ApiTags('progress')
@Controller('progress')
@CatchEntityErrors()
export class ProgressController {
  constructor(
    protected sprintSrv: SprintService,
    protected workFrontSrv: WorkFrontService,
    protected service: ProgressService) {}

  @Get()
  @Serialize(ProgressDto)
  @ApiResponse({ status: HttpStatus.OK, type: ProgressDto, isArray: true, description: 'Returns all progresses' })
  async findAll(): Promise<Progress[]> {
    return await this.service.findAll();
  }

  @Post()
  @Serialize(ProgressDto)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, type: ProgressDto, description: 'Successful creation.' })
  async createProgress(@Body() createDto: CreateProgressDto): Promise<Progress> {
    return await this.service.create(createDto);
  }

  @Patch()
  @Serialize(ProgressDto)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: ProgressDto, description: 'Successful update.' })
  async updateFloor(@Query('workFrontId', ParseIntPipe) workFrontId: number,
                    @Query('sprintId', ParseIntPipe) sprintId: number,
                    @Body() dto: UpdateProgressDto): Promise<Progress> {
    return await this.service.updateCurrentFloor(workFrontId, sprintId, dto);
  }
}
