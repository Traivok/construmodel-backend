import {
  BadRequestException,
  Body,
  Controller, Get,
  HttpCode,
  HttpStatus, NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDto }        from '../dtos/create-task.dto';
import { Task }                 from '../entities/task.entity';
import { TaskService }          from '../service/task.service';
import { CatchEntityErrors }    from '../../commons/decorators/catch-entity-errors.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Serialize }            from '../../commons/decorators/serialize.decorator';
import { TaskDto }              from '../dtos/task.dto';
import { CompleteTaskDto }      from '../dtos/complete-task.dto';
import { StageService }         from '../service/stage.service';
import { StageDto }             from '../dtos/stage.dto';

@ApiTags('task')
@Controller()
@CatchEntityErrors()
export class TaskController {
  constructor(public service: TaskService,
              public stageService: StageService) {}

  @Post('project/:projectId/stage/:stageId/task')
  @Serialize(TaskDto)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, type: TaskDto, description: 'Successful creation.'})
  async createTask(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('stageId', ParseIntPipe) stageId: number,
    @Body() createDto: CreateTaskDto): Promise<Task> {

    const stage = await this.stageService.findByOrFail(stageId);

    if (stage.project.id !== projectId)
      throw new NotFoundException(`Stage #${stageId} is not a stage of Project #${projectId}`);

    return await this.service.createTask(stage, createDto);
  }

  @Patch('task/:id')
  @Serialize(TaskDto)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: TaskDto, description: 'Task completion.'})
  async completeTask(@Param('id', ParseIntPipe) id: number, @Body() completeTaskDto: CompleteTaskDto): Promise<Task> {
    return await this.service.completeTask(id, completeTaskDto);
  }

  @Get('/task')
  @Serialize(TaskDto)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: TaskDto, description: 'Returns all tasks.'})
  async findAll(): Promise<Task[]> {
    return await this.service.findAll();
  }

}
