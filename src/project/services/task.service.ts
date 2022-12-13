import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository }   from '@nestjs/typeorm';
import { Repository }         from 'typeorm';
import { Task }               from '../entities/task.entity';
import { WorkFront }          from '../entities/work-front.entity';
import { Sprint }             from '../entities/sprint.entity';
import { TaskQueryDto }       from '../dto/tasks/task-query.dto';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(@InjectRepository(Task) public repository: Repository<Task>) {}

  public async update(done: number, workFront: WorkFront, sprints: Sprint[]): Promise<Task[]> {
    const tasks: Task[] = sprints.map(s => s.tasks.filter(t => t.workFrontName === workFront.name)).flat();
    return await this.repository.save(tasks.map(task => ( { ...task, done } )));
  }

  public async findOneBy(workFrontName: string, sprintId: number): Promise<Task> {
    return await this.repository.findOneOrFail({
      where:     { workFrontName, sprintId },
      relations: [ 'sprint' ],
    });
  }

  public async findBy(where: Partial<Task>): Promise<Task[]> {
    return  await this.repository.find({
      where,
      relations: [ 'sprint', 'workFront' ],
    });
  }
}
