import { Injectable }       from '@nestjs/common';
import { Progression }      from '../entities/progression.entity';
import { Repository }       from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProgressionService {

  constructor(@InjectRepository(Progression) public repo: Repository<Progression>) {}

  async findAll(): Promise<Progression[]> {
    return this.repo.find();
  }
}
