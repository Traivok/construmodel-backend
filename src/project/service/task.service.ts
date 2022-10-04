import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository }   from '@nestjs/typeorm';
import { Task }             from '../entities/task.entity';
import { Repository }       from 'typeorm';
import { CreateTaskDto }    from '../dtos/create-task.dto';
import { CompleteTaskDto }  from '../dtos/complete-task.dto';
import { Stage }            from '../entities/stage.entity';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(@InjectRepository(Task) public repo: Repository<Task>) {}

  async createTask(stage: Stage, createDto: CreateTaskDto): Promise<Task> {
    const task = this.repo.create(createDto);

    task.stage = stage;

    return await this.repo.save(task);
  }

  async completeTask(id: number, completeTaskDto: CompleteTaskDto): Promise<Task> {
    const task = await this.repo.findOneByOrFail({ id });
    return this.repo.save({ ...task, ...completeTaskDto });
  }

  async findAll(): Promise<Task[]> {
    return this.repo.find();
  }
}
