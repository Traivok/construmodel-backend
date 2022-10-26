import { Injectable, Logger }       from '@nestjs/common';
import { InjectRepository }         from '@nestjs/typeorm';
import { Sprint }                   from '../entities/sprint.entity';
import { Repository }               from 'typeorm';
import { Building }                 from '../entities/building.entity';
import { isSunday, previousSunday } from 'date-fns/fp';

@Injectable()
export class SprintService {
  private readonly logger = new Logger(SprintService.name);

  constructor(@InjectRepository(Sprint) protected repo: Repository<Sprint>) {}

  public get repository(): Repository<Sprint> { return this.repo; };

  public static forceSunday(date: Date): Date {
    const sunday: Date = isSunday(date) ? date : previousSunday(date);
    sunday.setHours(0, 0, 0, 0);
    return sunday;
  }
}
