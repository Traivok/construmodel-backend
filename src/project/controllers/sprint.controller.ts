import {
  Body,
  Controller, Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
}                                            from '@nestjs/common';
import { SprintService }                     from '../services/sprint.service';
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor }                   from '@nestjs/platform-express';
import { Serialize }                         from '../../commons/decorators/serialize.decorator';
import { SprintDto }                         from '../dto/sprint.dto';
import { Sprint }                            from '../entities/sprint.entity';
import { CreateProjectDto }                  from '../dto/create-project.dto';

@ApiTags('sprint')
@Controller('sprint')
export class SprintController {
  private readonly logger = new Logger(SprintController.name);

  constructor(public sprintService: SprintService) {}

  @Get()
  @Serialize(SprintDto)
  @ApiResponse({ status: HttpStatus.OK, type: SprintDto, isArray: true })
  async find(): Promise<Sprint[]> {
    return await this.sprintService.find();
  }


  @Put()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.CREATED)
  @Serialize(SprintDto)
  @ApiResponse({ status: HttpStatus.OK, type: SprintDto, isArray: true })
  async createProject(
    @Body() body: CreateProjectDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Sprint[]> {
    const csv    = file.buffer.toString();
    const parsed = this.sprintService.parseCsvProject(csv);

    return await this.sprintService.createProject(parsed);
  }

}
