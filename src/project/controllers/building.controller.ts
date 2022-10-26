import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
}                                            from '@nestjs/common';
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BuildingService }                   from '../services/building.service';
import { WorkFrontService }                  from '../services/work-front.service';
import { CatchEntityErrors }                 from '../../commons/decorators/catch-entity-errors.decorator';
import { Serialize }                         from '../../commons/decorators/serialize.decorator';
import { BuildingFullDto }                   from '../dtos/building/building-full.dto';
import { CreateBuildingDto }                 from '../dtos/create-building.dto';
import { Building }                          from '../entities/building.entity';
import { SprintService }                     from '../services/sprint.service';
import { Express }                           from 'express';
import { FileInterceptor }                   from '@nestjs/platform-express';
import { CreateProjectDto }                  from '../dtos/create-project.dto';
import { BuildingDto }                       from '../dtos/building/building.dto';
import { CreateExecutionDto }                from '../dtos/create-execution.dto';
import { ExecutionService }                  from '../services/execution.service';
import { WorkFront }                         from '../entities/work-front.entity';

@ApiTags('building')
@Controller('building')
@CatchEntityErrors()
export class BuildingController {

  private logger = new Logger(BuildingController.name);

  constructor(protected buildingSrv: BuildingService,
              protected workFrontSrv: WorkFrontService,
              protected sprintSrv: SprintService,
              protected executionSrv: ExecutionService,
  ) {}

  /* Building */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Serialize(BuildingDto)
  @ApiResponse({ status: HttpStatus.CREATED, type: BuildingDto, description: 'Successful creation.' })
  async createBuilding(@Body() createDto: CreateBuildingDto): Promise<Building> {
    return await this.buildingSrv.create(createDto);
  }

  @Get()
  @Serialize(BuildingDto)
  @ApiResponse({ status: HttpStatus.OK, type: BuildingDto, isArray: true, description: 'Returns all Buildings' })
  async getAll(): Promise<Building[]> {
    return await this.buildingSrv.findAll();
  }

  @Get(':buildingId')
  @Serialize(BuildingFullDto)
  @ApiResponse({ status: HttpStatus.OK, type: BuildingFullDto, description: 'Returns a Building' })
  async findOne(@Param('buildingId', ParseIntPipe) buildingId: number): Promise<Building> {
    return await this.buildingSrv.findOneOrFail(buildingId);
  }

  @Put(':buildingId/project')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.OK)
  @Serialize(BuildingDto)
  @ApiResponse({ status: HttpStatus.OK, type: BuildingDto, description: 'Creates a project' })
  async createProject(
    @Param('buildingId', ParseIntPipe) buildingId: number,
    @Body() body: CreateProjectDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Building> {
    const csv    = file.buffer.toString();
    const parsed = this.buildingSrv.parseCsvProject(csv);

    await this.buildingSrv.createProject(buildingId, parsed);

    return await this.buildingSrv.findOneOrFail(buildingId);
  }

  @Post(':buildingId/execution')
  @HttpCode(HttpStatus.CREATED)
  async createExecution(
    @Param('buildingId', ParseIntPipe) buildingId: number,
    @Body() body: CreateExecutionDto,
  ): Promise<void> {
    const building: Building   = await this.buildingSrv.findOneOrFail(buildingId, false);
    const workFront: WorkFront = await this.workFrontSrv.findOneOrFail(body.workFrontName);

    await this.executionSrv.create({ ...body, building, workFront });
  }
}
