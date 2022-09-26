import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth }              from '@nestjs/swagger';
import { AuthGuard }                  from '@nestjs/passport';

export const ApiJwtAuth = () => applyDecorators(
  ApiBearerAuth('access_token'),
  UseGuards(AuthGuard('jwt')));