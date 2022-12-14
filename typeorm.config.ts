import getConfig                         from './config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Logger }                        from '@nestjs/common';

const config = getConfig();

const logger = new Logger('TypeormConfig');
logger.log(`Connecting to database ${ config.DB_NAME } as ${ config.DB_USER }`);


const options: DataSourceOptions = {
  type:          'postgres',
  host:          config.DB_HOST,
  database:      config.DB_NAME,
  username:      config.DB_USER,
  password:      config.DB_PASSWORD ?? null,
  synchronize:   config.DB_SYNC ?? false,
  migrationsRun: false,
  logging:       config.DB_LOG ?? false,
  entities:      [ __dirname + '/src/**/*{.entity,.view.entity}{.ts,.ts}' ],
  migrations:    [ __dirname + '/migrations/**/*{.ts,.js}' ],
};

export default new DataSource(options);