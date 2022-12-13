import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as session                         from 'express-session';
import { ConfigService }                    from '@nestjs/config';

export function appConfigure(app: INestApplication): INestApplication {
  app.useGlobalPipes(new ValidationPipe({
    transform:        true,
    transformOptions: {
      enableImplicitConversion: true,
    },
    whitelist:        true,
    stopAtFirstError: true,
  }));

  app.use(session({
    secret:            app.get<ConfigService>(ConfigService).getOrThrow<string>('COOKIE_SECRET'),
    resave:            false,
    saveUninitialized: false,
  }));

  return app;
}