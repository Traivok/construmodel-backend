import { Module }              from '@nestjs/common';
import { TypeOrmModule }       from '@nestjs/typeorm';
import { Entities }            from './entities';
import { BuildingController } from './controllers/building.controller';
import { PlanService }        from './services/plan.service';
import { WorkFrontService }   from './services/work-front.service';
import { BuildingService }     from './services/building.service';
import { WorkFrontController } from './controllers/work-front.controller';
import { ExecutionService }    from './services/execution.service';
import { PlanController }      from './controllers/plan.controller';
import { SprintService }       from './services/sprint.service';

@Module({
  controllers: [
    BuildingController,
    WorkFrontController,
    PlanController,
  ],
  providers:   [
    BuildingService,
    WorkFrontService,
    PlanService,
    SprintService,
    ExecutionService,
  ],
  imports:     [
    TypeOrmModule.forFeature([
      ...Entities,
    ]),

  ],
})
export class ProjectModule {}
