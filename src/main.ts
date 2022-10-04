import { NestFactory }                    from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule }                      from './app.module';
import { appConfigure }                   from './app.configure';
import { UserModule }                     from './user/user.module';
import { ReportModule }                   from './report/report.module';
import { ProjectModule }                  from './project/project.module';

( async function bootstrap() {
  const app = appConfigure(await NestFactory.create(AppModule));

  app.useLogger([ 'log', 'warn', 'error', 'verbose', 'debug' ]);

  app.enableCors();

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
      ReportModule,
      ProjectModule,
    ],
  }));

  await app.listen(3000);
} )();