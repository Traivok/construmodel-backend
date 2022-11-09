import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger, Param, ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
}                                            from '@nestjs/common';
import { BuildingService }                   from '../services/building.service';
import { Serialize }                         from '../../commons/decorators/serialize.decorator';
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Building }                          from '../entities/building.entity';
import { BuildingDto }                       from '../dto/building.dto';
import { CreateBuildingDto }                 from '../dto/create-building.dto';
import { FileInterceptor }                   from '@nestjs/platform-express';
import { SprintDto }                         from '../dto/sprint.dto';
import { CreateProjectDto }                  from '../dto/create-project.dto';
import { SprintService }                     from '../services/sprint.service';
import { FullBuildingDto }                   from '../dto/full-building.dto';

@ApiTags('building')
@Controller('building')
export class BuildingController {
  private readonly logger = new Logger(BuildingController.name);

  constructor(private buildingService: BuildingService,
              private sprintService: SprintService) {}


  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Serialize(BuildingDto)
  @ApiResponse({ status: HttpStatus.CREATED, type: BuildingDto })
  async createWorkFront(@Body() createDto: CreateBuildingDto): Promise<Building> {
    return await this.buildingService.create(createDto);
  }

  @Get()
  @Serialize(BuildingDto)
  @ApiResponse({ status: HttpStatus.OK, isArray: true, type: BuildingDto })
  async findAll(): Promise<Building[]> {
    return this.buildingService.findAll();
  }

  @Get(':id')
  @Serialize(FullBuildingDto)
  @ApiResponse({ status: HttpStatus.OK, type: FullBuildingDto })
  async find(@Param('id', ParseIntPipe) id: number): Promise<Building> {
    return this.buildingService.findOrFail(id);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.CREATED)
  @Serialize(SprintDto)
  @ApiResponse({ status: HttpStatus.CREATED, type: SprintDto, isArray: true })
  async createProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateProjectDto,
    @UploadedFile() file: Express.Multer.File) {
    const building = await this.buildingService.findOrFail(id);

    const csv    = file.buffer.toString();
    const parsed = this.sprintService.parseCsvProject(csv);

    return await this.sprintService.createProject(building, parsed);
  }

}
