import { NestFactory }                    from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule }                      from './app.module';
import { appConfigure }                   from './app.configure';
import { PlanModule }                     from './plan/plan.module';
import { ProgressModule }                 from './progress/progress.module';
import { UserModule }                     from './user/user.module';
import { ReportModule }                   from './report/report.module';

( async function bootstrap() {
  const app = appConfigure(await NestFactory.create(AppModule));

  app.useLogger([ 'log', 'warn', 'error', 'verbose', 'debug' ]);

  const swaggerConf = new DocumentBuilder()
    .setTitle('User boilerplate')
    // .setDescription('API description')
    .setVersion('1.0')
    .addTag('user')
    .addBearerAuth({
        type:         'http',
        scheme:       'bearer',
        bearerFormat: 'JWT',
        name:         'JWT',
        description:  'Enter your JWT Token',
        in:           'header',
      },
      'access_token')
    .build();

  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, swaggerConf, {
    deepScanRoutes: true,
    include:        [
      UserModule,
      PlanModule,
      ProgressModule,
      ReportModule,
    ],
  }));

  await app.listen(3000);
} )();