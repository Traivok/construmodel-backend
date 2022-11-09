import getConfig      from './config';
import { DataSource } from 'typeorm';
import { Logger }     from '@nestjs/common';

const config = getConfig();

const logger = new Logger('TypeormConfig');
logger.log(`Connecting to database ${ config.DB_NAME } as ${ config.DB_USER }`);

export default new DataSource({
  type:          'postgres',
  host:          'construmodel.cehfjrs65lmb.us-west-2.rds.amazonaws.com',
  database:      'postgres',
  username:      'postgres',
  password:      'kodakFOX159',
  synchronize:   config.DB_SYNC ?? false,
  migrationsRun: false,
  logging:       config.DB_LOG ?? false,
  entities:      [ __dirname + '/src/**/*{.entity,.view.entity}{.ts,.ts}' ],
  migrations:    [ __dirname + '/migrations/**/*{.ts,.js}' ],
});
