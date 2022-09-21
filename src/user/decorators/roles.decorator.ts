import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { UserRoles }                               from '../enums/user-roles';
import { ApiJwtAuth }                              from './api-jwt-auth.decorator';
import { RolesGuard }                              from '../guards/roles.guard';

export const ROLES_KEY     = 'roles';
export const UseRolesGuard = (...authorizedRoles: UserRoles[]) =>
  applyDecorators(
    ApiJwtAuth(),
    SetMetadata(ROLES_KEY, authorizedRoles),
    UseGuards(RolesGuard),
  );