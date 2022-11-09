import { Module }              from '@nestjs/common';
import { WorkFrontController } from './controllers/work-front.controller';
import { TaskService } from './services/task.service';
import { TaskController } from './controllers/task.controller';
import { BuildingController } from './controllers/building.controller';
import { BuildingService } from './services/building.service';
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
    BuildingController,
  ],
  providers:   [
    SprintService,
    WorkFrontService,
    TaskService,
    BuildingService,
  ],
  imports:     [
    TypeOrmModule.forFeature([
      ...ProjectEntities,
    ]),
  ],
})
export class ProjectModule {}
