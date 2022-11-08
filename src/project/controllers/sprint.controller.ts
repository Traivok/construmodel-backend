import {
  Body,
  Controller, Get,
  HttpCode,
  HttpStatus,
  Logger, Param, ParseIntPipe,
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

  @Get('previous')
  @Serialize(SprintDto)
  @ApiResponse({ status: HttpStatus.OK, type: SprintDto })
  async findPrevious(): Promise<Sprint | null> {
    return await this.sprintService.findPrevious();
  }

  @Get('current')
  @Serialize(SprintDto)
  @ApiResponse({ status: HttpStatus.OK, type: SprintDto })
  async findCurrent(): Promise<Sprint | null> {
    return await this.sprintService.findCurrent();
  }

  @Get('next')
  @Serialize(SprintDto)
  @ApiResponse({ status: HttpStatus.OK, type: SprintDto })
  async findNext(): Promise<Sprint | null> {
    return await this.sprintService.findNext();
  }

  @Get(':id')
  @Serialize(SprintDto)
  @ApiResponse({ status: HttpStatus.OK, type: SprintDto })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Sprint> {
    return await this.sprintService.findOrFail(id);
  }

  @Put()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.CREATED)
  @Serialize(SprintDto)
  @ApiResponse({ status: HttpStatus.CREATED, type: SprintDto, isArray: true })
  async createProject(
    @Body() body: CreateProjectDto,
    @UploadedFile() file: Express.Multer.File) {
    const csv    = file.buffer.toString();
    const parsed = this.sprintService.parseCsvProject(csv);

    return await this.sprintService.createProject(parsed);
  }

}
