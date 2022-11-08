import ProdConfig from './prod.config';

process.env.NODE_ENV = process.env.NODE_ENV ?? 'dev';

export type Config = { [key: string]: any };

export const baseConfig: Config = {
  DB_USER: process.env.USER,
  DB_SYNC: false,
  DB_HOST: 'localhost',
};

export const devConfig: Config = {
  ...baseConfig,
  COOKIE_SECRET: 'fixme', // FIXME TODO
  DB_NAME:       'cm_dev',
  DB_SYNC:       false,
  DB_LOG:        true,
};

export const testConfig: Config = {
  ...baseConfig,
  COOKIE_SECRET: 'secret',
  DB_NAME:       'cm_test',
  DB_SYNC:       true,
};

export const prodConfig: Config = {
  ...baseConfig,
  DB_NAME:       'postgres',
  ...ProdConfig
};

let config: Config;

switch (process.env.NODE_ENV) {
  case 'dev':
    config = devConfig;
    break;
  case 'prod':
    config = prodConfig;
    break;
  case 'test':
    config = testConfig;
    break;
  default:
    throw new Error(`Unknown environment: ${ process.env.NODE_ENV }`);
}

export default () => config;