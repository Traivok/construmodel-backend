import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { BadRequestException, Logger }                                          from '@nestjs/common';
import { Sprint }                                                               from '../entities/sprint.entity';
import { isSunday }                                                             from 'date-fns/fp';

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
    event.entity.start.setHours(0, 0, 0, 0);
  }
}