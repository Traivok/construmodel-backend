import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UseInterceptors } from '@nestjs/common';
import { map, Observable }                                                             from 'rxjs';
import { ClassConstructor, plainToInstance }                                           from 'class-transformer';



@Injectable()
export class SerializeInterceptor<DTO> implements NestInterceptor {
  constructor(private dto: ClassConstructor<DTO>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle()
      .pipe(map((data: any) => plainToInstance(this.dto, data, { excludeExtraneousValues: true })));
  }
}