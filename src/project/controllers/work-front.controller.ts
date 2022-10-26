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
}
