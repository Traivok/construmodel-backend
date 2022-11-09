import { Injectable, Logger } from '@nestjs/common';
import { Building }           from '../entities/building.entity';
import { CreateBuildingDto }  from '../dto/create-building.dto';
import { InjectRepository }   from '@nestjs/typeorm';
import { Repository }         from 'typeorm';

@Injectable()
export class BuildingService {
  private readonly logger = new Logger(BuildingService.name);

  constructor(@InjectRepository(Building) protected repository: Repository<Building>) {}

  public async create(createDto: CreateBuildingDto): Promise<Building> {
    const building: Building = this.repository.create(createDto);
    return await this.repository.save(building);
  }

  public async findOrFail(id: number): Promise<Building> {
    return await this.repository.findOneOrFail({
      relations: [ 'sprints', 'sprints.tasks', 'sprints.tasks.workFront' ],
      where:     { id },
    });
  }

  public async findAll(): Promise<Building[]> {
    return await this.repository.find();
  }
}
