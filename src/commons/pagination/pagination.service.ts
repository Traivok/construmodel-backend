import { ObjectLiteral, Repository } from 'typeorm';
import { PageOptionsDto }            from './page-options.dto';
import { PageDto }                   from './page.dto';
import PageMetaDto                   from './page-meta.dto';

interface PaginationServiceOptions {
  entityName?: string,
  orderBy?: string,
}

export abstract class PaginationService<T extends ObjectLiteral> {
  protected readonly entityName: string;
  protected orderBy: string;

  protected constructor(args?: PaginationServiceOptions) {
    const { entityName = 'entity', orderBy = 'created_at' } = args ?? {};

    this.entityName = entityName;
    this.orderBy    = orderBy;
  }

  protected abstract repo: Repository<T>;


  public async findAllPaginated(pageOptionsDto: PageOptionsDto): Promise<PageDto<T>> {
    const queryBuilder = this.repo.createQueryBuilder(this.entityName);

    queryBuilder.orderBy(`${ this.entityName }.${ this.orderBy }`)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const [ entities, itemCount ] = await queryBuilder.getManyAndCount();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto<T>(entities, pageMetaDto);
  }
}