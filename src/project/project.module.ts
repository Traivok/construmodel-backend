import { Module }              from '@nestjs/common';
import { TypeOrmModule }       from '@nestjs/typeorm';
import { Entities }            from './entities';
import { BuildingController }  from './controllers/building.controller';
import { ProgressService }     from './services/progress.service';
import { WorkFrontService }    from './services/work-front.service';
import { BuildingService }     from './services/building.service';
import { WorkFrontController } from './controllers/work-front.controller';
import { ProgressController } from './controllers/progress.controller';
import { SprintService }       from './services/sprint.service';

@Module({
  controllers: [
    BuildingController,
    WorkFrontController,
    ProgressController,
  ],
  providers:   [
    BuildingService,
    WorkFrontService,
    ProgressService,
    SprintService,
  ],
  imports:     [
    TypeOrmModule.forFeature([
      ...Entities,
    ]),

  ],
})
export class ProjectModule {}
