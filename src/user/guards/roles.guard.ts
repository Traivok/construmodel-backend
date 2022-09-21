import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector }                                 from '@nestjs/core';
import { UserRoles }                                 from '../enums/user-roles';
import { ROLES_KEY }                                 from '../decorators/roles.decorator';
import { Express }                                   from '../interfaces/request.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authorizedRoles = this.reflector.getAllAndOverride<UserRoles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!Array.isArray(authorizedRoles) || authorizedRoles.length === 0)
      return true;

    const { user } = context.switchToHttp().getRequest<Express.Request>();

    return authorizedRoles.some(role => user?.role === role);
  }
}
