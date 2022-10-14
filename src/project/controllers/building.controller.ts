import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
}                               from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BuildingService }      from '../service/building.service';
import { WorkFrontService }     from '../service/work-front.service';
import { ProgressionService }   from '../service/progression.service';
import { CatchEntityErrors }    from '../../commons/decorators/catch-entity-errors.decorator';
import { Serialize }            from '../../commons/decorators/serialize.decorator';
import { BuildingDto }          from '../dtos/building.dto';
import { CreateBuildingDto }    from '../dtos/create-building.dto';
import { Building }             from '../entities/building.entity';
import { WorkFrontDto }         from '../dtos/work-front.dto';
import { WorkFront }            from '../entities/work-front.entity';
import { SprintDto }            from '../dtos/sprint.dto';
import { CreateSprintDto }      from '../dtos/create-sprint.dto';
import { Sprint }               from '../entities/sprint.entity';
import { SprintService }        from '../service/sprint.service';

@ApiTags('building')
@Controller('building')
@CatchEntityErrors()
export class BuildingController {

  constructor(protected buildingSrv: BuildingService,
              protected workFrontSrv: WorkFrontService,
              protected sprintSrv: SprintService,
              protected progressionSrv: ProgressionService) {}

  /* Building */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Serialize(BuildingDto)
  @ApiResponse({ status: HttpStatus.CREATED, type: BuildingDto, description: 'Successful creation.' })
  async createBuilding(@Body() createBuildingDto: CreateBuildingDto): Promise<Building> {
    return await this.buildingSrv.create(createBuildingDto);
  }

  @Get()
  @Serialize(BuildingDto)
  @ApiResponse({ status: HttpStatus.OK, type: BuildingDto, description: 'Returns all Buildings' })
  async getAll(): Promise<Building[]> {
    return await this.buildingSrv.findAll();
  }

  /* WorkFront */
  @Post(':buildingId/work-front/:workFrontId')
  @Serialize(BuildingDto)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, type: WorkFrontDto, description: 'Successful creation.' })
  async addWorkFront(@Param('buildingId', ParseIntPipe) buildingId: number,
                     @Param('workFrontId', ParseIntPipe) workFrontId: number): Promise<Building> {
    const building  = await this.buildingSrv.findOneOrFail(buildingId);
    const workFront = await this.workFrontSrv.findOneOrFail(workFrontId);

    return await this.buildingSrv.addWorkFront(building, workFront);
  }

  /* Sprint */
  @Post(':buildingId/sprint')
  @Serialize(SprintDto)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, type: SprintDto, description: 'Successful creation.' })
  async createSprint(@Param('buildingId', ParseIntPipe) buildingId: number,
                     @Body() createSprintDto: CreateSprintDto): Promise<Sprint> {
    const building = await this.buildingSrv.findOneOrFail(buildingId);
    return await this.sprintSrv.create(createSprintDto, building);
  }


}
