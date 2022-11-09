import { BadRequestException, Injectable, Logger }                        from '@nestjs/common';
import { Sprint, SprintStatus }                                           from '../entities/sprint.entity';
import { WorkFront }                                                      from '../entities/work-front.entity';
import { CreateSprintDto }                                                from '../dto/create-sprint.dto';
import { isSunday }                                                       from 'date-fns/fp';
import { nextSaturday, previousSunday }                                   from 'date-fns';
import { DataSource, DeepPartial, MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository }                             from '@nestjs/typeorm';
import { parse }                                                          from 'papaparse';
import { ParsedProject }                                                  from '../interfaces/parsed-project';
import { WorkFrontService }                                               from './work-front.service';
import { TaskService }                                                    from './task.service';
import { Task }                                                           from '../entities/task.entity';
import { Building }                                                       from '../entities/building.entity';

@Injectable()
export class SprintService {
  private readonly logger = new Logger(SprintService.name);

  constructor(@InjectRepository(Sprint) public repository: Repository<Sprint>,
              @InjectDataSource() private dataSource: DataSource,
              private workFrontService: WorkFrontService,
              private taskService: TaskService) {}

  public async find(): Promise<Sprint[]> {
    return this.repository.find({
      relations: [ 'tasks', 'tasks.workFront' ],
    });
  }

  public async findOrFail(id: number): Promise<Sprint> {
    return await this.repository.findOneOrFail({
      where:     { id },
      relations: [ 'tasks', 'tasks.workFront' ],
    });
  }

  public async createSprint(dto: CreateSprintDto): Promise<Sprint> {
    const sprint: Sprint = this.repository.create(this.fixDates(dto));
    return await this.repository.save(sprint);
  }

  public async createMultiple(dtos: CreateSprintDto[]): Promise<Sprint[]> {
    const sprints: Sprint[] = this.repository.create(dtos.map(dto => this.fixDates(dto)));
    return await this.repository.save(sprints);
  }

  public async findNewerThan(date: Date): Promise<Sprint[]> {
    return await this.repository.find({
      where:     {
        start: MoreThanOrEqual(date),
      },
      relations: [ 'tasks' ],
    });
  }

  public async findPrevious(): Promise<Sprint | null> {
    const older             = (a: Sprint, b: Sprint): Sprint => a.start.getTime() < b.start.getTime() ? a : b;
    const sprints: Sprint[] = await this.find();

    return sprints.filter(s => s.status === SprintStatus.PAST)
      .reduce(
        (prev: Sprint | null, curr: Sprint) => prev === null ? curr : older(prev, curr),
        null,
      );
  }

  public async findCurrent(): Promise<Sprint | null> {
    const sprints: Sprint[] = await this.find();
    return sprints.find(s => s.status === SprintStatus.CURRENT) ?? null;
  }

  public async findNext(): Promise<Sprint | null> {
    const newer             = (a: Sprint, b: Sprint): Sprint => a.start.getTime() >= b.start.getTime() ? a : b;
    const sprints: Sprint[] = await this.find();

    return sprints.filter(s => s.status === SprintStatus.FUTURE)
      .reduce(
        (prev: Sprint | null, curr: Sprint) => prev === null ? curr : newer(prev, curr),
        null,
      );
  }

  protected normalizeStart(start: Date): Date {
    let date = start;

    if (!isSunday(start))
      date = previousSunday(start);

    date.setHours(0, 0, 0, 0);
    return date;
  }

  protected getEndByStart(start: Date): Date {
    const date = nextSaturday(start);
    date.setHours(23, 59, 59, 999);
    return date;
  }

  protected fixDates(dto: CreateSprintDto): DeepPartial<Sprint> {
    dto.start = this.normalizeStart(dto.start);
    return {
      ...dto,
      end: this.getEndByStart(dto.start),
    };
  }

  public parseCsvProject(csvString: string): ParsedProject {
    const { errors, data, meta: { fields } } = parse<{ [key: string]: string }>(csvString, {
      header:         true,
      skipEmptyLines: true,
      complete:       results => results.data,
    });

    if (Array.isArray(errors) && errors.length > 0) {
      throw new BadRequestException(errors.map(e => e.message));
    }

    if (Array.isArray(fields) && fields.length > 1) {
      const [ dateColName, ...workFronts ] = fields;

      return {
        sprints:    data.map(d => ( {
          ...this.fixDates({ start: SprintService.ptDateStrToDate(d[dateColName]) }),
        } )),
        dateColName,
        data,
        workFronts: workFronts.map(name => ( {
          name,
          floors: parseFloat(data[data.length - 1][name]),
        } )),
      };
    } else {
      throw new BadRequestException('Invalid CSV headers');
    }
  }

  public async createProject(building: Building, parsed: ParsedProject): Promise<Sprint[]> {
    return await this.dataSource.manager.transaction(async (entityManager) => {
      await entityManager.query('TRUNCATE TABLE work_front RESTART IDENTITY CASCADE');
      await entityManager.query('TRUNCATE TABLE sprint RESTART IDENTITY CASCADE');

      const workFronts = await entityManager.save(WorkFront,
        entityManager.create(WorkFront, parsed.workFronts),
      );

      const sprints = await entityManager.save(Sprint,
        entityManager.create(Sprint, parsed.sprints.map(sprint => ( {
          ...sprint,
          building,
          buildingId: building.id,
        } ))),
      );

      sprints.sort((a, b) => a.start.getTime() - b.start.getTime());

      for (const datum of parsed.data) {
        const date   = SprintService.ptDateStrToDate(datum[parsed.dateColName]);
        const sprint = SprintService.findSorted(sprints, this.normalizeStart(date));

        if (sprint === null)
          throw new BadRequestException(`Invalid date for ${ date }`);

        const tasks: DeepPartial<Task>[] = workFronts.map(wf => ( {
          sprint,
          sprintId:      sprint.id,
          workFrontName: wf.name,
          workFront:     wf,
          planned:       parseFloat(datum[wf.name]),
        } ));

        const taskEntities: Task[] = entityManager.create(Task, tasks);
        await entityManager.save(taskEntities);

      }

      return await entityManager.find(Sprint,
        {
          relations: [ 'tasks', 'tasks.workFront' ],
        });
    });
  }

  private static ptDateStrToDate(ptDate: string): Date {
    return new Date(ptDate.split('/').reverse().join('/'));
  }

  private static findSorted(sprints: Sprint[], startDate: Date, start = 0, end = sprints.length - 1): Sprint | null {
    const mid = Math.floor(( start + end ) / 2.);

    if (startDate.getTime() === sprints[mid].start.getTime())
      return sprints[mid];
    else if (start >= end)
      return null;

    return startDate.getTime() < sprints[mid].start.getTime() ?
           SprintService.findSorted(sprints, startDate, start, mid - 1) :
           SprintService.findSorted(sprints, startDate, mid + 1, end);
  }


}
