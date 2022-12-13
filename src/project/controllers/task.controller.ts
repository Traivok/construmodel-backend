import { Body, Controller, Get, HttpCode, HttpStatus, Logger, Patch, Query } from '@nestjs/common';
import { ApiResponse, ApiTags }                                              from '@nestjs/swagger';
import { CatchEntityErrors } from '../../commons/decorators/catch-entity-errors.decorator';
import { SprintService }     from '../services/sprint.service';
import { TaskService }       from '../services/task.service';
import { WorkFrontService }  from '../services/work-front.service';
import { UpdateTaskDto }     from '../dto/tasks/update-task.dto';
import { Sprint }            from '../entities/sprint.entity';
import { TaskDto }           from '../dto/tasks/task.dto';
import { Serialize }         from '../../commons/decorators/serialize.decorator';
import { SprintDto }         from '../dto/sprint.dto';
import { Task }              from '../entities/task.entity';
import { TaskDetailDto }     from '../dto/tasks/task-detail.dto';
import { TaskQueryDto }      from '../dto/tasks/task-query.dto';

@ApiTags('task')
@Controller('task')
@CatchEntityErrors()
export class TaskController {
  private readonly logger = new Logger(TaskController.name);

  constructor(private sprintService: SprintService,
              private taskService: TaskService,
              private workFrontService: WorkFrontService) {}

  @Patch()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: undefined })
  public async update(@Body() updateDto: UpdateTaskDto): Promise<void> {
    const sprints: Sprint[] = await this.sprintService.findNewerThan(updateDto.date);
    const workFront         = await this.workFrontService.findOrFail(updateDto.workFrontName);
    await this.taskService.update(updateDto.done, workFront, sprints);
  }

  @Get()
  @Serialize(TaskDetailDto)
  @ApiResponse({ status: HttpStatus.OK, type: TaskDetailDto, isArray: true })
  public async find(@Query() query: TaskQueryDto): Promise<Task[]> {
    return await this.taskService.findBy(query);
  }

}
