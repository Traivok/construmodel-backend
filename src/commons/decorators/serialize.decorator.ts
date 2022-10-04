import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ClassConstructor }                 from 'class-transformer';
import { SerializeInterceptor }             from '../interceptors/serialize.interceptor';
import { ApiResponseOptions }               from '@nestjs/swagger';

export function Serialize<DTO>(dto: ClassConstructor<DTO>, options?: ApiResponseOptions) {
  return applyDecorators(
    UseInterceptors(new SerializeInterceptor<DTO>(dto)),
  );
}
