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
import { BuildingCompactDto, BuildingDto }   from '../dtos/building.dto';
import { CreateBuildingDto }                 from '../dtos/create-building.dto';
import { Building }                          from '../entities/building.entity';
import { SprintService }                     from '../services/sprint.service';
import { Express }                           from 'express';
import { FileInterceptor }                   from '@nestjs/platform-express';
import { CreateProjectDto }                  from '../dtos/create-project.dto';

@ApiTags('building')
@Controller('building')
@CatchEntityErrors()
export class BuildingController {

  private logger = new Logger(BuildingController.name);

  constructor(protected buildingSrv: BuildingService,
              protected workFrontSrv: WorkFrontService,
              protected sprintSrv: SprintService) {}

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
  @Serialize(BuildingDto)
  @ApiResponse({ status: HttpStatus.OK, type: BuildingDto, description: 'Returns a Building' })
  async findOne(@Param('buildingId', ParseIntPipe) buildingId: number): Promise<Building> {
    return await this.buildingSrv.findOneOrFail(buildingId);
  }

  @Put(':buildingId/project')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.CREATED)
  @Serialize(BuildingDto)
  @ApiResponse({ status: HttpStatus.CREATED, type: BuildingDto, description: 'Creates a project' })
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


  // /* WorkFront */
  // @Post(':buildingId/work-front/:workFrontId')
  // @Serialize(BuildingDto)
  // @HttpCode(HttpStatus.CREATED)
  // @ApiResponse({ status: HttpStatus.CREATED, type: WorkFrontDto, description: 'Successful creation.' })
  // async addWorkFront(@Param('buildingId', ParseIntPipe) buildingId: number,
  //                    @Param('workFrontId', ParseIntPipe) workFrontId: number): Promise<Building> {
  //   const building  = await this.buildingSrv.findOneOrFail(buildingId);
  //   const workFront = await this.workFrontSrv.findOneOrFail(workFrontId);
  //
  //   return await this.buildingSrv.addWorkFront(building, workFront);
  // }
  //
  // /* Sprint */
  // @Post(':buildingId/sprint')
  // @Serialize(SprintDto)
  // @HttpCode(HttpStatus.CREATED)
  // @ApiResponse({ status: HttpStatus.CREATED, type: SprintDto, description: 'Successful creation.' })
  // async createSprint(@Param('buildingId', ParseIntPipe) buildingId: number,
  //                    @Body() createSprintDto: CreateSprintDto): Promise<Sprint> {
  //   const building = await this.buildingSrv.findOneOrFail(buildingId);
  //   return await this.sprintSrv.create(createSprintDto, building);
  // }
}

function PUT(arg0: string) {
  throw new Error('Function not implemented.');
}
