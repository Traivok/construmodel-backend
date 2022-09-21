import { applyDecorators, UseFilters } from '@nestjs/common';
import { EntityDuplicateFilter }       from '../filters/entity-duplicate.filter';
import { EntityNotFoundFilter }        from '../filters/entity-not-found.filter';

export const UserEntityFiltersDecorator = (entityName?: string) => applyDecorators(
  UseFilters(new EntityDuplicateFilter(entityName), new EntityNotFoundFilter(entityName)),
);
