import { ForbiddenException, Injectable, NotImplementedException } from '@nestjs/common';
import { CreateUserDto }                                           from '../dtos/create-user.dto';
import { User }                                                    from '../entities/user.entity';
import { PaginationService }                                       from '../../commons/pagination/pagination.service';
import { InjectRepository }                                        from '@nestjs/typeorm';
import { Repository }                                              from 'typeorm';
import { UpdateUserDto }                                           from '../dtos/update-user.dto';
import { UserRoles }                                               from '../enums/user-roles';

@Injectable()
export class UserService extends PaginationService<User> {
  constructor(@InjectRepository(User) protected readonly repo: Repository<User>) {
    super({ entityName: 'user', orderBy: 'created_at' });
  }

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.repo.create(createUserDto);
    return await this.repo.save(user);
  }

  public async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneOrFail(id);
    return this.repo.save({ ...user, ...updateUserDto });
  }

  public async remove(id: number): Promise<User> {
    const user = await this.findOneOrFail(id);
    return await this.repo.remove(user);
  }

  public async findAll(): Promise<User[]> {
    return await this.repo.find();
  }

  public async findOne(id: number): Promise<User | null> {
    return await this.repo.findOneBy({ id });
  }

  public async findOneOrFail(id: number): Promise<User> {
    return await this.repo.findOneByOrFail({ id });
  }

  public checkOwnership(target_id: number, actor: User) {
    if (actor.role !== UserRoles.ADMIN && target_id !== actor.id)
      throw new ForbiddenException(`User ${ actor.username } has not ownership over user.id = ${ target_id }`);
  }
}
