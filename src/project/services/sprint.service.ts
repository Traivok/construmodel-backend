import { Injectable, Logger }       from '@nestjs/common';
import { InjectRepository }         from '@nestjs/typeorm';
import { Sprint }                   from '../entities/sprint.entity';
import { Repository }               from 'typeorm';
import { CreateSprintDto }          from '../dtos/create-sprint.dto';
import { Building }                 from '../entities/building.entity';
import { isSunday, previousSunday } from 'date-fns/fp';

@Injectable()
export class SprintService {
  private readonly logger = new Logger(SprintService.name);

  constructor(@InjectRepository(Sprint) protected repo: Repository<Sprint>) {}

  public get repository(): Repository<Sprint> { return this.repo; };

  public async create(dto: CreateSprintDto, building: Building): Promise<Sprint> {
    dto.start            = SprintService.forceSunday(dto.start);
    const sprint: Sprint = this.repo.create({ start: dto.start, building });
    return await this.repo.save(sprint);
  }

  public async createMultipleWithoutSaving(building: Building, ...dtos: CreateSprintDto[]): Promise<Sprint[]> {
    return dtos.map((dto: CreateSprintDto) => this.repo.create({
      building,
      start: dto.start,
    }));
  }

  public static forceSunday(date: Date): Date {
    const sunday: Date = isSunday(date) ? date : previousSunday(date);
    sunday.setHours(0, 0, 0, 0);
    return sunday;
  }
}
