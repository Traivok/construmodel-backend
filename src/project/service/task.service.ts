import { Injectable }       from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task }             from '../entities/task.entity';
import { Repository }       from 'typeorm';
import { CreateTaskDto }    from '../dtos/create-task.dto';
import { CompleteTaskDto }  from '../dtos/complete-task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) public repo: Repository<Task>) {
  }

  async createTask(createDto: CreateTaskDto): Promise<Task> {
    const task = this.repo.create(createDto);
    return await this.repo.save(task);
  }

  async completeTask(id: number, completeTaskDto: CompleteTaskDto): Promise<Task> {
    const task = this.repo.findOneByOrFail({ id });
    return this.repo.save({ ...task, ...completeTaskDto });
  }
}
