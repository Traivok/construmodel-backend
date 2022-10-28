import { Module }              from '@nestjs/common';
import { WorkFrontController } from './controllers/work-front.controller';
import { TaskService } from './services/task.service';
import { TaskController } from './controllers/task.controller';
import { SprintService }       from './services/sprint.service';
import { WorkFrontService }    from './services/work-front.service';
import { SprintController }    from './controllers/sprint.controller';
import { TypeOrmModule }       from '@nestjs/typeorm';
import { ProjectEntities }     from './entities';

@Module({
  controllers: [
    WorkFrontController,
    SprintController,
    TaskController,
  ],
  providers:   [
    SprintService,
    WorkFrontService,
    TaskService,
  ],
  imports:     [
    TypeOrmModule.forFeature([
      ...ProjectEntities,
    ]),
  ],
})
export class ProjectModule {}
