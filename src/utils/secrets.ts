import * as dotenv from 'dotenv';
import * as _ from 'lodash';
import * as path from 'path';

dotenv.config({ path: '.env' });

export const ENVIRONMENT = _.defaultTo(process.env.APP_ENV, 'dev');
export const IS_PRODUCTION = ENVIRONMENT === 'production';
export const APP_PORT = _.defaultTo(process.env.APP_PORT, 3006);
export const LOG_DIRECTORY = _.defaultTo(process.env.LOG_DIRECTORY, path.resolve('applogs'));
export const JWT_SECRET = _.defaultTo(process.env.JWT_SECRET, 'secret');
export const SESSION_SECRET = _.defaultTo(process.env.SESSION_SECRET, 'secret');

export const DB = {
  USER: _.defaultTo(dotenv.config().parsed.USER, ''),
  PASSWORD: _.defaultTo(dotenv.config().parsed.PW, ''),
  HOST: _.defaultTo(dotenv.config().parsed.HOST, ''),
  DATABASE: _.defaultTo(dotenv.config().parsed.DATABASE, '')
}
