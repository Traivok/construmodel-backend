import { BadRequestException, Injectable } from '@nestjs/common';
import { PaginationService }               from '../../commons/pagination/pagination.service';
import { Building }                        from '../entities/building.entity';
import { Repository }                      from 'typeorm';
import { InjectRepository }                from '@nestjs/typeorm';
import { CreateBuildingDto }               from '../dtos/create-building.dto';
import { WorkFront }                       from '../entities/work-front.entity';

@Injectable()
export class BuildingService {
  constructor(@InjectRepository(Building) protected repo: Repository<Building>) {}

  /** BUILDING **/
  public async create(dto: CreateBuildingDto): Promise<Building> {
    const building = this.repo.create(dto);
    return await this.repo.save(building);
  }

  public async findOneOrFail(id: number): Promise<Building> {
    return await this.repo.findOneOrFail({
      relations: [ 'workFronts', 'workFronts.progressions' ],
      where:     { id },
    });
  }

  public async findAll(): Promise<Building[]> {
    return await this.repo.find({
      relations: [ 'workFronts', 'workFronts.progressions' ],
    });
  }

  public async addWorkFront(building: Building, workFront: WorkFront): Promise<Building> {
    if (building.workFronts === undefined)
      building.workFronts = [];

    if (building.workFronts?.some(w => w.id === workFront.id)) {
      throw new BadRequestException('This building has already this work front');
    }

    building.workFronts.push(workFront);

    return await this.repo.save(building);
  }

}
