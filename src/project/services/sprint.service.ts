import { BadRequestException, Injectable, Logger }            from '@nestjs/common';
import { InjectRepository }                                   from '@nestjs/typeorm';
import { Sprint }                                             from '../entities/sprint.entity';
import { Repository }                                         from 'typeorm';
import { CreateSprintDto }                                    from '../dtos/create-sprint.dto';
import { Building }                                           from '../entities/building.entity';
import { CreateMultipleSprintsDto }                           from '../dtos/create-multiple-sprints.dto';
import { isSunday, nextMonday, nextSaturday, previousSunday } from 'date-fns/fp';

@Injectable()
export class SprintService {
  private readonly logger = new Logger(SprintService.name);

  constructor(@InjectRepository(Sprint) protected repo: Repository<Sprint>) {}

  public async create(dto: CreateSprintDto, building: Building): Promise<Sprint> {
    const [ start, end ] = this.createWeek(dto.week);
    const sprint: Sprint = this.repo.create({ start, end, building });
    return await this.repo.save(sprint);
  }

  public async createBatch(createMultipleSprints: CreateMultipleSprintsDto, building: Building, save = true): Promise<Sprint[]> {
    if (createMultipleSprints.firstWeek.getTime() >= createMultipleSprints.lastWeek.getTime())
      throw new BadRequestException('firstWeek should come after lastWeek');

    const sprints: Sprint[] = this.createWeeks(createMultipleSprints)
      .map(([ start, end ]) => this.repo.create({ start, end, building }));

    return save ? await this.repo.save(sprints) : sprints;
  }

  private createWeeks(weeks: CreateMultipleSprintsDto): [ Date, Date ][] {
    const firstWeek = this.createWeek(weeks.firstWeek);
    const lastWeek  = this.createWeek(weeks.lastWeek);
    const out       = [ firstWeek ];

    // test for overlaps
    if (lastWeek[0].getTime() < firstWeek[1].getTime())
      throw new BadRequestException('Sprint Overlapping');


    let curr = firstWeek;
    while (true) {
      curr = this.createWeek(nextMonday(curr[1]));
      out.push(curr);

      if (curr[0].getTime() >= lastWeek[0].getTime())
        break;
    }

    return out;
  }

  private createWeek(date: Date): [ Date, Date ] {
    if (isSunday(date)) {
      const start = date;
      const end   = nextSaturday(date);

      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 0);

      return [ start, end ];

    } else {
      return this.createWeek(previousSunday(date));
    }
  }

}
