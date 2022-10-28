import { Body, Controller, Get, HttpCode, HttpStatus, Logger, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags }                                                                from '@nestjs/swagger';
import { WorkFrontService }                                                                    from '../services/work-front.service';
import { Serialize }                                                                           from '../../commons/decorators/serialize.decorator';
import { WorkFrontDto }                                                                        from '../dto/work-front.dto';
import { CreateWorkFrontDto }                                                                  from '../dto/create-work-front.dto';
import { WorkFront }                                                                           from '../entities/work-front.entity';
import { SprintDto }                                                                           from '../dto/sprint.dto';
import { SprintService }                                                                       from '../services/sprint.service';
import { CreateSprintDto }                                                                     from '../dto/create-sprint.dto';
import { CatchEntityErrors }                                                                   from '../../commons/decorators/catch-entity-errors.decorator';

@ApiTags('work-front')
@Controller('work-front')
@CatchEntityErrors()
export class WorkFrontController {
  private readonly logger = new Logger(WorkFrontController.name);

  constructor(public workFrontService: WorkFrontService,) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Serialize(WorkFrontDto)
  @ApiResponse({ status: HttpStatus.CREATED, type: WorkFrontDto })
  async createWorkFront(@Body() createDto: CreateWorkFrontDto): Promise<WorkFront> {
    return this.workFrontService.create(createDto);
  }

  @Get()
  @Serialize(WorkFrontDto)
  @ApiResponse({ status: HttpStatus.OK, isArray: true, type: WorkFrontDto })
  async findAll(): Promise<WorkFront[]> {
    return this.workFrontService.findAll();
  }
}