import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { BadRequestException, Logger }                             from '@nestjs/common';
import { Sprint }                                                  from '../entities/sprint.entity';

@EventSubscriber()
export class SprintSubscriber implements EntitySubscriberInterface<Sprint> {

  private readonly logger = new Logger(Sprint.name);

  public listenTo() {
    return Sprint;
  }

  private static overlap(a: Sprint, b: Sprint): boolean {
    return a.start >= b.start && a.start < b.end ||
           a.end > b.start && a.end <= b.end;
  }

  public async beforeInsert(event: InsertEvent<Sprint>): Promise<void> {
    const entity = event.entity;
    const others = await event.manager.findBy(Sprint, { buildingId: entity.buildingId });
    if (others.some(o => SprintSubscriber.overlap(entity, o))) {
      throw new BadRequestException('Overlaps with existing sprint');
    }
  }
}