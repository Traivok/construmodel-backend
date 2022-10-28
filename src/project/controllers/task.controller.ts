import { Body, Controller, HttpCode, HttpStatus, Logger, Patch } from '@nestjs/common';
import { ApiResponse, ApiTags }                                  from '@nestjs/swagger';
import { CatchEntityErrors }                                     from '../../commons/decorators/catch-entity-errors.decorator';
import { SprintService }                                         from '../services/sprint.service';
import { TaskService }                                           from '../services/task.service';
import { WorkFrontService }                                      from '../services/work-front.service';
import { UpdateTaskDto }                                         from '../dto/update-task.dto';
import { Sprint }                                                from '../entities/sprint.entity';

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
    const sprints: Sprint[] = await this.sprintService.findOlderThan(updateDto.date);
    const workFront         = await this.workFrontService.findOrFail(updateDto.workFrontName);
    await this.taskService.update(updateDto.done, workFront, sprints);
  }

}
