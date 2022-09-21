import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth }              from '@nestjs/swagger';
import { AuthGuard }                  from '@nestjs/passport';

export const ApiBearerAccessToken = () => ApiBearerAuth('access_token');

export const ApiJwtAuth = () => applyDecorators(
  ApiBearerAccessToken(),
  UseGuards(AuthGuard('jwt')));