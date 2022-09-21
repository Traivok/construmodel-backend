import { applyDecorators, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';

export const ClassSerializer = () => applyDecorators(UseInterceptors(ClassSerializerInterceptor));
