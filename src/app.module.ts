import { Module }                      from '@nestjs/common';
import { ProgressModule }              from './progress/progress.module';
import { UserModule }                  from './user/user.module';
import { ReportModule }                from './report/report.module';
import { PlanModule }                  from './plan/plan.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonsModule } from './commons/commons.module';
import { TypeOrmModule }               from '@nestjs/typeorm';
import { User }                        from './user/entities/user.entity';

@Module({
  imports:     [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject:     [ ConfigService ],
      useFactory: (conf: ConfigService) => ( {
        type:        'postgres',
        database:    conf.getOrThrow<string>('DB_NAME'),
        entities:    [
          User,
        ],
        synchronize: conf.getOrThrow<boolean>('DB_SYNC'),
      } ),
    }),

    ProgressModule,
    PlanModule,
    UserModule,
    ReportModule,
    CommonsModule,
  ],
  controllers: [],
  providers:   [],
})
export class AppModule {}
