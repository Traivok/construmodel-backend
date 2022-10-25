import { EntityManager, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { Sprint }                                                                              from '../entities/sprint.entity';
import { BadRequestException, Logger }                                                         from '@nestjs/common';
import { Progress }                                                                            from '../entities/progress.entity';
import { Building }                                                                            from '../entities/building.entity';

@EventSubscriber()
export class ProgressSubscriber implements EntitySubscriberInterface<Progress> {

  private readonly logger = new Logger(Sprint.name);

  public listenTo() {
    return Progress;
  }

  private static async checkFloors(progress: Progress, manager: EntityManager): Promise<void> {
    const sprint = await manager.findOneBy(Sprint, { id: progress.sprintId });

    if (sprint === null)
      return;

    const building = await manager.findOneBy(Building, { id: sprint.buildingId });

    if (building === null)
      return;

    if (building.floorCount < progress.plannedFloor || building.floorCount < progress.currentFloor)
      throw new BadRequestException(`This building has only ${ building.floorCount } floors.`);

  }

  public async beforeInsert(event: InsertEvent<Progress>): Promise<void> {
    await ProgressSubscriber.checkFloors(event.entity, event.manager);
  }


  public async beforeUpdate(event: UpdateEvent<Progress>): Promise<void> {
    if (event.updatedColumns.some(c => [ 'plannedFloor', 'currentFloor' ].includes(c.propertyName)))
      await ProgressSubscriber.checkFloors({
        ...event.databaseEntity,
        ...event.entity,
      }, event.manager);
  }

}