import * as dotenv from "dotenv";
import * as _ from "lodash";
import * as path from "path";

dotenv.config({ path: ".env" });

export const ENVIRONMENT = _.defaultTo(process.env.APP_ENV, "dev");
export const IS_PRODUCTION = ENVIRONMENT === "production";
export const APP_PORT = _.defaultTo(process.env.APP_PORT, 3006);
export const LOG_DIRECTORY = _.defaultTo(process.env.LOG_DIRECTORY, path.resolve('logs'));
export const JWT_SECRET = _.defaultTo(process.env.JWT_SECRET, "secret");
export const SESSION_SECRET = _.defaultTo(process.env.SESSION_SECRET, "secret");

const HOST = _.defaultTo(process.env.HOST);
const USER = _.defaultTo(process.env.USER);
const PW = _.defaultTo(process.env.PW);
const DATABASE = _.defaultTo(process.env.DATABASE);

export const DB = {
  USER: _.defaultTo(process.env.DB_USER, USER),
  PASSWORD: _.defaultTo(process.env.DB_USER_PWD, PW),
  HOST: _.defaultTo(process.env.DB_HOST, HOST),
  DATABASE: _.defaultTo(process.env.DB_DATABASE, DATABASE)
}
