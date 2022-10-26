import { Controller, Logger } from '@nestjs/common';
import { PlanService }        from '../services/plan.service';
import { ApiTags }            from '@nestjs/swagger';
import { CatchEntityErrors }  from '../../commons/decorators/catch-entity-errors.decorator';

@ApiTags('plan')
@Controller('plan')
@CatchEntityErrors()
export class PlanController {
  private readonly logger = new Logger(PlanController.name);

  constructor(protected service: PlanService) {}
}
