import { Module }            from '@nestjs/common';
import { ProjectController } from './controllers/project.controller';
import { TaskController }    from './controllers/task.controller';
import { StageController }   from './controllers/stage.controller';
import { ProjectService }    from './service/project.service';
import { TaskService }       from './service/task.service';
import { StageService }      from './service/stage.service';
import { TypeOrmModule }     from '@nestjs/typeorm';
import { User }              from '../user/entities/user.entity';
import { Project }           from './entities/project.entity';
import { Stage }             from './entities/stage.entity';
import { Task }              from './entities/task.entity';

@Module({
  controllers: [
    ProjectController,
    TaskController,
    StageController,
  ],
  providers:   [
    ProjectService,
    TaskService,
    StageService,
  ],
  imports:     [
    TypeOrmModule.forFeature([
      Project,
      Stage,
      Task,
    ]),

  ],
})
export class ProjectModule {}
