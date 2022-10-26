import { EntityManager, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { Sprint }                                                                              from '../entities/sprint.entity';
import { BadRequestException, Logger }                                                         from '@nestjs/common';
import { Plan }                                                                                from '../entities/plan.entity';
import { Building }                                                                            from '../entities/building.entity';

@EventSubscriber()
export class PlanSubscriber implements EntitySubscriberInterface<Plan> {

  private readonly logger = new Logger(Sprint.name);

  public listenTo() {
    return Plan;
  }

  private static async checkFloors(plan: Plan, manager: EntityManager): Promise<void> {
    const sprint = await manager.findOneBy(Sprint, { id: plan.sprintId });

    if (sprint === null)
      return;

    const building = await manager.findOneBy(Building, { id: sprint.buildingId });

    if (building === null)
      return;

    if (building.floorCount < plan.floor)
      throw new BadRequestException(`This building has only ${ building.floorCount } floors.`);

  }

  public async beforeInsert(event: InsertEvent<Plan>): Promise<void> {
    await PlanSubscriber.checkFloors(event.entity, event.manager);
  }


  public async beforeUpdate(event: UpdateEvent<Plan>): Promise<void> {
    if (event.updatedColumns.some(c => [ 'plannedFloor', 'currentFloor' ].includes(c.propertyName)))
      await PlanSubscriber.checkFloors({
        ...event.databaseEntity,
        ...event.entity,
      }, event.manager);
  }

}