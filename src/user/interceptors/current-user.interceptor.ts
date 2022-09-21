import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Express }                                                    from '../interfaces/request.interface';
import { UserService }                                                from '../services/user.service';
import { Observable }                                                 from 'rxjs';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UserService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Express.Request>();
    const id      = request.user?.id;

    if (id !== undefined)
      request.currentUser = await this.userService.findOneOrFail(id);

    return next.handle();
  }
}