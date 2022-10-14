import { Module }              from '@nestjs/common';
import { TypeOrmModule }       from '@nestjs/typeorm';
import { Entities }            from './entities';
import { BuildingController }  from './controllers/building.controller';
import { ProgressionService }  from './service/progression.service';
import { WorkFrontService }    from './service/work-front.service';
import { BuildingService }     from './service/building.service';
import { WorkFrontController } from './controllers/work-front.controller';
import { SprintService }       from './service/sprint.service';

@Module({
  controllers: [
    BuildingController,
    WorkFrontController,
  ],
  providers:   [
    BuildingService,
    WorkFrontService,
    ProgressionService,
    SprintService,
  ],
  imports:     [
    TypeOrmModule.forFeature([
      ...Entities,
    ]),

  ],
})
export class ProjectModule {}
