import { Body, Controller, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateTaskDto }                                      from '../dtos/create-task.dto';
import { Task }                                               from '../entities/task.entity';
import { TaskService }                                        from '../service/task.service';
import { CatchEntityErrors }                                  from '../../commons/decorators/catch-entity-errors.decorator';
import { ApiTags }                                            from '@nestjs/swagger';
import { Serialize }                                          from '../../commons/decorators/serialize.decorator';
import { TaskDto }                                            from '../dtos/task.dto';
import { CompleteTaskDto }                                    from '../dtos/complete-task.dto';

@ApiTags('task')
@Controller('project/:projectId/stage/:stageId/task')
@CatchEntityErrors(Task.name)
export class TaskController {
  constructor(public service: TaskService) {}

  @Post()
  @Serialize(TaskDto)
  async createTask(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('stageId', ParseIntPipe) stageId: number,
    @Body() createDto: CreateTaskDto): Promise<Task> {
    return await this.service.createTask(createDto);
  }

  @Patch(':id')
  @Serialize(TaskDto)
  async completeTask(@Param('id', ParseIntPipe) id: number, @Body() completeTaskDto: CompleteTaskDto): Promise<Task> {
    return await this.service.completeTask(id, completeTaskDto);
  }

}
