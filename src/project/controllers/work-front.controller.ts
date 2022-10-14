import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags }                              from '@nestjs/swagger';
import { WorkFrontService }                                  from '../services/work-front.service';
import { Serialize }                                         from '../../commons/decorators/serialize.decorator';
import { WorkFrontDto }                                      from '../dtos/work-front.dto';
import { WorkFront }                                         from '../entities/work-front.entity';
import { CreateWorkFrontDto }                                from '../dtos/create-work-front.dto';

@ApiTags('work-front')
@Controller('work-front')
export class WorkFrontController {
  constructor(protected workFrontSrv: WorkFrontService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Serialize(WorkFrontDto)
  @ApiResponse({ status: HttpStatus.CREATED, type: WorkFrontDto, description: 'Successful creation.' })
  async createWorkFront(@Body() createDto: CreateWorkFrontDto): Promise<WorkFront> {
    return await this.workFrontSrv.create(createDto);
  }

  @Get()
  @Serialize(WorkFrontDto)
  @ApiResponse({ status: HttpStatus.OK, type: WorkFrontDto, isArray: true, description: 'All work fronts.'})
  async getAll(): Promise<WorkFront[]> {
    return await this.workFrontSrv.getAll();
  }
}
