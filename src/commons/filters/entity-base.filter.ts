import { ArgumentsHost, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { Response }                                           from 'express';
import { stat }                                               from 'fs';

export abstract class EntityBaseFilterFilter<T> implements ExceptionFilter {
  protected readonly logger = new Logger(EntityBaseFilterFilter.name);
  abstract readonly httpCode: HttpStatus;

  checkException(e: T): boolean {
    return true;
  }

  protected constructor(protected entityName: string) {}

  catch(exception: T, host: ArgumentsHost) {
    const ctx    = host.switchToHttp();
    const res    = ctx.getResponse<Response>();
    const status = this.httpCode;

    if (this.checkException(exception)) {
      res.status(status)
        .json({
          statusCode: status,
          message:    exception,
        });
    } else {
      this.logger.error(exception);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message:    'Internal Server Error',
        });
    }
  }
}