import { BadRequestException, Injectable, Logger }              from '@nestjs/common';
import { Building }                                             from '../entities/building.entity';
import { DataSource, DeepPartial, Repository }                  from 'typeorm';
import { InjectConnection, InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { CreateBuildingDto }                                    from '../dtos/create-building.dto';
import { WorkFront }                                            from '../entities/work-front.entity';
import { SprintService }                                        from './sprint.service';
import { WorkFrontService }                                     from './work-front.service';
import { parse }                                                from 'papaparse';
import { ParsedProjectInterface }                               from '../interfaces/parsed-project.interface';
import { Sprint }                                               from '../entities/sprint.entity';
import { Plan }                                                 from '../entities/plan.entity';

@Injectable()
export class BuildingService {

  private readonly logger = new Logger(BuildingService.name);

  constructor(@InjectRepository(Building) protected repo: Repository<Building>,
              @InjectDataSource() protected dataSource: DataSource) {}

  /** BUILDING **/
  public async create(dto: CreateBuildingDto): Promise<Building> {
    const building = this.repo.create(dto);
    return await this.repo.save(building);
  }

  public async findOneOrFail(id: number): Promise<Building> {
    return await this.repo.findOneOrFail({
      relations: [ 'workFronts', 'sprints', 'sprints.plans' ],
      where:     { id },
    });
  }

  public async findAll(): Promise<Building[]> {
    return await this.repo.find({
      relations: [ 'workFronts', 'sprints', 'sprints.plans' ],
    });
  }


  /** PROJECT **/
  private ptDateStrToDate(ptDate: string): Date {
    return new Date(ptDate.split('/').reverse().join('/'));
  }

  public parseCsvProject(csvString: string): ParsedProjectInterface {
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
            start: this.ptDateStrToDate(d[dateColName]),
          } ),
        ),
        dateColName,
        data,
        workFronts: workFronts.map(s => ( { name: s } )),
      };
    } else {
      throw new BadRequestException('Invalid CSV headers');
    }
  }

  public extractProgresses(data: { [key: string]: string }[], dateColName: string, workFronts: WorkFront[], sprints: Sprint[]): DeepPartial<Plan>[] {
    return data.map((datum): DeepPartial<Plan[]> => {
      const date = this.ptDateStrToDate(datum[dateColName]);

      const sprint: Sprint | undefined = sprints.find(s => date.toDateString() === s.start.toDateString());

      if (sprint === undefined)
        return [];

      return workFronts.map(({ name: workFrontName }) => ( {
        sprintId: sprint.id,
        floor:    parseFloat(datum[workFrontName]) ?? 0.0,
        workFrontName,
      } ));
    }).flat();
  }

  public async createProject(buildingId: number, parsed: ParsedProjectInterface): Promise<Building> {
    const building = await this.findOneOrFail(buildingId);

    return await this.dataSource.manager.transaction(async (entityManager) => {
      if (Array.isArray(building.sprints) && building.sprints.length > 0) {
        await entityManager.delete<Plan>(Plan, building.sprints.map(({ id }) => ( { sprintId: id } )));
        await entityManager.delete<Sprint>(Sprint, building.sprints.map(({ id }) => ( { id } )));
      }

      building.sprints = entityManager.create<Sprint>(Sprint, parsed.sprints.map(s => ( {
        ...s,
        buildingId: building.id,
      } )));

      building.sprints = await entityManager.save<Sprint>(building.sprints);

      building.workFronts = entityManager.create<WorkFront>(WorkFront, parsed.workFronts);
      building.workFronts = await entityManager.save<WorkFront>(building.workFronts);

      const createProgresses       = this.extractProgresses(parsed.data, parsed.dateColName, building.workFronts, building.sprints);
      const progresses: Plan[] = entityManager.create<Plan>(Plan, createProgresses);
      await entityManager.save<Plan>(progresses);

      return await entityManager.save<Building>(building);
    });
  }

}
