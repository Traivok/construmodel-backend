import { Module }                      from '@nestjs/common';
import { UserModule }                  from './user/user.module';
import { ReportModule }                from './report/report.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProjectModule }               from './project/project.module';
import { TypeOrmModule }               from '@nestjs/typeorm';
import { User }                        from './user/entities/user.entity';
import getConfig                       from '../config';
import { ProjectEntities }             from './project/entities';

@Module({
  imports:     [
    ConfigModule.forRoot({
      isGlobal: true,
      load:     [ getConfig ],
    }),

    TypeOrmModule.forRootAsync({
      inject:     [ ConfigService ],
      useFactory: (conf: ConfigService) => ( {
        type:        'postgres',
        database:    conf.getOrThrow<string>('DB_NAME'),
        host:        conf.get<string>('DB_HOST'),
        password:    conf.get<string>('DB_PASSWORD'),
        username:    conf.get<string>('DB_USER'),
        entities:    [
          User,
          ...ProjectEntities,
        ],
        subscribers: [],
        synchronize: conf.getOrThrow<boolean>('DB_SYNC'),
      } ),
    }),

    UserModule,
    ReportModule,
    ProjectModule,
  ],
  controllers: [],
  providers:   [],
})
export class AppModule {}
